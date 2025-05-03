 
   function createCard(card, addLike, popupDelete, userId, openImgPopup) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikesCounter = cardElement.querySelector(".card__likes-counter");
    cardLikesCounter.textContent = card.likes ? card.likes.length : 0;
    const isLiked = card.likes.some((cardElement) => cardElement._id === userId);
  
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;

    if (isLiked) {
        cardLikeButton.classList.add("card__like-button_is-active");
    }

    cardLikeButton.addEventListener("click", () => {
        const likeStatus = cardLikeButton.classList.contains(
            "card__like-button_is-active"
        );

        addLike(card._id, likeStatus)
            .then((data) => {
                console.log(data);
                cardLikeButton.classList.toggle("card__like-button_is-active");
                cardLikesCounter.textContent = data.likes.length;
            })
            .catch((error) => {
                console.log("Ошибка", error);
            });
    });
    cardImage.addEventListener("click", () => {
        openImgPopup(card.link, card.name);
    });

   // cardDeleteButton.addEventListener("click", () => {
     //   popupDelete(card._id, cardElement)
    //})
    

     if (userId === card.owner._id) {
    
            cardDeleteButton.style.opacity = 1;
            cardDeleteButton.addEventListener("click", () => popupDelete(card._id, cardElement)
        );
          } else {
            cardDeleteButton.style.opacity = 0;
          
    }
   

    return cardElement;
};

 const cancelCard = (cardElement) => {
    cardElement.remove(); 
 };

 export {createCard, cancelCard};