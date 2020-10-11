'use strict';

const WIZARDS_QUANTITY = 4;
const WizardsData = {
  FIRST_NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  LAST_NAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
  FIREBALL_COLORS: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
};
const SetupWizardData = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 25
};

const getRandomProperty = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomName = () => {
  const fullName = `${getRandomProperty(WizardsData.FIRST_NAMES)} ${getRandomProperty(WizardsData.LAST_NAMES)}`;
  return fullName;
};

const getRandomWizard = () => {
  const wizard = {
    name: getRandomName(),
    coatColor: getRandomProperty(WizardsData.COAT_COLORS),
    eyesColor: getRandomProperty(WizardsData.EYES_COLORS)
  };
  return wizard;
};

const getRandomWizardsList = () => {
  const randomWizards = [];
  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    randomWizards.push(getRandomWizard());
  }
  return randomWizards;
};

const createWizards = (randomWizardsList) => {
  const wizardsList = document.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const wizardFragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    const clonedWizard = wizardTemplate.cloneNode(true);
    const clonedWIzardName = clonedWizard.querySelector(`.setup-similar-label`);
    const clonedWIzardCoat = clonedWizard.querySelector(`.wizard-coat`);
    const clonedWIzardEyes = clonedWizard.querySelector(`.wizard-eyes`);

    clonedWIzardName.textContent = randomWizardsList[i].name;
    clonedWIzardCoat.style.fill = randomWizardsList[i].coatColor;
    clonedWIzardEyes.style.fill = randomWizardsList[i].eyesColor;
    wizardFragment.appendChild(clonedWizard);
  }
  wizardsList.appendChild(wizardFragment);
};

const showSetupSimilar = () => {
  const setupSimilar = document.querySelector(`.setup-similar`);
  setupSimilar.classList.remove(`hidden`);
};

const setupWindow = document.querySelector(`.setup`);
const setupOpenButton = document.querySelector(`.setup-open`);
const setupOpenImage = setupOpenButton.querySelector(`.setup-open-icon`);
const setupCloseButton = setupWindow.querySelector(`.setup-close`);
const setupInputName = setupWindow.querySelector(`.setup-user-name`);

const onSetupWindowPressEsc = (evt) => {
  if (evt.key === `Escape` && !evt.target.matches(`input[type='text']`)) {
    evt.preventDefault();
    closeSetupWindow();
  }
};

const openSetupWindow = () => {
  setupWindow.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onSetupWindowPressEsc);
};

const closeSetupWindow = () => {
  setupWindow.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onSetupWindowPressEsc);
};

setupOpenButton.addEventListener(`click`, () => {
  openSetupWindow();
});

setupOpenImage.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openSetupWindow();
  }
});

setupCloseButton.addEventListener(`click`, () => {
  closeSetupWindow();
});

setupCloseButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closeSetupWindow();
  }
});

const setupWizard = setupWindow.querySelector(`.setup-wizard`);
const setupWizardCoat = setupWizard.querySelector(`.wizard-coat`);
const setupWizardEyes = setupWizard.querySelector(`.wizard-eyes`);
const setupWizardFireball = setupWindow.querySelector(`.setup-fireball-wrap`);
const setupWizardCoatColor = setupWindow.querySelector(`input[name='coat-color']`);
const setupWizardEyesColor = setupWindow.querySelector(`input[name='eyes-color']`);
const setupWizardFireballColor = setupWindow.querySelector(`input[name='fireball-color']`);

setupWizardCoat.addEventListener(`click`, () => {
  const coatColor = getRandomProperty(WizardsData.COAT_COLORS);
  setupWizardCoat.style.fill = coatColor;
  setupWizardCoatColor.value = coatColor;
});

setupWizardEyes.addEventListener(`click`, () => {
  const eyesColor = getRandomProperty(WizardsData.EYES_COLORS);
  setupWizardEyes.style.fill = eyesColor;
  setupWizardEyesColor.value = eyesColor;
});

setupWizardFireball.addEventListener(`click`, () => {
  const fireballColor = getRandomProperty(WizardsData.FIREBALL_COLORS);
  setupWizardFireball.style.background = fireballColor;
  setupWizardFireballColor.value = fireballColor;
});

setupInputName.addEventListener(`invalid`, () => {
  if (setupInputName.validity.valueMissing) {
    setupInputName.setCustomValidity(`Обязательное поле`);
  } else {
    setupInputName.setCustomValidity(``);
  }
});

setupInputName.addEventListener(`input`, () => {
  const valueLength = setupInputName.value.length;
  if (valueLength < SetupWizardData.NAME_MIN_LENGTH) {
    setupInputName.setCustomValidity(`Ещё ${SetupWizardData.NAME_MIN_LENGTH - valueLength} симв.`);
  } else if (valueLength > SetupWizardData.MAX_NAME_LENGTH) {
    setupInputName.setCustomValidity(`Удалите лишние ${valueLength - SetupWizardData.NAME_MAX_LENGTH} симв.`);
  } else {
    setupInputName.setCustomValidity(``);
  }
  setupInputName.reportValidity();
});

const randomWizards = getRandomWizardsList();
createWizards(randomWizards);
showSetupSimilar();
