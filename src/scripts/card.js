export function createCard(card, deleteCard, likeCard, openImgPopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardElement
  .querySelector(".card__delete-button")
  .addEventListener("click", deleteCard);
  cardElement
  .querySelector(".card__like-button")
  .addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImgPopup);

  return cardElement;
}

export function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export function deleteCard(event) {
  const deleteButton = event.target;
  const cardElement = deleteButton.closest(".card");
  if (cardElement) {
    cardElement.remove();
  }
}
