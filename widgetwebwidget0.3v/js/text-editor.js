// 🔤 Редактор текста
import { CONFIG } from './config.js';

export let isEditingText = false;
export let currentTextNode = null;
export let pendingStagePos = { x: 0, y: 0 };
export let currentFontFamily = CONFIG.TEXT.DEFAULT_FONT;
export let currentFontSize = CONFIG.TEXT.DEFAULT_SIZE;

export function setIsEditingText(value) {
    isEditingText = value;
}

export function getIsEditingText() {
    return isEditingText;
}

export function setCurrentFontFamily(font) {
    currentFontFamily = font;
}

export function setCurrentFontSize(size) {
    currentFontSize = size;
}

export function getCurrentFontFamily() {
    return currentFontFamily;
}

export function getCurrentFontSize() {
    return currentFontSize;
}

export function showTextEditor(textOverlay, textInput, clientX, clientY, initialValue = '', targetNode = null) {
    if (isEditingText) hideTextEditor(textOverlay);
    
    currentTextNode = targetNode;
    isEditingText = true;
    textInput.value = initialValue;
    textOverlay.style.display = 'flex';
    textOverlay.style.left = `${clientX}px`;
    textOverlay.style.top = `${clientY}px`;
    textOverlay.style.width = `${Math.max(initialValue.length * 10, 60)}px`;
    textOverlay.style.height = '30px';
    
    if (targetNode) {
        textInput.style.fontSize = targetNode.fontSize() + 'px';
        textInput.style.color = targetNode.fill();
        textInput.style.fontFamily = targetNode.fontFamily();
    } else {
        textInput.style.fontSize = currentFontSize + 'px';
        textInput.style.color = '#888888';
        textInput.style.fontFamily = currentFontFamily;
    }
    
    textInput.focus();
    textInput.select();
}

export function hideTextEditor(textOverlay, save = false, textInput, currentTextNode, pendingStagePos, layer, transformer, setupNode, colorPicker) {
    if (!isEditingText) return;
    
    if (save && textInput.value.trim() !== '') {
        const val = textInput.value.trim();
        
        if (currentTextNode) {
            currentTextNode.text(val);
            currentTextNode.width(currentTextNode.getTextWidth() + 4);
        } else {
            const newText = new Konva.Text({
                x: pendingStagePos.x,
                y: pendingStagePos.y,
                text: val,
                fontSize: currentFontSize,
                fontFamily: currentFontFamily,
                fill: colorPicker.value,
                draggable: true,
                listening: true,
                name: 'ugo-text',
                align: 'center'
            });
            layer.add(newText);
            setupNode(newText);
            transformer.nodes([newText]);
        }
        layer.batchDraw();
    }
    
    textOverlay.style.display = 'none';
    isEditingText = false;
    currentTextNode = null;
}

export function updateSelectedTextProps(transformer, currentFontFamily, currentFontSize) {
    const nodes = transformer.nodes();
    let changed = false;
    
    nodes.forEach(node => {
        if (node.getClassName() === 'Text') {
            node.fontFamily(currentFontFamily);
            node.fontSize(currentFontSize);
            node.width(node.getTextWidth() + 4);
            changed = true;
        }
    });
    
    return changed;
}

export function syncFontPicker(transformer, fontFamilySelect, fontSizeInput) {
    const nodes = transformer.nodes();
    if (nodes.length === 1 && nodes[0].getClassName() === 'Text') {
        const t = nodes[0];
        fontFamilySelect.value = t.fontFamily();
        fontSizeInput.value = t.fontSize();
        return {
            fontFamily: t.fontFamily(),
            fontSize: t.fontSize()
        };
    }
    return null;
}