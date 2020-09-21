'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = '#ffffff';
const CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

const GAP = 10;

const TITLE_X = CLOUD_X + GAP * 2;
const TITLE_Y = CLOUD_Y + GAP * 3;
const SUBTITLE_Y = CLOUD_Y + GAP * 5;

const TEXT_HEIGHT = 16;

const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_MAX_HEIGHT = 150;
const BAR_Y = SUBTITLE_Y + GAP * 2 + TEXT_HEIGHT + BAR_MAX_HEIGHT;
const BAR_HEIGHT = CLOUD_HEIGHT - SUBTITLE_Y - GAP * 3 - TEXT_HEIGHT * 2;

const MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';

const NAME_Y = 270;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

const getRandomValue = function (min, max) {
  return min + Math.random() * (max - min);
};

const getRandomBlueSaturation = function () {
  const randomSaturation = getRandomValue(0, 100);
  return 'hsl(230, ' + randomSaturation + '%, 60%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = '#000000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, SUBTITLE_Y);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {

    if (names[i] === 'Вы') {
      ctx.fillStyle = MY_BAR_COLOR;
    } else {
      ctx.fillStyle = getRandomBlueSaturation();
    }

    ctx.fillRect(
      CLOUD_X + BAR_WIDTH * [i + 1] + BAR_GAP * i,
      BAR_Y,
      BAR_WIDTH,
      -(BAR_HEIGHT * times[i]) / maxTime
    );

    ctx.fillStyle = '#000000';

    ctx.fillText(
      names[i],
      CLOUD_X + BAR_WIDTH * [i + 1] + BAR_GAP * i,
      NAME_Y
    );
  }

  for (let j = 0; j < times.length; j++) {
    ctx.fillText(
      Math.round(times[j]),
      CLOUD_X + BAR_WIDTH * [j + 1] + BAR_GAP * j,
      BAR_Y - (BAR_HEIGHT * times[j]) / maxTime - GAP
    );
  }
};
