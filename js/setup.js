'use strict';

const showSetupWindow = () => {
  const setupWindow = document.querySelector(`.setup`);
  setupWindow.classList.remove(`hidden`);
};
showSetupWindow();

const WizardsData = {
  FIRST_NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  LAST_NAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`]
};
const WIZARDS_QUANTITY = 4;

const randomWizardsList = [];
const getRandomWizardsList = () => {
  const getRandomName = () => {
    const randName = WizardsData.FIRST_NAMES[Math.floor(Math.random() * WizardsData.FIRST_NAMES.length)];
    const randLastName = WizardsData.LAST_NAMES[Math.floor(Math.random() * WizardsData.LAST_NAMES.length)];
    const fullName = `${randName} ${randLastName}`;
    return fullName;
  };

  const getRandomCoatColor = () => {
    const randCoatColor = WizardsData.COAT_COLORS[Math.floor(Math.random() * WizardsData.COAT_COLORS.length)];
    return randCoatColor;
  };

  const getRandomEyesColor = () => {
    const randEyesColor = WizardsData.EYES_COLORS[Math.floor(Math.random() * WizardsData.EYES_COLORS.length)];
    return randEyesColor;
  };

  const getRandomWizard = () => {
    const wizard = {
      name: getRandomName(),
      coatColor: getRandomCoatColor(),
      eyesColor: getRandomEyesColor()
    };
    return wizard;
  };

  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    randomWizardsList.push(getRandomWizard());
  }
  return randomWizardsList;
};
getRandomWizardsList();

const createWizards = (randomWizards) => {
  const wizardsList = document.querySelector(`.setup-similar-list`);

  const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
  const wizardFragment = document.createDocumentFragment();

  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    const clonedWizard = wizardTemplate.cloneNode(true);
    wizardFragment.appendChild(clonedWizard);
    wizardsList.appendChild(wizardFragment);
  }
  wizardsList.appendChild(wizardFragment);

  const wizardsNames = wizardsList.querySelectorAll(`.setup-similar-label`);
  const wizardsCoats = wizardsList.querySelectorAll(`.wizard-coat`);
  const wizardsEyes = wizardsList.querySelectorAll(`.wizard-eyes`);

  for (let i = 0; i < WIZARDS_QUANTITY; i++) {
    wizardsNames[i].textContent = randomWizards[i].name;
    wizardsCoats[i].style.fill = randomWizards[i].coatColor;
    wizardsEyes[i].style.fill = randomWizards[i].eyesColor;
  }
};
createWizards(randomWizardsList);

const showSetupSimilar = () => {
  const setupSimilar = document.querySelector(`.setup-similar`);
  setupSimilar.classList.remove(`hidden`);
};
showSetupSimilar();
