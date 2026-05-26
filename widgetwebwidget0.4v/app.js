// 📐 Сетка и стили
let GRID_SIZE = 20;
const MIN_GRID = 5, MAX_GRID = 50;
const snap = v => Math.round(v / GRID_SIZE) * GRID_SIZE;
const bgPicker = document.getElementById('bg-color');
const gridPicker = document.getElementById('grid-color');
const sizeDisplay = document.getElementById('grid-size-display');
const container = document.getElementById('container');
const historyListEl = document.getElementById('history-list'); // 🔥 Элемент списка истории

// 🅰️ Настройки текста
let currentFontFamily = 'Arial', currentFontSize = 16;
const fontFamilySelect = document.getElementById('font-family-select');
const fontSizeInput = document.getElementById('font-size-input');

fontFamilySelect.addEventListener('change', (e) => { currentFontFamily = e.target.value; updateSelectedTextProps(); });
fontSizeInput.addEventListener('input', (e) => { currentFontSize = parseInt(e.target.value) || 16; updateSelectedTextProps(); });

function updateSelectedTextProps() {
    const nodes = transformer.nodes();
    let changed = false;
    nodes.forEach(node => {
        if (node.getClassName() === 'Text') {
            node.fontFamily(currentFontFamily); node.fontSize(currentFontSize);
            node.width(node.getTextWidth() + 4); changed = true;
        }
    });
    if (changed) { layer.batchDraw(); saveState('🔤 Изменение текста'); }
}

// 🔥 Элементы редактора текста
const textOverlay = document.getElementById('text-overlay');
const textInput = document.getElementById('text-input');
let isEditingText = false, currentTextNode = null;
let pendingStagePos = { x: 0, y: 0 };

function applyCanvasStyles() {
    const bg = bgPicker.value, grid = gridPicker.value;
    container.style.backgroundColor = bg;
    container.style.backgroundImage = `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`;
    container.style.backgroundSize = `${GRID_SIZE}px ${GRID_SIZE}px`;
    sizeDisplay.textContent = GRID_SIZE;
}
bgPicker.addEventListener('input', applyCanvasStyles);
gridPicker.addEventListener('input', applyCanvasStyles);
applyCanvasStyles();

function updateGridSize(newSize) {
    hideTextEditor(true);
    GRID_SIZE = Math.max(MIN_GRID, Math.min(MAX_GRID, newSize));
    layer.getChildren().forEach(node => {
        if (node !== transformer && node.getClassName() !== 'Text') {
            node.x(snap(node.x())); node.y(snap(node.y()));
            if (node.width !== undefined) { node.width(snap(node.width())); node.height(snap(node.height())); }
            if (node.radius !== undefined) node.radius(snap(node.radius()));
        }
    });
    layer.batchDraw(); applyCanvasStyles();
    saveState('📏 Изменение сетки');
}
document.getElementById('grid-inc').addEventListener('click', () => updateGridSize(GRID_SIZE + 5));
document.getElementById('grid-dec').addEventListener('click', () => updateGridSize(GRID_SIZE - 5));

// 🖼 Konva Init
const stage = new Konva.Stage({ container: 'container', width: container.clientWidth, height: container.clientHeight });
const layer = new Konva.Layer();
stage.add(layer);

const transformer = new Konva.Transformer({
    rotateEnabled: true, keepRatio: false,
    borderStroke: '#007acc', anchorStroke: '#007acc', anchorFill: '#fff', anchorSize: 8,
    ignoreStroke: false, rotateAnchorOffset: 20,
    enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'middle-left', 'middle-right', 'top-center', 'bottom-center']
});
layer.add(transformer);

// 📜 История и Панель Истории
let history = [], historyIndex = -1;
const MAX_HISTORY = 100;

// 🔥 Функция добавления пункта в список истории
function addHistoryItem(description, index) {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.textContent = description;
    li.dataset.index = index;
    li.onclick = () => {
        const idx = parseInt(li.dataset.index);
        if (idx !== historyIndex) loadState(idx);
    };
    historyListEl.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearHistoryUI() {
    historyListEl.innerHTML = '';
}

function updateHistoryUI() {
    // Обновляем классы active/disabled
    Array.from(historyListEl.children).forEach(item => {
        const idx = parseInt(item.dataset.index);
        if (idx === historyIndex) {
            item.classList.add('active');
            item.classList.remove('disabled');
        } else if (idx <= historyIndex) {
            item.classList.remove('active');
            item.classList.remove('disabled');
        } else {
            item.classList.remove('active');
            item.classList.add('disabled'); // Будущее состояние (после отката)
        }
    });
    // Прокрутка к активному элементу
    const activeItem = historyListEl.querySelector('.history-item.active');
    if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    document.getElementById('undo-btn').disabled = historyIndex <= 0;
    document.getElementById('redo-btn').disabled = historyIndex >= history.length - 1;
}

function saveState(description = '💾 Сохранение') {
    if (isEditingText) hideTextEditor(true);
    const state = [];
    layer.getChildren().forEach(node => {
        if (node !== transformer) {
            const obj = node.toObject();
            obj.attrs.listening = true; obj.attrs.draggable = true;
            state.push(obj);
        }
    });
    
    // Если мы в середине истории и делаем новое действие, обрезаем хвост (и UI)
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
        // Удаляем элементы из UI, которые стали невалидными
        const items = historyListEl.querySelectorAll('.history-item');
        items.forEach(item => {
            if (parseInt(item.dataset.index) > historyIndex) item.remove();
        });
    }
    
    history.push(state);
    if (history.length > MAX_HISTORY) {
        history.shift();
        // Если сдвинулся массив, нужно пересчитать индексы в UI (или просто очистить и перестроить)
        // Для простоты при переполнении очищаем список и перестраиваем
        clearHistoryUI();
        history.forEach((_, i) => addHistoryItem(`Состояние ${i}`, i));
    } else {
        const newIndex = history.length - 1;
        addHistoryItem(description, newIndex);
    }
    
    historyIndex = history.length - 1;
    updateHistoryUI();
}

function loadState(index) {
    hideTextEditor(true);
    historyIndex = index;
    const shapes = layer.getChildren().filter(n => n !== transformer);
    shapes.forEach(n => n.destroy());
    
    history[historyIndex].forEach(obj => {
        try {
            let node;
            if (obj.className === 'Text') node = new Konva.Text(obj.attrs);
            else {
                switch(obj.className) {
                    case 'Rect': node = new Konva.Rect(obj.attrs); break;
                    case 'Circle': node = new Konva.Circle(obj.attrs); break;
                    case 'Line': node = new Konva.Line(obj.attrs); break;
                    case 'Arc': node = new Konva.Arc(obj.attrs); break;
                    default: node = new Konva.Shape(obj.attrs);
                }
            }
            layer.add(node); setupNode(node);
        } catch(e) { console.warn('Restore error:', e); }
    });
    
    transformer.nodes([]); layer.draw(); updateHistoryUI();
}

function undo() { if (historyIndex > 0) loadState(historyIndex - 1); }
function redo() { if (historyIndex < history.length - 1) loadState(historyIndex + 1); }

function setupNode(node) {
    if (!node) return;
    node._isSnapping = false;
    node.listening(true); node.draggable(true);
    if (node.getClassName() !== 'Text') {
        node.dragBoundFunc(pos => ({ x: snap(pos.x), y: snap(pos.y) }));
    }
    node.on('mousedown', function(e) {
        if (currentTool === 'pointer' && !isEditingText) {
            e.cancelBubble = true;
            transformer.nodes([this]);
            layer.batchDraw();
            syncColorPicker(); syncFontPicker();
        }
    });
    if (node.getClassName() === 'Text') {
        node.on('dblclick', function(e) {
            e.cancelBubble = true;
            showTextEditor(e.evt.clientX, e.evt.clientY, this.text(), this);
        });
        node.on('mouseover', () => { if(currentTool === 'pointer') stage.container().style.cursor = 'text'; });
        node.on('mouseout', () => { if(currentTool === 'pointer') stage.container().style.cursor = 'default'; });
    } else {
        node.on('mouseover', () => { if(currentTool === 'pointer') stage.container().style.cursor = 'move'; });
        node.on('mouseout', () => { if(currentTool === 'pointer') stage.container().style.cursor = 'default'; });
    }
}

// 🔥 Текстовый редактор
function showTextEditor(clientX, clientY, initialValue = '', targetNode = null) {
    if (isEditingText) hideTextEditor(true);
    currentTextNode = targetNode; isEditingText = true;
    textInput.value = initialValue;
    textOverlay.style.display = 'flex';
    textOverlay.style.left = `${clientX}px`;
    textOverlay.style.top = `${clientY}px`;
    textOverlay.style.width = `${Math.max(initialValue.length * 10, 60)}px`;
    textOverlay.style.height = '30px';
    textInput.style.fontSize = targetNode ? targetNode.fontSize() + 'px' : currentFontSize + 'px';
    textInput.style.color = targetNode ? targetNode.fill() : colorPicker.value;
    textInput.style.fontFamily = targetNode ? targetNode.fontFamily() : currentFontFamily;
    textInput.focus(); textInput.select();
}

function hideTextEditor(save = false) {
    if (!isEditingText) return;
    if (save && textInput.value.trim() !== '') {
        const val = textInput.value.trim();
        if (currentTextNode) {
            currentTextNode.text(val); currentTextNode.width(currentTextNode.getTextWidth() + 4);
        } else {
            const newText = new Konva.Text({
                x: pendingStagePos.x, y: pendingStagePos.y, text: val,
                fontSize: currentFontSize, fontFamily: currentFontFamily,
                fill: colorPicker.value, draggable: true, listening: true, name: 'ugo-text', align: 'center'
            });
            layer.add(newText); setupNode(newText); transformer.nodes([newText]);
        }
        layer.batchDraw();
    }
    textOverlay.style.display = 'none'; isEditingText = false; currentTextNode = null;
}
textOverlay.addEventListener('mousedown', e => e.stopPropagation());
textInput.addEventListener('blur', () => { hideTextEditor(true); saveState('🔤 Ввод текста'); });
textInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); hideTextEditor(true); saveState('🔤 Ввод текста'); }
    if (e.key === 'Escape') { hideTextEditor(false); }
});

function syncFontPicker() {
    const nodes = transformer.nodes();
    if (nodes.length === 1 && nodes[0].getClassName() === 'Text') {
        const t = nodes[0];
        fontFamilySelect.value = t.fontFamily(); fontSizeInput.value = t.fontSize();
        currentFontFamily = t.fontFamily(); currentFontSize = t.fontSize();
    }
}

// 🛠 Инструменты
let currentTool = 'pointer';
let isDrawing = false, currentShape = null, startX, startY;
const colorPicker = document.getElementById('color-picker');

function syncColorPicker() {
    const sel = transformer.nodes();
    if (sel.length > 0) colorPicker.value = sel[0].stroke() || sel[0].fill() || '#ffffff';
}

colorPicker.addEventListener('input', (e) => {
    const nodes = transformer.nodes();
    if (!nodes.length) return;
    const col = e.target.value;
    nodes.forEach(n => {
        if (n.getClassName() === 'Text') n.fill(col);
        else { n.stroke(col); if (n.name() === 'port') n.fill(col); else if (n.fill() && n.fill() !== 'none') n.fill(col + '44'); }
    });
    layer.batchDraw();
    saveState('🎨 Изменение цвета');
});

document.querySelectorAll('.toolbar button[data-tool], #pointer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        hideTextEditor(true);
        saveState('🛠 Выбор инструмента');
        document.querySelectorAll('.toolbar button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTool = btn.id === 'pointer-btn' ? 'pointer' : btn.dataset.tool;
        transformer.nodes([]);
        stage.container().style.cursor = currentTool === 'pointer' ? 'default' : (currentTool === 'text' ? 'text' : 'crosshair');
    });
});

stage.on('mousedown', (e) => {
    if (isEditingText) return;
    if (e.target === stage && currentTool === 'pointer') {
        transformer.nodes([]); layer.batchDraw();
    }
});

// ✏️ Рисование
stage.on('mousedown', (e) => {
    if (isEditingText || currentTool === 'pointer' || e.target !== stage) return;
    if (currentTool === 'text') {
        const pos = stage.getPointerPosition();
        pendingStagePos = { x: snap(pos.x), y: snap(pos.y) };
        showTextEditor(e.evt.clientX, e.evt.clientY, 'T', null);
        isDrawing = false; currentShape = null; return;
    }
    isDrawing = true;
    const pos = stage.getPointerPosition();
    startX = snap(pos.x); startY = snap(pos.y);
    const base = { x: startX, y: startY, name: 'ugo-element', stroke: '#888888', strokeWidth: 2, listening: true };
    switch (currentTool) {
        case 'rect': currentShape = new Konva.Rect({ ...base, width: GRID_SIZE, height: GRID_SIZE, fill: '#3a3a3a' }); break;
        case 'square': currentShape = new Konva.Rect({ ...base, width: GRID_SIZE, height: GRID_SIZE, fill: '#3a3a3a' }); break;
        case 'circle': currentShape = new Konva.Circle({ ...base, radius: GRID_SIZE/2, fill: '#3a3a3a' }); break;
        case 'arc': currentShape = new Konva.Arc({ ...base, innerRadius: 0, outerRadius: GRID_SIZE, angle: 90, fill: 'transparent', stroke: '#888888', strokeWidth: 2 }); break;
        case 'line': currentShape = new Konva.Line({ ...base, points: [0, 0, GRID_SIZE, GRID_SIZE], lineCap: 'round' }); break;
        case 'port': currentShape = new Konva.Circle({ ...base, radius: 6, fill: '#888888', name: 'port', strokeWidth: 1 }); break;
    }
    if (currentShape) { 
        layer.add(currentShape); setupNode(currentShape); transformer.nodes([currentShape]); 
        layer.batchDraw(); 
        // 🔥 Фиксируем создание в истории
        saveState(`➕ Создан: ${currentTool}`); 
    }
});

stage.on('mousemove', (e) => {
    if (!isDrawing || !currentShape) return;
    const pos = stage.getPointerPosition();
    const dx = snap(pos.x) - startX, dy = snap(pos.y) - startY;
    if (currentTool === 'line') currentShape.points([0, 0, dx, dy]);
    else if (currentTool === 'circle' || currentTool === 'port') currentShape.radius(Math.max(GRID_SIZE/2, Math.sqrt(dx*dx + dy*dy)));
    else if (currentTool === 'arc') currentShape.outerRadius(Math.max(GRID_SIZE, Math.sqrt(dx*dx + dy*dy)));
    else {
        const w = Math.max(GRID_SIZE, Math.abs(dx)), h = currentTool === 'square' ? w : Math.max(GRID_SIZE, Math.abs(dy));
        currentShape.width(w); currentShape.height(h);
        currentShape.x(dx >= 0 ? startX : startX - w); currentShape.y(dy >= 0 ? startY : startY - h);
    }
    layer.batchDraw();
});

stage.on('mouseup mouseleave', () => {
    if (isDrawing && currentShape && currentTool !== 'text') { 
        // Не вызываем saveState здесь, так как вызываем в mousedown для создания
        // Но если была трансформация существующего объекта, то вызываем.
        // В данном случае при рисовании saveState вызывается сразу.
    }
    isDrawing = false; currentShape = null;
});

// 📏 Привязка и Масштабирование
transformer.on('transform', (e) => {
    const node = e.target;
    if (node.getClassName() === 'Text') {
        const sx = node.scaleX(), sy = node.scaleY();
        if (sx !== 1 || sy !== 1) {
            const avgScale = (sx + sy) / 2;
            const newSize = Math.max(8, Math.round(node.fontSize() * avgScale));
            node.fontSize(newSize); node.scaleX(1); node.scaleY(1);
            fontSizeInput.value = newSize; currentFontSize = newSize;
            node.width(node.getTextWidth() + 4); transformer.forceUpdate();
        }
        return; 
    }
    if (node._isSnapping) return;
    node._isSnapping = true;
    const sx = node.scaleX(), sy = node.scaleY();
    if (sx !== 1 || sy !== 1) {
        node.scaleX(1); node.scaleY(1);
        if (node.width !== undefined) { node.width(Math.max(GRID_SIZE, snap(node.width() * sx))); node.height(Math.max(GRID_SIZE, snap(node.height() * sy))); }
        if (node.radius !== undefined) node.radius(Math.max(GRID_SIZE/2, snap(node.radius() * Math.max(sx, sy))));
        if (node.points !== undefined) { const p = node.points(); p[2] = snap(p[2]); p[3] = snap(p[3]); node.points(p); }
        node.x(snap(node.x())); node.y(snap(node.y()));
        transformer.forceUpdate();
    }
    node._isSnapping = false;
});

layer.on('dragend', () => { if(!isEditingText) saveState('↔️ Перемещение'); });
transformer.on('transformend', () => { if(!isEditingText) saveState('📐 Трансформация'); });

// 🗑 Удаление
function deleteSelected() {
    if (isEditingText) return;
    const nodes = transformer.nodes();
    if (!nodes.length) return;
    nodes.forEach(n => n.destroy());
    transformer.nodes([]); layer.batchDraw(); saveState('🗑 Удаление');
}
document.getElementById('delete-btn').addEventListener('click', deleteSelected);

// ⌨️ Горячие клавиши
window.addEventListener('keydown', (e) => {
    if (isEditingText) {
        if (e.key === 'Enter') { e.preventDefault(); hideTextEditor(true); saveState('🔤 Ввод текста'); }
        if (e.key === 'Escape') { hideTextEditor(false); }
        return;
    }
    const isCtrl = e.ctrlKey || e.metaKey;
    if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); deleteSelected(); }
    if (isCtrl && e.key === 'z') { e.preventDefault(); undo(); }
    if (isCtrl && e.key === 'y') { e.preventDefault(); redo(); }
    if (e.key.toLowerCase() === 'r' || e.key === 'к') {
        e.preventDefault();
        const nodes = transformer.nodes();
        if (nodes.length > 0) {
            nodes.forEach(n => n.rotation((n.rotation() || 0) + 45));
            layer.batchDraw(); saveState('🔄 Вращение');
        }
    }
});

// 📤 Экспорт SVG
function exportToSVG() {
    hideTextEditor(true); transformer.nodes([]); layer.draw();
    try {
        const nodes = layer.getChildren().filter(n => n !== transformer);
        if (nodes.length === 0) { alert('Нет объектов для экспорта!'); return; }
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        nodes.forEach(node => {
            const box = node.getClientRect();
            minX = Math.min(minX, box.x); minY = Math.min(minY, box.y);
            maxX = Math.max(maxX, box.x + box.width); maxY = Math.max(maxY, box.y + box.height);
        });
        const padding = 10;
        minX -= padding; minY -= padding; maxX += padding; maxY += padding;
        const width = maxX - minX, height = maxY - minY;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${minX} ${minY} ${width} ${height}">`;
        svg += `<rect width="100%" height="100%" fill="none"/>`;
        nodes.forEach(node => {
            const type = node.getClassName(), a = node.attrs;
            const x = a.x || 0, y = a.y || 0, rot = a.rotation || 0;
            const transform = (x || y || rot) ? ` transform="translate(${x},${y}) rotate(${rot})"` : '';
            const stroke = a.stroke || '#888', sw = a.strokeWidth || 2, fill = a.fill || 'none';
            let el = '';
            if (type === 'Rect') el = `<rect x="0" y="0" width="${a.width||0}" height="${a.height||0}" stroke="${stroke}" stroke-width="${sw}" fill="${fill}"${transform}/>`;
            else if (type === 'Circle') el = `<circle cx="0" cy="0" r="${a.radius||0}" stroke="${stroke}" stroke-width="${sw}" fill="${fill}"${transform}/>`;
            else if (type === 'Text') {
                const safeText = (a.text || 'T').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                el = `<text x="0" y="0" font-family="${a.fontFamily||'Arial'}" font-size="${a.fontSize||16}" fill="${fill}" text-anchor="start" dominant-baseline="hanging"${transform}>${safeText}</text>`;
            }
            else if (type === 'Line' && (a.points||[]).length >= 4) el = `<polyline points="${a.points.join(' ')}" stroke="${stroke}" stroke-width="${sw}" fill="none" stroke-linecap="round"${transform}/>`;
            else if (type === 'Arc' && (a.outerRadius||0) > 0) {
                const r = a.outerRadius, start = (a.rotation||0)*Math.PI/180, angle = a.angle||90;
                const end = start + (angle*Math.PI/180);
                const x1=Math.cos(start)*r, y1=Math.sin(start)*r, x2=Math.cos(end)*r, y2=Math.sin(end)*r;
                el = `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${Math.abs(angle) >180?1:0} 1 ${x2} ${y2}" stroke="${stroke}" stroke-width="${sw}" fill="none"${transform}/>`;
            }
            if (el) svg += el;
        });
        svg += '</svg>';
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download =  `ugo_${Date.now()}.svg`;
        document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
        if (window.qtBridge?.receiveSvg) window.qtBridge.receiveSvg(svg);
        saveState('📤 Экспорт SVG');
    } catch (err) { console.error(err); alert('Ошибка экспорта: ' + err.message); }
}

document.getElementById('svg-btn').addEventListener('click', exportToSVG);
document.getElementById('undo-btn').addEventListener('click', undo);
document.getElementById('redo-btn').addEventListener('click', redo);
document.getElementById('clear-btn').addEventListener('click', () => {
    hideTextEditor(true);
    const shapes = layer.getChildren().filter(n => n !== transformer);
    shapes.forEach(n => n.destroy());
    transformer.nodes([]); layer.draw();
    history = []; historyIndex = -1; clearHistoryUI(); saveState('🧹 Очистка');
});

window.addEventListener('resize', () => { stage.width(container.clientWidth); stage.height(container.clientHeight); layer.batchDraw(); });
saveState('🚀 Старт');