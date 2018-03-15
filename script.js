function Grid(obj) {
    // Инициализация начальных свойств
    this.cards = document.querySelectorAll('.card'); // Сортируемые елементы
    this.cols = obj.cols || 4; // Количество колонок (если в аргументе не заданы, тогда число по умолчанию)
    this.width = obj.width || 300; // Ширина элементов
    this.smaller; // Переменная, для самого маленького (по высоте) элемента

    this.firstRow(); // Метод расставляет первую полосу элементов
    for ( var i = 0; i < this.cards.length; i++ ) {
        this.cards[i].style.width = this.width + 'px'; // Устанавливаем ширину для каждого элемента заданную в инициализации
        if (i >= this.cols) { // Проходим по всем элементам, начиная с того, который не попал в первую строку (метод FirstRow())
            this.smaller = this.getSmaller(); // Записываем в переменную элемент, под который упадет следующий
            this.cards[i].classList.add('topEl'); // Задаем класс новому элементу
            this.cards[i].style.left = this.smaller.offsetLeft + 'px'; // Устанавливаем свойство left элементу, равное свойству left того элемента, под которого он падает
            this.cards[i].style.top = this.smaller.offsetTop + this.smaller.offsetHeight + 'px'; // Устанавливаем свойство top элементу, равное отступу сверху + высоте того элемента, под которого падает блок
        }
    }
}

// Метод расставляет первую полосу элементов
Grid.prototype.firstRow = function () {
    for ( var i = 0; i < this.cols; i++ ) { // Цикл по элементам, которые попадают в первую строку
        this.cards[i].classList.add('topEl'); // Добавляем класс, указывая, что под этот элемент можно установить еще один
        if ( this.cards[i] === this.cards[0] ) { // Первому элементу в строке устанавливаем свойства top & left в ноль
            this.cards[i].style.left = 0;
            this.cards[i].style.top = 0;
        } else { // Всем остальным свойство left равное свойству left предыдущего плюс ширина предыдущего
            this.cards[i].style.left = this.cards[i - 1].offsetLeft + this.width  + 'px';
        }
    }
};

// Метод, который получает элемент, с самым меньшим отступом от верха родителя
Grid.prototype.getSmaller = function() {
    var topEl = document.querySelectorAll('.topEl'); // Получаем все элементы, под которые можно складывать следующие
    this.smaller = topEl[0]; // Начальное значение переменной будет первый элемент в полученном списке
    for (var i = 0; i < topEl.length; i++) {
        if (this.smaller.offsetTop + this.smaller.offsetHeight > topEl[i].offsetTop + topEl[i].offsetHeight) {
            this.smaller = topEl[i]; // Находим элемент с самым меньшим расстоянием от верха
        }
    }
    this.smaller.classList.remove('topEl'); // Удаляем у него класс
    return this.smaller; // Возвращаем его
};

new Grid({
    cols: 4,
    width: 200
});
