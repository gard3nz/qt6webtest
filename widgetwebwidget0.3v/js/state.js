// 💾 Управление состоянием и историей
import { CONFIG } from './config.js';
import { updateHistoryPanel } from './history-panel.js';

export let history = [];
export let historyIndex = -1;
export let clipboard = [];

export function saveState(layer, transformer, description = '💾 Сохранение', isEditingText, hideTextEditor) {
    if (isEditingText) hideTextEditor(true);
    
    const state = [];
    layer.getChildren().forEach(node => {
        if (node !== transformer) {
            const obj = node.toObject();
            obj.attrs.listening = true;
            obj.attrs.draggable = true;
            state.push(obj);
        }
    });
    
    // Если мы в середине истории, обрезаем хвост
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    history.push({ state, description, timestamp: Date.now() });
    
    if (history.length > CONFIG.HISTORY.MAX_STATES) {
        history.shift();
    }
    
    historyIndex = history.length - 1;
    updateHistoryPanel();
}

export function loadState(layer, transformer, index, setupNode, hideTextEditor) {
    if (isEditingText) hideTextEditor(true);
    
    historyIndex = index;
    
    // Очищаем текущий слой
    const shapes = layer.getChildren().filter(n => n !== transformer);
    shapes.forEach(n => n.destroy());
    
    // Восстанавливаем состояние
    history[index].state.forEach(obj => {
        try {
            let node;
            if (obj.className === 'Text') {
                node = new Konva.Text(obj.attrs);
            } else {
                switch(obj.className) {
                    case 'Rect': node = new Konva.Rect(obj.attrs); break;
                    case 'Circle': node = new Konva.Circle(obj.attrs); break;
                    case 'Line': node = new Konva.Line(obj.attrs); break;
                    case 'Arc': node = new Konva.Arc(obj.attrs); break;
                    default: node = new Konva.Shape(obj.attrs);
                }
            }
            if (node) {
                layer.add(node);
                setupNode(node);
            }
        } catch(e) {
            console.warn('Restore error:', e);
        }
    });
    
    transformer.nodes([]);
    layer.draw();
    updateHistoryPanel();
}

export function undo(layer, transformer, setupNode, hideTextEditor, isEditingText) {
    if (historyIndex > 0) {
        loadState(layer, transformer, historyIndex - 1, setupNode, hideTextEditor);
    }
}

export function redo(layer, transformer, setupNode, hideTextEditor, isEditingText) {
    if (historyIndex < history.length - 1) {
        loadState(layer, transformer, historyIndex + 1, setupNode, hideTextEditor);
    }
}

export function copyToClipboard(transformer) {
    const nodes = transformer.nodes();
    if (nodes.length > 0) {
        clipboard = nodes.map(n => n.toObject());
    }
}

export function cutToClipboard(transformer, layer, saveStateFunc, isEditingText, hideTextEditor) {
    copyToClipboard(transformer);
    const nodes = transformer.nodes();
    nodes.forEach(n => n.destroy());
    transformer.nodes([]);
    layer.batchDraw();
    saveStateFunc(layer, transformer, '✂️ Вырезать', isEditingText, hideTextEditor);
}

export function pasteFromClipboard(clipboard, layer, transformer, setupNode, saveStateFunc, isEditingText, hideTextEditor) {
    if (clipboard.length === 0) return;
    
    transformer.nodes([]);
    const pastedNodes = [];
    
    clipboard.forEach((nodeData) => {
        let newNode;
        const type = nodeData.className;
        const attrs = { ...nodeData.attrs };
        
        // Сдвигаем на 20 пикселей
        attrs.x += 20;
        attrs.y += 20;
        
        try {
            switch(type) {
                case 'Rect': newNode = new Konva.Rect(attrs); break;
                case 'Circle': newNode = new Konva.Circle(attrs); break;
                case 'Line': newNode = new Konva.Line(attrs); break;
                case 'Arc': newNode = new Konva.Arc(attrs); break;
                case 'Text': newNode = new Konva.Text(attrs); break;
            }
            
            if (newNode) {
                layer.add(newNode);
                setupNode(newNode);
                pastedNodes.push(newNode);
            }
        } catch(e) {
            console.error('Paste error:', e);
        }
    });
    
    if (pastedNodes.length > 0) {
        transformer.nodes(pastedNodes);
        layer.batchDraw();
        saveStateFunc(layer, transformer, '📋 Вставка', isEditingText, hideTextEditor);
    }
}

export function clearHistory() {
    history = [];
    historyIndex = -1;
}