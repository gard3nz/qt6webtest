// ⌨️ Обработчики событий
import { TOOLS } from './config.js';
import { currentTool, setCurrentTool } from './tools.js';
import { isEditingText, setIsEditingText } from './text-editor.js';
import { undo, redo, copyToClipboard, cutToClipboard, pasteFromClipboard, clipboard } from './state.js';

export function setupKeyboardEvents(stage, layer, transformer, setupNode, saveStateFunc, hideTextEditor, isEditingTextFunc, deleteSelected) {
    window.addEventListener('keydown', (e) => {
        if (isEditingTextFunc()) {
            if (e.key === 'Enter') {
                e.preventDefault();
                hideTextEditor(null, true);
                saveStateFunc(layer, transformer, '🔤 Ввод текста');
            }
            if (e.key === 'Escape') {
                hideTextEditor(null, false);
            }
            return;
        }
        
        const isCtrl = e.ctrlKey || e.metaKey;
        
        // Удаление
        if (e.key === 'Delete' || e.key === 'Backspace') {
            e.preventDefault();
            deleteSelected();
        }
        
        // Отмена/Повтор
        if (isCtrl && e.key === 'z') {
            e.preventDefault();
            undo(layer, transformer, setupNode, hideTextEditor, isEditingTextFunc);
        }
        if (isCtrl && e.key === 'y') {
            e.preventDefault();
            redo(layer, transformer, setupNode, hideTextEditor, isEditingTextFunc);
        }
        
        // Копирование/Вставка/Вырезать
        if (isCtrl && e.key === 'c') {
            e.preventDefault();
            copyToClipboard(transformer);
        }
        if (isCtrl && e.key === 'v') {
            e.preventDefault();
            pasteFromClipboard(clipboard, layer, transformer, setupNode, saveStateFunc, isEditingTextFunc, hideTextEditor);
        }
        if (isCtrl && e.key === 'x') {
            e.preventDefault();
            cutToClipboard(transformer, layer, saveStateFunc, isEditingTextFunc, hideTextEditor);
        }
        
        // Вращение
        if (e.key.toLowerCase() === 'r' || e.key === 'к') {
            e.preventDefault();
            const nodes = transformer.nodes();
            if (nodes.length > 0) {
                nodes.forEach(n => n.rotation((n.rotation() || 0) + 45));
                layer.batchDraw();
                saveStateFunc(layer, transformer, '🔄 Вращение');
            }
        }
    });
}

export function setupToolbarEvents(saveStateFunc) {
    document.querySelectorAll('.toolbar button[data-tool], #pointer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.toolbar button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tool = btn.id === 'pointer-btn' ? TOOLS.POINTER : btn.dataset.tool;
            setCurrentTool(tool);
            
            saveStateFunc(null, null, '🛠 Выбор инструмента');
        });
    });
}

export function setupCanvasEvents(stage, transformer) {
    stage.on('mousedown', (e) => {
        if (e.target === stage && currentTool === TOOLS.POINTER) {
            transformer.nodes([]);
            layer.batchDraw();
        }
    });
}