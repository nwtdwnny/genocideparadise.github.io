class Game {
    constructor() {
        this.player = document.getElementById('player');
        this.gameField = document.getElementById('gameField');
        this.cellWidth = 100; // 1000px / 10 колонок
        this.cellHeight = 166.67; // 1000px / 6 рядов
        this.playerSize = 80;
        this.moveDelay = 180;
        
        this.playerX = 0;
        this.playerY = 0;
        this.keysPressed = {};
        this.moveInterval = null;
        
        this.init();
    }
    
    init() {
        // Центрируем игрока в начале
        this.centerPlayer();
        
        // Обработчики событий
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Предотвращаем стандартное поведение клавиш
        document.addEventListener('keydown', (e) => {
            if (['w', 'a', 's', 'd', 'q', 'e', 'z', 'x'].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });
    }
    
    centerPlayer() {
        // Начальная позиция в центре
        this.playerX = Math.floor(5 * this.cellWidth + (this.cellWidth - this.playerSize) / 2);
        this.playerY = Math.floor(3 * this.cellHeight + (this.cellHeight - this.playerSize) / 2);
        this.updatePlayerPosition();
    }
    
    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        
        if (['w', 'a', 's', 'd', 'q', 'e', 'z', 'x'].includes(key) && !this.keysPressed[key]) {
            this.keysPressed[key] = true;
            
            // Первое мгновенное движение
            this.movePlayer(key);
            
            // Запускаем интервал для непрерывного движения
            if (!this.moveInterval) {
                this.moveInterval = setInterval(() => {
                    this.continuousMove();
                }, this.moveDelay);
            }
        }
    }
    
    handleKeyUp(e) {
        const key = e.key.toLowerCase();
        
        if (this.keysPressed[key]) {
            delete this.keysPressed[key];
            
            // Если больше нет нажатых клавиш, останавливаем интервал
            if (Object.keys(this.keysPressed).length === 0 && this.moveInterval) {
                clearInterval(this.moveInterval);
                this.moveInterval = null;
            }
        }
    }
    
    continuousMove() {
        // Двигаемся по всем нажатым клавишам
        Object.keys(this.keysPressed).forEach(key => {
            this.movePlayer(key);
        });
    }
    
    movePlayer(key) {
        let newX = this.playerX;
        let newY = this.playerY;
        
        switch(key) {
            case 'w': // Вверх
                newY -= this.cellHeight;
                break;
            case 's': // Вниз
                newY += this.cellHeight;
                break;
            case 'a': // Влево
                newX -= this.cellWidth;
                break;
            case 'd': // Вправо
                newX += this.cellWidth;
                break;
            case 'q': // Вверх-влево
                newX -= this.cellWidth;
                newY -= this.cellHeight;
                break;
            case 'e': // Вверх-вправо
                newX += this.cellWidth;
                newY -= this.cellHeight;
                break;
            case 'z': // Вниз-влево
                newX -= this.cellWidth;
                newY += this.cellHeight;
                break;
            case 'x': // Вниз-вправо
                newX += this.cellWidth;
                newY += this.cellHeight;
                break;
        }
        
        // Проверяем границы
        if (this.isWithinBounds(newX, newY)) {
            this.playerX = newX;
            this.playerY = newY;
            this.updatePlayerPosition();
        }
    }
    
    isWithinBounds(x, y) {
        return x >= 0 && 
               x <= 1000 - this.playerSize && 
               y >= 0 && 
               y <= 1000 - this.playerSize;
    }
    
    updatePlayerPosition() {
        this.player.style.left = this.playerX + 'px';
        this.player.style.top = this.playerY + 'px';
    }
}

// Запуск игры при загрузке страницы
window.addEventListener('load', () => {
    new Game();
});
