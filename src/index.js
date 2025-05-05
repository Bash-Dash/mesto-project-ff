import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal.js";
import { createCard, likeCard, removeCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUserData,
  getInitialCards,
  changeProfile,
  postNewCard,
  changeImage,
  checkPhoto,
} from "./scripts/api.js";

const placesList = document.querySelector(".places__list");

const btnProfile = document.querySelector(".profile__edit-button");
const nameTitle = document.querySelector(".profile__title");
const descriptionTitle = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];
const formNewCard = document.forms["new-place"];

const editProfile = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_description");

const btnAddCard = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup_type_new-card");
const newCardName = document.querySelector(".popup__input_type_card-name");
const newCardLink = document.querySelector(".popup__input_type_url");

const popupPicture = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_new_avatar");
const profileImg = document.querySelector(".profile__image");
const newAvatarImg = document.forms["new-avatar"];
const newAvatar = document.querySelector(".popup__input_type_avatar");

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const activatePage = [getUserData(), getInitialCards()];
Promise.all(activatePage)
  .then(([userData, initialCards]) => {
    profileImg.style.backgroundImage = `url(${userData.avatar})`;
    nameTitle.textContent = userData.name;
    descriptionTitle.textContent = userData.about;
    const userId = userData._id;
    initialCards.forEach(function (item) {
      const newCard = createCard(
        item,
        likeCard,
        removeCard,
        userId,
        openImgPopup
      );
      placesList.append(newCard);
    });
  })
  .catch((error) => {
    console.log("Ошибка", error);
  });

function openImgPopup(cardImage) {
  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;
  openModal(popupPicture);
}

profileImg.addEventListener("click", () => {
  clearValidation(profileForm, configValidation);
  openModal(avatarPopup);
});

btnProfile.addEventListener("click", () => {
  clearValidation(profileForm, configValidation);
  nameInput.value = nameTitle.textContent;
  aboutInput.value = descriptionTitle.textContent;
  openModal(editProfile);
});

btnAddCard.addEventListener("click", () => {
  clearValidation(formNewCard, configValidation);
  openModal(formAddCard);
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  descriptionTitle.textContent = aboutInput.value;
  const buttonElement = profileForm.querySelector(".popup__button");
  buttonElement.textContent = "Сохранение...";
  buttonElement.disabled = true;

  changeProfile(nameInput.value, aboutInput.value)
    .then((data) => {
      nameTitle.textContent = data.name;
      descriptionTitle.textContent = data.about;
      closeModal(editProfile);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
      buttonElement.disabled = false;
    })
    .catch((error) => {
      console.log("Ошибка", error);
    });
});

newAvatarImg.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const buttonElement = newAvatarImg.querySelector(".popup__button");
  buttonElement.textContent = "Сохранение...";
  buttonElement.disabled = true;
  checkPhoto(newAvatar).catch((error) => {
    console.log("Ошибка", error);
  });
  changeImage(newAvatar)
    .then((data) => {
      profileImg.style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarPopup);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
      buttonElement.disabled = false;
    })
    .catch((error) => {
      console.log("Ошибка:", error);
    });
});

formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const buttonElement = formNewCard.querySelector(".popup__button");
  const item = {
    name: newCardName.value,
    link: newCardLink.value,
  };
  buttonElement.textContent = "Сохранение...";
  buttonElement.disabled = true;

  postNewCard(item.name, item.link)
    .then((data) => {
      const newCard = createCard(
        data,
        likeCard,
        removeCard,
        data.owner._id,
        openImgPopup
      );
      placesList.prepend(newCard);
      formNewCard.reset();
      closeModal(formAddCard);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
      buttonElement.disabled = false;
    })
    .catch((error) => {
      console.log("Ошибка", error);
    });
});

document.querySelectorAll(".popup__close").forEach(function (button) {
  const btnPopup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(btnPopup));
});

document.querySelectorAll(".popup").forEach(function (element) {
  element.classList.add("popup_is-animated");
});

enableValidation(configValidation);
