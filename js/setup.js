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

const showSetupWindow = () => {
  const setupWindow = document.querySelector(`.setup`);
  setupWindow.classList.remove(`hidden`);
};

const getRandomProperty = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomName = () => {
  const fullName = `${getRandomProperty(WizardsData.FIRST_NAMES)} ${getRandomProperty(WizardsData.LAST_NAMES)}`;
  return fullName;
};

const getRandomWizard = () => {
  const Wizard = {
    name: getRandomName(),
    coatColor: getRandomProperty(WizardsData.COAT_COLORS),
    eyesColor: getRandomProperty(WizardsData.EYES_COLORS)
  };
  return Wizard;
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
    const clonedWizardData = {
      name: clonedWizard.querySelector(`.setup-similar-label`),
      coat: clonedWizard.querySelector(`.wizard-coat`),
      eyes: clonedWizard.querySelector(`.wizard-eyes`)
    };
    clonedWizardData.name.textContent = randomWizardsList[i].name;
    clonedWizardData.coat.style.fill = randomWizardsList[i].coatColor;
    clonedWizardData.eyes.style.fill = randomWizardsList[i].eyesColor;
    wizardFragment.appendChild(clonedWizard);
  }
  wizardsList.appendChild(wizardFragment);
};

const showSetupSimilar = () => {
  const setupSimilar = document.querySelector(`.setup-similar`);
  setupSimilar.classList.remove(`hidden`);
};

const Setup = {
  window: document.querySelector(`.setup`),
  openButton: document.querySelector(`.setup-open`),
  openImage: document.querySelector(`.setup-open-icon`),
  closeButton: document.querySelector(`.setup-close`),
  inputName: document.querySelector(`.setup-user-name`)
};

const onSetupWindowPressEsc = (evt) => {
  if (evt.key === `Escape` && !evt.target.matches(`input[type='text']`)) {
    evt.preventDefault();
    closeSetupWindow();
  }
};

const openSetupWindow = () => {
  Setup.window.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onSetupWindowPressEsc);
};

const closeSetupWindow = () => {
  Setup.window.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onSetupWindowPressEsc);
};

Setup.openButton.addEventListener(`click`, () => {
  openSetupWindow();
});

Setup.openImage.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openSetupWindow();
  }
});

Setup.closeButton.addEventListener(`click`, () => {
  closeSetupWindow();
});

Setup.closeButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closeSetupWindow();
  }
});

const SetupWiZard = {
  coat: Setup.window.querySelector(`.setup-wizard .wizard-coat`),
  eyes: Setup.window.querySelector(`.setup-wizard .wizard-eyes`),
  fireball: Setup.window.querySelector(`.setup-fireball-wrap`),
  coatColor: Setup.window.querySelector(`input[name='coat-color']`),
  eyesColor: Setup.window.querySelector(`input[name='eyes-color']`),
  fireballColor: Setup.window.querySelector(`input[name='fireball-color']`)
};

SetupWiZard.coat.addEventListener(`click`, () => {
  const coatColor = getRandomProperty(WizardsData.COAT_COLORS);
  SetupWiZard.coat.style.fill = coatColor;
  SetupWiZard.coatColor.value = coatColor;
});

SetupWiZard.eyes.addEventListener(`click`, () => {
  const eyesColor = getRandomProperty(WizardsData.EYES_COLORS);
  SetupWiZard.eyes.style.fill = eyesColor;
  SetupWiZard.eyesColor.value = eyesColor;
});

SetupWiZard.fireball.addEventListener(`click`, () => {
  const fireballColor = getRandomProperty(WizardsData.FIREBALL_COLORS);
  SetupWiZard.fireball.style.background = fireballColor;
  SetupWiZard.fireballColor.value = fireballColor;
});

Setup.inputName.addEventListener(`invalid`, () => {
  if (Setup.inputName.validity.valueMissing) {
    Setup.inputName.setCustomValidity(`Обязательное поле`);
  } else {
    Setup.inputName.setCustomValidity(``);
  }
});

Setup.inputName.addEventListener(`input`, () => {
  const valueLength = Setup.inputName.value.length;
  if (valueLength < SetupWizardData.NAME_MIN_LENGTH) {
    Setup.inputName.setCustomValidity(`Ещё ${SetupWizardData.NAME_MIN_LENGTH - valueLength} симв.`);
  } else if (valueLength > SetupWizardData.MAX_NAME_LENGTH) {
    Setup.inputName.setCustomValidity(`Удалите лишние ${valueLength - SetupWizardData.NAME_MAX_LENGTH} симв.`);
  } else {
    Setup.inputName.setCustomValidity(``);
  }
  Setup.inputName.reportValidity();
});


showSetupWindow();
const randomWizards = getRandomWizardsList();
createWizards(randomWizards);
showSetupSimilar();
