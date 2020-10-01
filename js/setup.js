'use strict';

const WIZARDS_QUANTITY = 4;
const WizardsData = {
  FIRST_NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  LAST_NAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`]
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

showSetupWindow();
const randomWizards = getRandomWizardsList();
createWizards(randomWizards);
showSetupSimilar();
