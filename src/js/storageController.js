const StorageController = function () {
    this.itemsFromStorage = JSON.parse(localStorage.getItem('items')) || [];
}

StorageController.prototype.setItems = function(items) {
    this.itemsFromStorage = items;
    localStorage.setItem('items', JSON.stringify(this.itemsFromStorage));
}
StorageController.prototype.getItems = function() {
    return this.itemsFromStorage;
}
StorageController.prototype.clearItems = function() {
    localStorage.clear('items');
}
StorageController.prototype.deleteItem = function(itemToDelete) {
    this.itemsFromStorage.forEach((item, index) => {
        if (item.id === itemToDelete.id) {
            this.itemsFromStorage.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(this.itemsFromStorage));
}
StorageController.prototype.editItem = function(itemToEdit) {
    this.itemsFromStorage.forEach(item => {
        if (item.id === itemToEdit.id) {
            item.name = itemToEdit.name;
            item.calories = itemToEdit.calories;
        }
    });
    localStorage.setItem('items', JSON.stringify(this.itemsFromStorage));
}



export const storageCntrl = new StorageController();