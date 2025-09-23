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
        
        this.init();
    }
    
    init() {
        console.log('Игра инициализируется...');
        
        // Ждем загрузки изображения персонажа
        this.player.onload = () => {
            console.log('Персонаж загружен, размер:', this.player.naturalWidth, 'x', this.player.naturalHeight);
            this.startGame();
        };
        
        // Если изображение уже загружено
        if (this.player.complete) {
            this.startGame();
        }
    }
    
    startGame() {
        // Начальная позиция в первой клетке
        this.gridX = 0;
        this.gridY = 0;
        this.updatePlayerPosition();
        
        // Обработчики клавиш
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Фокус на window
        window.focus();
        
        console.log('Игра готова. Используйте WASDQEZX для движения');
    }
    
    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        
        if (['w', 'a', 's', 'd', 'q', 'e', 'z', 'x'].includes(key)) {
            e.preventDefault();
            
            if (!this.keysPressed[key]) {
                this.keysPressed[key] = true;
                console.log('Нажата клавиша:', key);
                
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
        const key = e.key.toLowerCase();
        
        if (this.keysPressed[key]) {
            delete this.keysPressed[key];
            console.log('Отпущена клавиша:', key);
            
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
            case 'w': newGridY--; break;
            case 's': newGridY++; break;
            case 'a': newGridX--; break;
            case 'd': newGridX++; break;
            case 'q': newGridX--; newGridY--; break;
            case 'e': newGridX++; newGridY--; break;
            case 'z': newGridX--; newGridY++; break;
            case 'x': newGridX++; newGridY++; break;
        }
        
        if (newGridX >= 0 && newGridX < 10 && newGridY >= 0 && newGridY < 6) {
            this.gridX = newGridX;
            this.gridY = newGridY;
            this.updatePlayerPosition();
            console.log(`Движение: ${key} → Клетка [${this.gridX}, ${this.gridY}]`);
        }
    }
    
    updatePlayerPosition() {
        // Позиционируем в левый верхний угол клетки
        const pixelX = this.gridX * this.cellWidth;
        const pixelY = this.gridY * this.cellHeight;
        
        this.player.style.left = pixelX + 'px';
        this.player.style.top = pixelY + 'px';
    }
}

// Запуск игры
window.addEventListener('load', () => {
    console.log('Страница загружена');
    new Game();
});

window.addEventListener('click', () => {
    window.focus();
});
