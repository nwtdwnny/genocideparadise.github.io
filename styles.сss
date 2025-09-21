class Game {
    constructor() {
        this.fieldWidth = 1000;
        this.fieldHeight = 1000;
        this.rows = 6;
        this.cols = 10;
        this.cellWidth = this.fieldWidth / this.cols;
        this.cellHeight = this.fieldHeight / this.rows;
        
        this.player = document.getElementById('player');
        this.gameField = document.getElementById('gameField');
        this.grid = document.getElementById('grid');
        this.positionDisplay = document.getElementById('position');
        this.cellDisplay = document.getElementById('cell');
        
        this.playerX = 0;
        this.playerY = 0;
        this.moveDelay = 180;
        this.lastMoveTime = 0;
        this.keysPressed = {};
        this.moveInterval = null;
        
        this.init();
    }
    
    init() {
        this.createGrid();
        this.setupEventListeners();
        this.updatePlayerPosition();
        this.startMovementLoop();
    }
    
    createGrid() {
        this.grid.innerHTML = '';
        
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.style.width = this.cellWidth + 'px';
                cell.style.height = this.cellHeight + 'px';
                cell.style.left = (col * this.cellWidth) + 'px';
                cell.style.top = (row * this.cellHeight) + 'px';
                this.grid.appendChild(cell);
            }
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if ('wasdqezx'.includes(key)) {
                e.preventDefault();
                this.keysPressed[key] = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            if ('wasdqezx'.includes(key)) {
                this.keysPressed[key] = false;
            }
        });
    }
    
    startMovementLoop() {
        setInterval(() => {
            this.handleContinuousMovement();
        }, 50);
    }
    
    handleContinuousMovement() {
        const currentTime = Date.now();
        if (currentTime - this.lastMoveTime < this.moveDelay) {
            return;
        }
        
        let moved = false;
        
        // Обработка перемещения по диагоналям
        if (this.keysPressed['q']) {
            moved = this.movePlayer(-1, -1) || moved;
        }
        if (this.keysPressed['e']) {
            moved = this.movePlayer(1, -1) || moved;
        }
        if (this.keysPressed['z']) {
            moved = this.movePlayer(-1, 1) || moved;
        }
        if (this.keysPressed['x']) {
            moved = this.movePlayer(1, 1) || moved;
        }
        
        // Обработка перемещения по прямым направлениям
        if (this.keysPressed['w']) {
            moved = this.movePlayer(0, -1) || moved;
        }
        if (this.keysPressed['s']) {
            moved = this.movePlayer(0, 1) || moved;
        }
        if (this.keysPressed['a']) {
            moved = this.movePlayer(-1, 0) || moved;
        }
        if (this.keysPressed['d']) {
            moved = this.movePlayer(1, 0) || moved;
        }
        
        if (moved) {
            this.lastMoveTime = currentTime;
        }
    }
    
    movePlayer(dx, dy) {
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        
        // Проверка границ поля
        if (newX >= 0 && newX < this.cols && newY >= 0 && newY < this.rows) {
            this.playerX = newX;
            this.playerY = newY;
            this.updatePlayerPosition();
            return true;
        }
        return false;
    }
    
    updatePlayerPosition() {
        // Центрируем персонаж в клетке
        const pixelX = (this.playerX * this.cellWidth) + (this.cellWidth - 50) / 2;
        const pixelY = (this.playerY * this.cellHeight) + (this.cellHeight - 50) / 2;
        
        this.player.style.left = pixelX + 'px';
        this.player.style.top = pixelY + 'px';
        
        // Обновляем информацию о позиции
        this.positionDisplay.textContent = `${pixelX}, ${pixelY}`;
        this.cellDisplay.textContent = `${this.playerX}, ${this.playerY}`;
    }
    
    getCurrentCell() {
        return {
            x: Math.floor(this.playerX / this.cellWidth),
            y: Math.floor(this.playerY / this.cellHeight)
        };
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
