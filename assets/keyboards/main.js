const { Keyboard } = require("vk-io");
const { numberWithSpaces } = require('../utils')

const menu = Keyboard.builder()
  .textButton({
    label: "Клик",
    payload: { command: "click" },
  })
  .row()
  .textButton({
    label: "Профиль",
    payload: { command: "profile" },
  });

const profile = (value) =>
  Keyboard.builder()
    .textButton({
      label: `Купить улучшение • ${numberWithSpaces(value)}`,
      payload: { command: "levelup" },
    })
    .inline();

module.exports = {
  menu,
  profile,
};
