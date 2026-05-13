// 🛠 Инструменты рисования
import { CONFIG, TOOLS } from './config.js';
import { snap } from './utils.js';

    export let currentTool = TOOLS.POINTER;
    export let isDrawing = false;
    export let currentShape = null;
    export let startX = 0;
    export let startY = 0;



    export function setCurrentTool(tool) {
        currentTool = tool;
    }

    export function getCurrentTool() {
        return currentTool;
    }

    export function createShape(tool, x, y, gridSize, arcRadius, arcAngle) {
        const base = {
            x: x,
            y: y,
            name: 'ugo-element',
            stroke: CONFIG.COLORS.DEFAULT_STROKE,
            strokeWidth: CONFIG.STROKE.DEFAULT_WIDTH,
            listening: true
        };

        switch (tool) {
            case TOOLS.RECT:
            case TOOLS.SQUARE:
                return new Konva.Rect({
                    ...base,
                    width: gridSize,
                    height: gridSize,
                    fill: CONFIG.COLORS.DEFAULT_FILL
                });

            case TOOLS.CIRCLE:
                return new Konva.Circle({
                    ...base,
                    radius: gridSize / 2,
                    fill: CONFIG.COLORS.DEFAULT_FILL
                });

            case TOOLS.ARC:
                return new Konva.Arc({
                    ...base,
                    innerRadius: 0,
                    outerRadius: arcRadius || CONFIG.ARC.DEFAULT_RADIUS,
                    angle: arcAngle || CONFIG.ARC.DEFAULT_ANGLE,
                    fill: 'transparent',
                    stroke: CONFIG.COLORS.DEFAULT_STROKE,
                    strokeWidth: CONFIG.STROKE.DEFAULT_WIDTH
                });

            case TOOLS.LINE:
                return new Konva.Line({
                    ...base,
                    points: [0, 0, gridSize, gridSize],
                    lineCap: 'round'
                });

            case TOOLS.PORT:
                return new Konva.Circle({
                    ...base,
                    radius: CONFIG.PORT.RADIUS,
                    fill: CONFIG.COLORS.DEFAULT_STROKE,
                    name: 'port',
                    strokeWidth: CONFIG.STROKE.PORT_WIDTH
                });

            default:
                return null;
        }
    }

    export function updateShape(currentTool, currentShape, startX, startY, pos, gridSize) {
        if (!currentShape) return;

        const dx = snap(pos.x, gridSize) - startX;
        const dy = snap(pos.y, gridSize) - startY;

        switch (currentTool) {
            case TOOLS.LINE:
                currentShape.points([0, 0, dx, dy]);
                break;

            case TOOLS.CIRCLE:
            case TOOLS.PORT:
                currentShape.radius(Math.max(
                    gridSize / 2,
                    Math.sqrt(dx * dx + dy * dy)
                ));
                break;

            case TOOLS.ARC:
                currentShape.outerRadius(Math.max(
                    gridSize,
                    Math.sqrt(dx * dx + dy * dy)
                ));
                break;

            case TOOLS.RECT:
            case TOOLS.SQUARE:
                const w = Math.max(gridSize, Math.abs(dx));
                const h = currentTool === TOOLS.SQUARE ? w : Math.max(gridSize, Math.abs(dy));
                currentShape.width(w);
                currentShape.height(h);
                currentShape.x(dx >= 0 ? startX : startX - w);
                currentShape.y(dy >= 0 ? startY : startY - h);
                break;
        }
    }

