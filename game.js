class Game {
    constructor() {
        this.player = document.getElementById('player');
        this.gameField = document.getElementById('gameField');
        
        this.cellWidth = 100;
        this.cellHeight = 166.67;
        this.moveDelay = 180;
        
        this.gridX = 0;
        this.gridY = 0;
        
        this.keysPressed = {};
        this.moveInterval = null;
        this.isGameActive = false;
        
        this.init();
    }
    
    init() {
        console.log('🚀 Инициализация игры...');
        
        // Начальная позиция
        this.gridX = 0;
        this.gridY = 0;
        this.updatePlayerPosition();
        
        // Вешаем обработчики напрямую на document
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Фокус на документе
        document.addEventListener('click', () => {
            document.body.focus();
            console.log('Фокус установлен на документ');
        });
        
        // Устанавливаем фокус сразу
        document.body.setAttribute('tabindex', '0');
        document.body.focus();
        
        this.isGameActive = true;
        console.log('✅ Игра активна. Пробуйте WASDQEZX');
    }
    
    handleKeyDown(e) {
        if (!this.isGameActive) return;
        
        const key = e.key.toLowerCase();
        console.log('KeyDown:', key);
        
        if (['w', 'a', 's', 'd', 'q', 'e', 'z', 'x'].includes(key)) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!this.keysPressed[key]) {
                this.keysPressed[key] = true;
                this.movePlayer(key);
                
                if (!this.moveInterval) {
                    this.moveInterval = setInterval(() => {
                        this.continuousMove();
                    }, this.moveDelay);
                }
            }
        }
    }
    
    handleKeyUp(e) {
        if (!this.isGameActive) return;
        
        const key = e.key.toLowerCase();
        console.log('KeyUp:', key);
        
        if (this.keysPressed[key]) {
            delete this.keysPressed[key];
            
            if (Object.keys(this.keysPressed).length === 0 && this.moveInterval) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
            }
        }
    }
    
    continuousMove() {
        Object.keys(this.keysPressed).forEach(key => {
            this.movePlayer(key);
        });
    }
    
    movePlayer(key) {
        let newGridX = this.gridX;
        let newGridY = this.gridY;
        
        switch(key) {
            case 'w': newGridY--; break; // Вверх
            case 's': newGridY++; break; // Вниз
            case 'a': newGridX--; break; // Влево
            case 'd': newGridX++; break; // Вправо
            case 'q': newGridX--; newGridY--; break; // ↖
            case 'e': newGridX++; newGridY--; break; // ↗
            case 'z': newGridX--; newGridY++; break; // ↙
            case 'x': newGridX++; newGridY++; break; // ↘
        }
        
        // Проверка границ
        if (newGridX >= 0 && newGridX < 10 && newGridY >= 0 && newGridY < 6) {
            this.gridX = newGridX;
            this.gridY = newGridY;
            this.updatePlayerPosition();
            console.log(`✅ Движение ${key}: [${this.gridX}, ${this.gridY}]`);
        } else {
            console.log(`❌ За границей: ${key} → [${newGridX}, ${newGridY}]`);
        }
    }
    
    updatePlayerPosition() {
        const pixelX = this.gridX * this.cellWidth;
        const pixelY = this.gridY * this.cellHeight;
        
        this.player.style.left = pixelX + 'px';
        this.player.style.top = pixelY + 'px';
    }
}

// Запуск игры
window.addEventListener('load', () => {
    console.log('📄 Страница загружена');
    window.game = new Game(); // Сохраняем в глобальной области для отладки
});

// Отладочная информация
console.log('🔄 Скрипт game.js загружен');
