/*import { initialCards } from './cards.js';
import { openModal, closeModal, closeModalOverlay } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js'

const plasesList = document.querySelector(".places__list");

const btnProfile = document.querySelector('.profile__edit-button');
const nameTitle = document.querySelector('.profile__title');
const descriptionTitle = document.querySelector('.profile__description');

const profileForm =  document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

const editProfile = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


const btnAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup_type_new-card');
const newCardName = document.querySelector('.popup__input_type_card-name');
const newCardLink = document.querySelector('.popup__input_type_url');
 
const popupPicture = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image');
 


initialCards.forEach(function (card) {
  const newCard = createCard(card, deleteCard, likeCard, openImgPopup);
  plasesList.append(newCard);
});


 
function openImgPopup(evt) {
  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  popupCaption.textContent = popupImage.alt;
  openModal(popupPicture);
};

 
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionTitle.textContent = jobInput.value;
  closeModal(editProfile)
};
 
btnProfile.addEventListener('click', function() {
    nameInput.value = nameTitle.textContent,
    jobInput.value = descriptionTitle.textContent,
    openModal(editProfile)
    });

    
 
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  }
  plasesList.prepend(createCard(card, deleteCard, likeCard, openImgPopup));
  formNewCard.reset();
  closeModal(formAddCard);
};

btnAddCard.addEventListener('click', () => openModal(formAddCard));
profileForm.addEventListener('submit', handleFormSubmit);


 
document.addEventListener('click', closeModalOverlay);
document.querySelectorAll('.popup__close').forEach(function (button){
    const btnPopup = button.closest('.popup'); 
    button.addEventListener('click', () => closeModal(btnPopup));
   }); 
*/
import { initialCards } from "./cards.js";
import { openModal, closeModal, closeModalOverlay } from "./modal.js";
import { createCard, deleteCard, likeCard } from "./card.js";

const plasesList = document.querySelector(".places__list");

const btnProfile = document.querySelector(".profile__edit-button");
const nameTitle = document.querySelector(".profile__title");
const descriptionTitle = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];

const editProfile = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const btnAddCard = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup_type_new-card");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const popupPicture = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__image");

initialCards.forEach(function (card) {
  const newCard = createCard(card, deleteCard, likeCard, openImgPopup);
  plasesList.append(newCard);
});

function openImgPopup(evt) {
  openModal(popupPicture);
  popupImage.src = evt.currentTarget.src;
  popupImage.alt = evt.currentTarget.alt;
  popupCaption.textContent = evt.currentTarget.alt;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionTitle.textContent = jobInput.value;
  closeModal(editProfile);
}

btnProfile.addEventListener("click", function () {
  (nameInput.value = nameTitle.textContent),
    (jobInput.value = descriptionTitle.textContent),
    openModal(editProfile);
});

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value,
  };
  plasesList.prepend(createCard(newCard, deleteCard, likeCard, openImgPopup));
  formNewCard.reset();
  closeModal(formAddCard);
}

btnAddCard.addEventListener("click", () => openModal(formAddCard));
profileForm.addEventListener("submit", handleFormSubmit);

document.addEventListener("click", closeModalOverlay);
document.querySelectorAll(".popup__close").forEach(function (button) {
  const btnPopup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(btnPopup));
});
document.querySelectorAll(".popup").forEach(function () {
  plasesList.add("popup_is-animated");
});
formNewCard.addEventListener("submit", handleFormSubmitNewCard);
