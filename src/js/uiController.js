const UiController = function () {
    this.list = document.getElementById('collection-list');
    this.calories = document.querySelector('.total-calories');
    this.addBtn = document.querySelector('.add-btn');
    this.mealInput = document.getElementById('meal');
    this.caloriesInput = document.getElementById('calories');
    this.updateBtn = document.querySelector('.update-btn');
    this.deleteBtn = document.querySelector('.delete-btn');
    this.backBtn = document.querySelector('.back-btn');
    this.clearBtn = document.querySelector('.clear-btn');
}
UiController.prototype.renderCalories = function (calories) {
    this.calories.textContent = calories;
}
UiController.prototype.renderItems = function (items) {

    this.list.style.display = 'block';

    let html = ``;

    items.forEach(element => {
        html += `
            <li id="item-${element.id}" class="collection-item"><strong>${element.name}: </strong><em>${element.calories} calories</em><a href="#" class="right"><i class="edit-item fas fa-pencil-alt"></i></a></li>
        `;
    });

    this.list.innerHTML = html;
}
UiController.prototype.getInputs = function () {
    return {
        name: this.mealInput.value,
        calories: this.caloriesInput.value
    }
}
UiController.prototype.clearInputs = function () {
    this.mealInput.value = '';
    this.caloriesInput.value = '';
}
UiController.prototype.hideList = function () {
    this.list.style.display = 'none';
}
UiController.prototype.clearEditState = function () {
    this.clearInputs();
    this.backBtn.style.display = 'none';
    this.deleteBtn.style.display = 'none';
    this.updateBtn.style.display = 'none';
    this.addBtn.style.display = 'inline-block';
}
UiController.prototype.showEditState = function () {
    this.backBtn.style.display = 'inline-block';
    this.deleteBtn.style.display = 'inline-block';
    this.updateBtn.style.display = 'inline-block';
    this.addBtn.style.display = 'none';
}
UiController.prototype.addItemToForm = function (item) {
    this.mealInput.value = item.name;
    this.caloriesInput.value = item.calories;
    this.showEditState();
}



export const uiCntrl = new UiController();