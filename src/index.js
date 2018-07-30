import 'normalize.css';
import './sass/main.sass';

import { itemCntrl } from './js/itemController';
import { uiCntrl } from './js/uiController';
import { storageCntrl } from './js/storageController';

const App = (function () {

    uiCntrl.clearEditState();

    let items = [];

    if (storageCntrl.getItems()) {
        itemCntrl.setItems(storageCntrl.getItems())
        items = storageCntrl.getItems();
    }

    if (items.length > 0) {
        itemCntrl.countCalories();
        uiCntrl.renderItems(items);
        uiCntrl.renderCalories(itemCntrl.totalCalories);
    } else {
        uiCntrl.hideList();
    }

    (function loadEventListeners() {
        uiCntrl.addBtn.addEventListener('click', addItems);
        document.addEventListener('keypress', disableEnter);
        uiCntrl.list.addEventListener('click', editItem);
        uiCntrl.updateBtn.addEventListener('click', updateItem);
        uiCntrl.backBtn.addEventListener('click', back);
        uiCntrl.deleteBtn.addEventListener('click', deleteItem);
        uiCntrl.clearBtn.addEventListener('click', clearItems);
    })();

    function clearItems() {
        event.preventDefault();

        itemCntrl.clearAll();
        itemCntrl.countCalories();

        uiCntrl.renderItems(itemCntrl.data);
        uiCntrl.hideList();
        uiCntrl.clearEditState();
        uiCntrl.renderCalories(itemCntrl.totalCalories);

        storageCntrl.clearItems();
    }

    function deleteItem(event) {
        event.preventDefault();

        itemCntrl.deleteItem();

        uiCntrl.clearEditState();
        itemCntrl.countCalories();
        uiCntrl.renderItems(itemCntrl.data);
        uiCntrl.renderCalories(itemCntrl.totalCalories);

        storageCntrl.deleteItem(itemCntrl.currentItem);

        if (itemCntrl.data.length === 0) {
            uiCntrl.hideList();
        }
    }

    function back(event) {
        event.preventDefault();

        uiCntrl.clearEditState();
    }

    function updateItem(event) {
        event.preventDefault();

        const itemInput = uiCntrl.getInputs();

        itemCntrl.updateItem(itemInput);
        storageCntrl.editItem(itemCntrl.getItems());
        itemCntrl.countCalories();
        uiCntrl.renderItems(itemCntrl.data);
        uiCntrl.renderCalories(itemCntrl.totalCalories);

    }

    function editItem(event) {
        event.preventDefault();

        if (event.target.classList.contains('edit-item')) {
            const listId = parseInt(event.target.parentNode.parentNode.id.split('-')[1]);

            const itemToEdit = itemCntrl.getItemById(listId);
            itemCntrl.setCurrentItem(itemToEdit);

            uiCntrl.addItemToForm(itemCntrl.getCurrentItem());
        }
    }

    function addItems(event) {
        event.preventDefault();

        const input = uiCntrl.getInputs();

        if (input.name.length > 0 && input.calories > 0) {
            itemCntrl.createItem(input.name, parseInt(input.calories));
            itemCntrl.countCalories();
            uiCntrl.renderCalories(itemCntrl.totalCalories);
            uiCntrl.clearInputs();
            uiCntrl.renderItems(itemCntrl.getItems());
            storageCntrl.setItems(itemCntrl.getItems());
        } else {
            alert('enter a valid info');
        }
    }

    function disableEnter(event) {
        if (event.keyCode === 13 || event.which === 13) {
            event.preventDefault();
            return false;
        }
    }
})();