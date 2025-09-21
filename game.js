document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация игры
    const config = {
        fieldWidth: 10,
        fieldHeight: 6,
        cellSize: 100, // 1000px / 10 клеток = 100px на клетку
        playerStartX: 5,
        playerStartY: 3
    };

    // Состояние игрока
    const player = {
        x: config.playerStartX,
        y: config.playerStartY,
        health: 100,
        maxHealth: 100,
        satiety: 80,
        maxSatiety: 100,
        skills: {
            strength: 5,
            agility: 5,
            smell: 5 // Навык нюха, как в CatWar
        },
        inventory: [] // Предметы "во рту"
    };

    // Элементы DOM
    const gameField = document.getElementById('game-field');
    const playerElement = document.createElement('div');
    playerElement.id = 'player';

    // Инициализация игрового поля
    function initGameField() {
        // Создаем клетки поля
        for (let y = 0; y < config.fieldHeight; y++) {
            for (let x = 0; x < config.fieldWidth; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                gameField.appendChild(cell);
            }
        }

        // Добавляем персонажа на поле
        gameField.appendChild(playerElement);
        updatePlayerPosition();
    }

    // Обновление позиции персонажа
    function updatePlayerPosition() {
        playerElement.style.left = (player.x * config.cellSize) + 'px';
        playerElement.style.top = (player.y * config.cellSize) + 'px';
    }

    // Обработка движения
    function movePlayer(dx, dy) {
        const newX = player.x + dx;
        const newY = player.y + dy;

        // Проверка границ поля
        if (newX >= 0 && newX < config.fieldWidth && 
            newY >= 0 && newY < config.fieldHeight) {
            player.x = newX;
            player.y = newY;
            updatePlayerPosition();
            
            // Здесь можно добавить логику встреч с другими объектами
            console.log(`Игрок переместился на: [${player.x}, ${player.y}]`);
        }
    }

    // Обработка нажатий клавиш
    document.addEventListener('keydown', function(event) {
        switch(event.key.toLowerCase()) {
            case 'w': movePlayer(0, -1); break; // Вверх
            case 's': movePlayer(0, 1); break;  // Вниз
            case 'a': movePlayer(-1, 0); break; // Влево
            case 'd': movePlayer(1, 0); break;  // Вправо
            case 'q': movePlayer(-1, -1); break; // Вверх-влево
            case 'e': movePlayer(1, -1); break;  // Вверх-вправо
            case 'z': movePlayer(-1, 1); break;  // Вниз-влево
            case 'x': movePlayer(1, 1); break;   // Вниз-вправо
        }
    });

    // Запуск игры
    initGameField();
    console.log('Игра запущена! Используйте WASD/QEZX для движения.');
});
