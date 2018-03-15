function Grid(obj) {
    this.cards = document.querySelectorAll('.card');
    this.cols = obj.cols || 2;
    this.width = obj.width || 300;
    this.smaller;

    this.firstRow();
    for ( var i = 0; i < this.cards.length; i++ ) {
        this.cards[i].style.width = this.width + 'px';
        if (i >= this.cols) {
            this.smaller = this.getSmaller();
            this.cards[i].classList.add('topEl');
            this.cards[i].style.left = this.smaller.offsetLeft + 'px';
            this.cards[i].style.top = this.smaller.offsetTop + this.smaller.offsetHeight + 'px';
        }
    }
}

Grid.prototype.firstRow = function () {
    for ( var i = 0; i < this.cols; i++ ) {
        this.cards[i].classList.add('topEl');
        if ( this.cards[i] === this.cards[0] ) {
            this.cards[i].style.left = 0;
            this.cards[i].style.top = 0;
        } else {
            this.cards[i].style.left = this.cards[i - 1].offsetLeft + this.width  + 'px';
        }
    }
};
Grid.prototype.getSmaller = function() {
    var topEl = document.querySelectorAll('.topEl');
    this.smaller = topEl[0];
    for (var i = 0; i < topEl.length; i++) {
        if (this.smaller.offsetTop + this.smaller.offsetHeight > topEl[i].offsetTop + topEl[i].offsetHeight) {
            this.smaller = topEl[i];
        }
    }
    this.smaller.classList.remove('topEl');
    return this.smaller;
};

new Grid({
    cols: 4,
    width: 200
});
