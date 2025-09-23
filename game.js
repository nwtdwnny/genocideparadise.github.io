class Game {
    constructor() {
        this.player = document.getElementById('player');
        this.gameField = document.getElementById('gameField');
        
        this.cellWidth = 100;
        this.cellHeight = 166.67;
        this.moveDelay = 180;
        
        // Позиция в клетках (не в пикселях)
        this.gridX = 0;
        this.gridY = 0;
        
        this.keysPressed = {};
        this.moveInterval = null;
        
        this.init();
    }
    
    init() {
        console.log('Игра инициализируется...');
        
        // Начальная позиция в левом верхнем углу
        this.gridX = 0;
        this.gridY = 0;
        this.updatePlayerPosition();
        
        // Обработчики событий клавиатуры
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Предотвращаем стандартное поведение клавиш
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (['w', 'a', 's', 'd', 'q', 'e', 'z', 'x'].includes(key)) {
                e.preventDefault();
            }
        });
        
        // Фокус на странице
        window.focus();
        document.body.focus();
        
        console.log('Игра готова. Используйте WASDQEZX для движения');
    }
    
    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        console.log('Нажата клавиша:', key);
        
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
            console.log('Отпущена клавиша:', key);
            
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
        let newGridX = this.gridX;
        let newGridY = this.gridY;
        
        switch(key) {
            case 'w': // Вверх
                newGridY--;
                break;
            case 's': // Вниз
                newGridY++;
                break;
            case 'a': // Влево
                newGridX--;
                break;
            case 'd': // Вправо
                newGridX++;
                break;
            case 'q': // Вверх-влево
                newGridX--;
                newGridY--;
                break;
            case 'e': // Вверх-вправо
                newGridX++;
                newGridY--;
                break;
            case 'z': // Вниз-влево
                newGridX--;
                newGridY++;
                break;
            case 'x': // Вниз-вправо
                newGridX++;
                newGridY++;
                break;
        }
        
        // Проверяем границы (10 колонок × 6 рядов)
        if (newGridX >= 0 && newGridX < 10 && newGridY >= 0 && newGridY < 6) {
            this.gridX = newGridX;
            this.gridY = newGridY;
            this.updatePlayerPosition();
            console.log(`Перемещение: ${key}, Позиция: ${this.gridX}, ${this.gridY}`);
        }
    }
    
    updatePlayerPosition() {
        // Позиционируем точно в левый верхний угол клетки
        const pixelX = this.gridX * this.cellWidth;
        const pixelY = this.gridY * this.cellHeight;
        
        this.player.style.left = pixelX + 'px';
        this.player.style.top = pixelY + 'px';
    }
}

// Запуск игры при загрузке страницы
window.addEventListener('load', () => {
    console.log('Страница загружена');
    new Game();
});

// Фокус на окне для обработки клавиш
window.addEventListener('click', () => {
    window.focus();
    document.body.focus();
});

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Ошибка:', e.error);
});
