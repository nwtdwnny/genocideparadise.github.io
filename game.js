
// Конфигурация игрового поля
const COLS = 10;   // 10 колонн
const ROWS = 6;    // 6 рядов
const FIELD_WIDTH = 1000;
const FIELD_HEIGHT = 1000;

// Размеры клеток (не квадратные)
const CELL_WIDTH = FIELD_WIDTH / COLS;
const CELL_HEIGHT = FIELD_HEIGHT / ROWS;

// Основной класс игры
class Game {
    constructor() {
        this.playerPosition = { x: 0, y: 0 };
        this.playerStats = {
            health: 100,
            hunger: 100,
            energy: 100,
            mood: 100,
            strength: 5,
            agility: 5,
            stamina: 5,
            intelligence: 5
        };
        
        this.init();
    }
    
    init() {
        this.createGameField();
        this.setupEventListeners();
        this.updatePlayerPosition();
        this.updateStatsDisplay();
    }
    
    // Создание игрового поля
    createGameField() {
        const gameField = document.getElementById('game-field');
        
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.width = CELL_WIDTH + 'px';
                cell.style.height = CELL_HEIGHT + 'px';
                cell.style.left = (x * CELL_WIDTH) + 'px';
                cell.style.top = (y * CELL_HEIGHT) + 'px';
                
                // Добавляем чередование цветов для наглядности
                if ((x + y) % 2 === 0) {
                    cell.style.backgroundColor = 'rgba(200, 220, 200, 0.5)';
                }
                
                gameField.appendChild(cell);
            }
        }
    }
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Обработка нажатий клавиш
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
        
        // Обработка кликов по кнопкам управления
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                if (key) {
                    this.handleMovement(key);
                }
            });
        });
        
        // Заглушки для действий
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Действие "' + btn.textContent + '" будет реализовано позже!');
            });
        });
    }
    
    // Обработка нажатия клавиш
    handleKeyPress(event) {
        const key = event.key.toUpperCase();
        this.handleMovement(key);
    }
    
    // Обработка движения
    handleMovement(key) {
        switch(key) {
            case 'W': this.movePlayer(0, -1); break;  // Вверх
            case 'S': this.movePlayer(0, 1); break;   // Вниз
            case 'A': this.movePlayer(-1, 0); break;  // Влево
            case 'D': this.movePlayer(1, 0); break;   // Вправо
            case 'Q': this.movePlayer(-1, -1); break; // Вверх-влево
            case 'E': this.movePlayer(1, -1); break;  // Вверх-вправо
            case 'Z': this.movePlayer(-1, 1); break;  // Вниз-влево
            case 'X': this.movePlayer(1, 1); break;   // Вниз-вправо
        }
    }
    
    // Движение игрока
    movePlayer(dx, dy) {
        const newX = this.playerPosition.x + dx;
        const newY = this.playerPosition.y + dy;
        
        // Проверяем границы поля
        if (newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS) {
            this.playerPosition.x = newX;
            this.playerPosition.y = newY;
            this.updatePlayerPosition();
            
            // Немного уменьшаем энергию при движении
            this.playerStats.energy = Math.max(0, this.playerStats.energy - 1);
            this.updateStatsDisplay();
        }
    }
    
    // Обновление позиции игрока
    updatePlayerPosition() {
        const player = document.getElementById('player');
        player.style.left = (this.playerPosition.x * CELL_WIDTH + CELL_WIDTH/2 - 30) + 'px';
        player.style.top = (this.playerPosition.y * CELL_HEIGHT + CELL_HEIGHT/2 - 30) + 'px';
        
        // Обновляем координаты
        document.getElementById('coordinates').textContent = 
            `X: ${this.playerPosition.x}, Y: ${this.playerPosition.y}`;
    }
    
    // Обновление статистики на экране
    updateStatsDisplay() {
        document.getElementById('health-value').textContent = this.playerStats.health;
        document.getElementById('hunger-value').textContent = this.playerStats.hunger;
        document.getElementById('energy-value').textContent = this.playerStats.energy;
        document.getElementById('mood-value').textContent = this.playerStats.mood;
        document.getElementById('strength-value').textContent = this.playerStats.strength;
        document.getElementById('agility-value').textContent = this.playerStats.agility;
        document.getElementById('stamina-value').textContent = this.playerStats.stamina;
        document.getElementById('intelligence-value').textContent = this.playerStats.intelligence;
    }
}

// Инициализация игры при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();
    console.log('Игра загружена! Размер клеток: ' + CELL_WIDTH.toFixed(1) + 'x' + CELL_HEIGHT.toFixed(1) + ' пикселей');
});
