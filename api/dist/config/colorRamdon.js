"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorRandom = void 0;
class ColorRandom {
    static colors() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
exports.ColorRandom = ColorRandom;
