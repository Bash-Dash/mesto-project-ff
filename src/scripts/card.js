import { addLike, deleteLike, deleteCard } from "./api";

export function createCard(
  cardData,
  likeCard,
  removeCard,
  userId,
  openImgPopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikesCounter = cardElement.querySelector(".card__likes-counter");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikesCounter.textContent = cardData.likes.length;

  if (userId === cardData.owner._id) {
    cardDeleteButton.style.opacity = 1;
    cardDeleteButton.addEventListener("click", () =>
      removeCard(cardElement, cardData._id)
    );
  } else {
    cardDeleteButton.style.opacity = 0;
  }

  cardLikeButton.addEventListener("click", () =>
    likeCard(cardLikesCounter, cardLikeButton, cardElement, cardData, userId)
  );
  if (cardData.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => openImgPopup(cardImage));
  return cardElement;
}

export function likeCard(
  cardLikeCounter,
  cardLikeButton,
  cardElement,
  cardData,
  userId
) {
  const isLiked = cardData.likes.some(function (like) {
    return like._id === userId;
  });
  if (isLiked) {
    deleteLike(cardData._id)
      .then((card) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeCounter.textContent = card.likes.length;
        cardData.likes = card.likes;
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  } else {
    addLike(cardData._id)
      .then((card) => {
        cardLikeButton.classList.add("card__like-button_is-active");
        cardLikeCounter.textContent = card.likes.length;
        cardData.likes = card.likes;
      })
      .catch((error) => {
        console.log("Ошибка", error);
      });
  }
}

export function removeCard(card, cardId) {
  deleteCard(cardId)
    .then((data) => {
      if (data.message === "Пост удалён") {
        if (card) {
          card.remove();
        } else {
          console.log(`Элемент с ID ${cardId} не найден на странице`);
        }
      }
    })
    .catch((error) => {
      console.log("Ошибка", error);
    });
}
