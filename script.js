/*let body = document.querySelector('.page'); */
let editButton = document.querySelector('.profile__edit-button');
let popupClosed = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup_opened');

function popupVisible () {
    let editButton = document.querySelector('.profile__edit-button');

    editButton.addEventListener ('click', popupVisible); 
    popupClosed.classList.add('popup_opened'); 
}

popupVisible ();

function popupInvisible () {
    let closeButton = document.querySelector ('.popup__close-icon')

    closeButton.addEventListener ('click', popupInvisible);
    popupClosed.classList.remove('popup_opened');
}

popupInvisible ();
