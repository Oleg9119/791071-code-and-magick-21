'use strict';

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  COLOR: `#ffffff`,
  SHADOW_COLOR: `rgba(0, 0, 0, 0.7)`,
  GAP: 10
};

const CONTENT_GAP = 25;
const TEXT_GAP = 5;

const Font = {
  HEIGHT: 16,
  COLOR: `#000000`,
  FONT_FAMILY: 'PT Mono'
};

const TEXT_X = Cloud.X + CONTENT_GAP;
const TITLE_Y = Cloud.Y + CONTENT_GAP;
const SUBTITLE_Y = Cloud.Y + CONTENT_GAP + Font.HEIGHT + TEXT_GAP;

const Bar = {
  WIDTH: 40,
  GAP: 50,
  MAX_HEIGHT: 150,
  Y: Cloud.Y + Cloud.HEIGHT - (CONTENT_GAP + Font.HEIGHT + TEXT_GAP),
  MY_BAR_COLOR: `rgba(255, 0, 0, 1)`
};

const NAME_Y = Cloud.Y + Cloud.HEIGHT - CONTENT_GAP;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

const renderText = (ctx, x, y, text) => {
  ctx.fillStyle = Font.COLOR;
  ctx.font = `${Font.HEIGHT}px ${Font.FONT_FAMILY}`;
  ctx.fillText(text, x, y);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

const getRandomValue = (min, max) => {
  return min + Math.random() * (max - min);
};

const getRandomBlueSaturation = () => {
  const randomSaturation = getRandomValue(0, 100);
  return `hsl(230, ${randomSaturation}%, 60%)`;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(ctx, Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Cloud.SHADOW_COLOR);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.COLOR);

  renderText(ctx, TEXT_X, TITLE_Y, `Ура вы победили!`);
  renderText(ctx, TEXT_X, SUBTITLE_Y, `Список результатов:`);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    const barCount = i + 1;
    const leftIndent = Cloud.X + Bar.WIDTH * i + Bar.GAP * barCount;
    const barHeight = -(Bar.MAX_HEIGHT * times[i]) / maxTime;

    if (names[i] === `Вы`) {
      ctx.fillStyle = Bar.MY_BAR_COLOR;
    } else {
      ctx.fillStyle = getRandomBlueSaturation();
    }

    ctx.fillRect(
      leftIndent,
      Bar.Y,
      Bar.WIDTH,
      barHeight
    );

    ctx.fillStyle = Font.COLOR;
    renderText(ctx, leftIndent, Bar.Y + barHeight - TEXT_GAP, Math.round(times[i]));
    renderText(ctx, leftIndent, NAME_Y, names[i]);
  }
};
