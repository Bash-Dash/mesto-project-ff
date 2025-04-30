const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configValidation
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configValidation
    );
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

const enableSubmitButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, configValidation) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, configValidation);
  } else {
    enableSubmitButton(buttonElement, configValidation);
  }
};

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
};

const enableValidation = (configValidation) => {
  const formList = Array.from(
    document.querySelectorAll(configValidation.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};

function clearValidation(formElement, configValidation) {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configValidation.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configValidation);
  });
  toggleButtonState(inputList, buttonElement, configValidation);
}

export { enableValidation, clearValidation };
