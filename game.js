// game.js
console.log("Игра загружается! Добро пожаловать в жопу!");

// Ждем, когда весь HTML-документ загрузится
document.addEventListener('DOMContentLoaded', function() {

    // 1. Создаем контейнер для игровых элементов
    const gameContainer = document.createElement('div');
    gameContainer.style.textAlign = 'center';
    gameContainer.style.marginTop = '50px';
    document.body.appendChild(gameContainer);

    // 2. Добавляем приветственный текст (больше и стилизованнее)
    const welcomeText = document.createElement('h2');
    welcomeText.textContent = 'Добро пожаловать в Genparadise!';
    welcomeText.style.color = '#ff4757';
    welcomeText.style.fontFamily = 'Arial, sans-serif';
    welcomeText.style.marginBottom = '30px';
    gameContainer.appendChild(welcomeText);

    // 3. Создаем кнопку, которая будет убегать
    const runButton = document.createElement('button');
    runButton.textContent = 'Поймай меня!';
    runButton.style.position = 'absolute';
    runButton.style.padding = '15px 25px';
    runButton.style.fontSize = '18px';
    runButton.style.cursor = 'pointer';
    runButton.style.backgroundColor = '#5352ed';
    runButton.style.color = 'white';
    runButton.style.border = 'none';
    runButton.style.borderRadius = '8px';
    runButton.style.transition = 'all 0.2s ease';

    // 4. Размещаем кнопку случайно на экране
    function placeRandomly() {
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);
        runButton.style.left = `${x}px`;
        runButton.style.top = `${y}px`;
    }

    placeRandomly(); // Ставим кнопку в случайное место при загрузке
    gameContainer.appendChild(runButton);

    // 5. Заставляем кнопку убегать при наведении курсора
    runButton.addEventListener('mouseover', function() {
        // Слегка меняем внешний вид при попытке поймать
        runButton.style.backgroundColor = '#ff4757';
        runButton.textContent = 'А не поймаешь!';
        
        // Убегаем в другое случайное место
        placeRandomly();
        
        // Добавляем звуковой эффект (опционально)
        try {
            const beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            beep.play();
        } catch (e) {
            console.log("Не удалось воспроизвести звук");
        }
    });

    // 6. Возвращаем нормальный вид, когда курсор убирают
    runButton.addEventListener('mouseout', function() {
        runButton.style.backgroundColor = '#5352ed';
        runButton.textContent = 'Поймай меня!';
    });

    // 7. Добавляем обработчик клика (на случай, если все-таки поймают)
    runButton.addEventListener('click', function() {
        alert('О нет! Ты поймал меня! 😱\nНо ненадолго...');
        placeRandomly(); // И снова убегаем после поимки
    });

    // 8. Обновляем позицию кнопки при изменении размера окна
    window.addEventListener('resize', placeRandomly);

    console.log("Коварная кнопка создана! Попробуй поймать её!");
});
