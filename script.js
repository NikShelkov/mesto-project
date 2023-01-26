// ###################### Добавляем карточки ##################### //
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addCardButtonElement = document.querySelector('.profile__add-button');
const closeButtonElement = document.querySelectorAll('.popup__close-icon');
const popupProfileElement = document.querySelector('.popup');
const popupPlaceElement = document.querySelector('.popup_type_place');

const cardsBox = document.querySelector('.elements')

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(element => {
    cardsBox.insertAdjacentHTML('beforeEnd', `
    <article class="card">
    <img class="card__image" src="${element.link}" alt="${element.name}">
    <h3 class="card__place-name">${element.name}</h3>
    <button class="card__button" type="button" aria-label="Поставить лайк"></button>
    <button class="trash" style="position: absolute; top: 20px; right: 20px; width: 18px; height: 19px; cursor: pointer; background-color: transparent; background-image: url(&quot;./images/Delete_button.svg&quot;); border: 0px; background-repeat: no-repeat;"></button>
    </article>
    `)
});

// ####################### Удаление карточек ####################### //
const deleteCardFunc = (deleteCardColletion) => {
    deleteCardColletion.forEach(item => {
        item.addEventListener('click', deleteCard)
    })
    function deleteCard(event) {
        if(event.target.classList.contains('trash')) {
        event.target.closest('.card').remove()
        }
        else if(event.target.classList.contains('card__button')) {
            event.target.classList.toggle('card__button_liked')
        }
        else if(event.target.classList.contains('card__image')) {
            scaleImage(event.target)
        }
}
}

function scaleImage(targetEl) {
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.bottom = 0;
    modal.style.right = 0;
    modal.style.background = "rgba(0,0,0,0.5)";
    modal.style.zIndex = 100;
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.flexDirection = "column";
    modal.style.alignItems = "center";
  
    let div = document.createElement("div");
    div.style.width = 'content';
    div.style.height = 'content';
    div.style.boxSizing = 'border-box';
    
//    div.style.width = "50%";
//    div.style.height = "80%";
    div.style.textAlign = "center";
    let img = document.createElement("img");
    if (targetEl.tagName === "IMG") {
      img.src = targetEl.src;
    } else {
      img.src = targetEl.style.backgroundImage.slice(5, -2);
    }
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
  // <button class="popup__close-icon popup__close-icon_type_place" type="button" aria-label="Закрыть окно">
  // </button>
    const buttonClosePlace = document.createElement('button')
    buttonClosePlace.classList.add('popup__close-icon')
    console.log(buttonClosePlace)

    div.append(buttonClosePlace, img);
    modal.append(div);
    // let close = document.createElement("div");
    // close.classList.add("icon_close_button", "close_icon_white");
  
    // close.style.marginLeft = "calc(100% - 25px)";
    // close.style.cursor = "pointer";
  
    // div.append(close);

    modal.addEventListener("pointerdown", (e) => {
      modal.remove();
    });
    document.body.append(modal);
  }

// const cardLikeActive = document.querySelector('.card__button_liked');

// function putLike(event) {
//     event.target.classList.toggle('card__button_liked')
// }

// cardLikeCollection.forEach(like => {
//     like.addEventListener('click', (event) => putLike(event))
// })

// const putLikeFunc = (likeCardColletion) => {
//     likeCardColletion.forEach(item => {
//         item.addEventListener('click', putLike)
//     })
//     function putLike(event) {
//         event.target.classList.toggle('card__button_liked')
//         }
// } 

let cardCollection = document.querySelectorAll('.card')

//################## добавление кнопки удаления карточки ###### //

deleteCardFunc(cardCollection)
let cardDeleteButtonActive = document.querySelectorAll('.trash')
let cardLikeCollection = document.querySelectorAll('.card__button');


// #################  Редактирование профиля ########################## //
const editButton = document.querySelector('.popup__button_type_profile')
const proJob = document.querySelector('.popup__item_type_profession')
const proName = document.querySelector('.popup__item_type_name')
const profileName = document.querySelector('.profile__name')
const profileProfession = document.querySelector('.profile__profession')

editButton.addEventListener('click', saveProfileInfo)

function saveProfileInfo(evt) {
    evt.preventDefault()
    const nameInputValue = proName.value
    const jobInputValue = proJob.value
    profileName.innerText = nameInputValue
    profileProfession.innerText = jobInputValue
    const popupProfileTemp = evt.target.parentElement.parentElement.parentElement.parentElement
    closePopup(popupProfileTemp)
}


// ######## открытие для всех попап ######################################//
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

editProfileButtonElement.addEventListener('click', function () {
    openPopup(popupProfileElement);
});

addCardButtonElement.addEventListener('click', function () {
    openPopup(popupPlaceElement)
});

// закрытие для всех попап //
function closePopup(openedPopup) {
    openedPopup.classList.remove('popup_opened');
}

closeButtonElement.forEach(butt => {
    butt.addEventListener('click', function () {
        closePopup(butt.parentElement.parentElement);
    });
})

// ################## Добавление карточки ################## //
function addCard(placeValue, urlValue) {
    const cardContainer = document.createElement('article')
    cardContainer.classList.add('card')

    const cardImage = document.createElement('img')
    cardImage.classList.add('card__image')
    cardImage.setAttribute('src', urlValue)

    const cardPlaceName = document.createElement('h3')
    cardPlaceName.classList.add('card__place-name')
    cardPlaceName.textContent = placeValue

    const cardlikeButton = document.createElement('button')
    cardlikeButton.classList.add('card__button')

            const cardDeleteButton = document.createElement('button')
            cardDeleteButton.classList.add('trash')
            cardDeleteButton.style.position = 'absolute'
            cardDeleteButton.style.top = '20px'
            cardDeleteButton.style.right = '20px'
            cardDeleteButton.style.width = '18px'
            cardDeleteButton.style.height = '19px'
            cardDeleteButton.style.cursor = 'pointer'
            cardDeleteButton.style.backgroundColor = 'transparent'
            cardDeleteButton.style.backgroundImage = 'url(./images/Delete_button.svg)'
            cardDeleteButton.style.border = 0
            cardDeleteButton.style.backgroundRepeat = 'no-repeat'
        
    cardContainer.append(cardImage, cardPlaceName, cardlikeButton, cardDeleteButton)
    cardsBox.prepend(cardContainer)

    cardCollection = document.querySelectorAll('.card')
    
    cardDeleteButtonActive = document.querySelectorAll('.trash')
    
    cardLikeCollection = document.querySelectorAll('.card__button');
    deleteCardFunc(cardCollection)
}

// cardCollection.forEach(item => {
//     const cardDeleteButton = document.createElement('button')
//     cardDeleteButton.classList.add('trash')
//     cardDeleteButton.style.position = 'absolute'
//     cardDeleteButton.style.top = '20px'
//     cardDeleteButton.style.right = '20px'
//     cardDeleteButton.style.width = '18px'
//     cardDeleteButton.style.height = '19px'
//     cardDeleteButton.style.cursor = 'pointer'
//     cardDeleteButton.style.backgroundColor = 'transparent'
//     cardDeleteButton.style.backgroundImage = 'url(./images/Delete_button.svg)'
//     cardDeleteButton.style.border = 0
//     cardDeleteButton.style.backgroundRepeat = 'no-repeat'
//     item.append(cardDeleteButton)
// })

// ###################### Добавление карточки ################ //
const placeName = document.querySelector('.popup__item_type_place')
const urlAdress = document.querySelector('.popup__item_type_url')
const cardPlaceButton = document.querySelector('.popup__button_type_place')

cardPlaceButton.addEventListener('click', savePlaceContent)

function savePlaceContent(evt) {
    evt.preventDefault()
    const placeNameValue = placeName.value
    const placeUrlValue = urlAdress.value
    addCard(placeNameValue, placeUrlValue)
    const popupProfileTemp = evt.target.parentElement.parentElement.parentElement.parentElement
    closePopup(popupProfileTemp)
}


// ############### редактирование профиля ########################   //
const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__item_type_name')
const jobInput = document.querySelector('.popup__item_type_profession')
const nameInProfile = document.querySelector('.profile__name')


function handleFormSubmit(evt) {
    evt.preventDefault()
    nameInProfile.querySelector('.profile__name').textContent = nameInput.value
}

