const ItemController = function () {
    this.data = [];
    this.currentItem = null;
    this.totalCalories = 0;
}
ItemController.prototype.createItem = function (name, calories) {
    this.data.push({
        id: this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 0,
        name: name,
        calories: calories
    })
}
ItemController.prototype.getItems = function () {
    return this.data;
}
ItemController.prototype.setItems = function (items) {
    this.data = items;
}
ItemController.prototype.log = function () {
    console.log(this.data);
}
ItemController.prototype.countCalories = function () {
    let total = 0;

    this.data.forEach(item => {
        total += item.calories;
    })

    this.totalCalories = total;
}
ItemController.prototype.getItemById = function (id) {
    let found = null;

    this.data.forEach(item => {
        if (item.id === id) {
            found = item;
        }
    })
    return found;
}
ItemController.prototype.setCurrentItem = function (item) {
    this.currentItem = item;
}
ItemController.prototype.getCurrentItem = function () {
    return this.currentItem;
}
ItemController.prototype.deleteItem = function() {
    this.data.forEach((item, index) => {
        if (item.id === this.currentItem.id) {
            this.data.splice(index, 1);
        }
    });
}
ItemController.prototype.updateItem = function(item) {
    const name = item.name;
    const calories = parseInt(item.calories);

    this.data.forEach(item => {
        if (item.id === this.currentItem.id) {
            item.name = name;
            item.calories = calories;
        }
    });
}
ItemController.prototype.clearAll = function() {
    this.data = [];
}

export const itemCntrl = new ItemController();