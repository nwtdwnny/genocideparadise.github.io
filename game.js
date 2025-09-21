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
        
        console.log('Игра загружена! Размер клеток: ' + 
                   CELL_WIDTH.toFixed(1) + 'x' + 
                   CELL_HEIGHT.toFixed(1) + ' пикселей');
    }
    
    // Создание игрового поля
    createGameField() {
        const gameField = document.getElementById('game-field');
        
        // Очищаем поле, но сохраняем игрока и координаты
        const playerElement = document.getElementById('player');
        const coordinatesElement = document.getElementById('coordinates');
        
        // Временно удаляем их
        if (playerElement) playerElement.remove();
        if (coordinatesElement) coordinatesElement.remove();
        
        // Очищаем поле
        gameField.innerHTML = '';
        
        // Создаем контейнер для клеток
        const cellsContainer = document.createElement('div');
        cellsContainer.id = 'cells-container';
        cellsContainer.style.position = 'relative';
        cellsContainer.style.width = '100%';
        cellsContainer.style.height = '100%';
        
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
                    cell.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                } else {
                    cell.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                }
                
                // Добавляем координаты в ячейку (для отладки)
                cell.setAttribute('data-x', x);
                cell.setAttribute('data-y', y);
                
                cellsContainer.appendChild(cell);
            }
        }
        
        gameField.appendChild(cellsContainer);
        
        // Возвращаем игрока и координаты
        if (playerElement) gameField.appendChild(playerElement);
        if (coordinatesElement) gameField.appendChild(coordinatesElement);
        
        // Обновляем позицию игрока
        this.updatePlayerPosition();
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
                this.showMessage('Действие "' + btn.textContent + '" будет реализовано позже!');
            });
        });
        
        // Обработка кликов по клеткам поля
        document.getElementById('game-field').addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                const x = parseInt(e.target.getAttribute('data-x'));
                const y = parseInt(e.target.getAttribute('data-y'));
                this.moveToCell(x, y);
            }
        });
    }
    
    // Обработка нажатия клавиш
    handleKeyPress(event) {
        const key = event.key.toUpperCase();
        this.handleMovement(key);
        
        // Предотвращаем прокрутку страницы при использовании клавиш WASD
        if (['W', 'A', 'S', 'D', 'Q', 'E', 'Z', 'X'].includes(key)) {
            event.preventDefault();
        }
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
    
    // Перемещение к конкретной клетке
    moveToCell(x, y) {
        if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
            this.playerPosition.x = x;
            this.playerPosition.y = y;
            this.updatePlayerPosition();
            this.showMessage(`Перемещение в клетку (${x}, ${y})`);
        }
    }
    
    // Обновление позиции игрока
    updatePlayerPosition() {
        const player = document.getElementById('player');
        if (player) {
            player.style.left = (this.playerPosition.x * CELL_WIDTH + CELL_WIDTH/2 - 35) + 'px';
            player.style.top = (this.playerPosition.y * CELL_HEIGHT + CELL_HEIGHT/2 - 35) + 'px';
            
            // Обновляем координаты
            const coords = document.getElementById('coordinates');
            if (coords) {
                coords.textContent = `X: ${this.playerPosition.x}, Y: ${this.playerPosition.y}`;
            }
        }
    }
    
    // Обновление статистики на экране
    updateStatsDisplay() {
        const stats = this.playerStats;
        document.getElementById('health-value').textContent = stats.health;
        document.getElementById('hunger-value').textContent = stats.hunger;
        document.getElementById('energy-value').textContent = stats.energy;
        document.getElementById('mood-value').textContent = stats.mood;
        document.getElementById('strength-value').textContent = stats.strength;
        document.getElementById('agility-value').textContent = stats.agility;
        document.getElementById('stamina-value').textContent = stats.stamina;
        document.getElementById('intelligence-value').textContent = stats.intelligence;
    }
    
    // Вспомогательная функция для показа сообщений
    showMessage(text) {
        // Создаем временное сообщение
        const message = document.createElement('div');
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'white';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '5px';
        message.style.zIndex = '1000';
        
        document.body.appendChild(message);
        
        // Удаляем сообщение через 3 секунды
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    }
}

// Инициализация игры при загрузке документа
document.addEventListener('DOMContentLoaded', function() {
    const game = new Game();
});
