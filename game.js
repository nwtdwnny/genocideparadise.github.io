function handleImageError(imageName) {
    console.error(`Ошибка загрузки изображения: ${imageName}.png`);
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.textContent = `Ошибка загрузки: ${imageName}.png. Используются замены.`;
    }
}

class Game {
    constructor() {
        this.player = document.getElementById('player');
        this.gameField = document.getElementById('gameField');
        this.positionInfo = document.getElementById('positionInfo');
        this.cellWidth = 100;
        this.cellHeight = 166.67;
        this.playerSize = 80;
        this.moveDelay = 180;
        
        this.playerX = 0;
        this.playerY = 0;
        this.keysPressed = {};
        this.moveInterval = null;
        
        console.log('Игра инициализирована');
        this.init();
    }
    
    init() {
        if (!this.player) {
            console.error('Элемент player не найден!');
            return;
        }
        
        if (!this.gameField) {
            console.error('Элемент gameField не найден!');
            return;
        }
        
        // Центрируем игрока
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
        
        console.log('Игра готова к использованию');
    }
    
    centerPlayer() {
        // Начальная позиция в центре
        this.playerX = Math.floor(5 * this.cellWidth + (this.cellWidth - this.playerSize) / 2);
        this.playerY = Math.floor(3 * this.cellHeight + (this.cellHeight - this.playerSize) / 2);
        this.updatePlayerPosition();
        console.log('Игрок размещен в центре');
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
            
            console.log(`Нажата клавиша: ${key}`);
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
                console.log('Все клавиши отпущены');
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
            console.log(`Перемещение: ${key}, Новая позиция: ${this.playerX}, ${this.playerY}`);
        } else {
            console.log(`Движение заблокировано: выход за границы (${newX}, ${newY})`);
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
        
        if (this.positionInfo) {
            this.positionInfo.textContent = `${this.playerX}, ${this.playerY}`;
        }
    }
}

// Запуск игры при загрузке страницы
window.addEventListener('load', () => {
    console.log('Страница загружена, запуск игры...');
    new Game();
});

// Обработчик ошибок
window.addEventListener('error', (e) => {
    console.error('Произошла ошибка:', e.error);
    const debugInfo = document.getElementById('debugInfo');
    if (debugInfo) {
        debugInfo.textContent = `Ошибка: ${e.message}`;
    }
});
