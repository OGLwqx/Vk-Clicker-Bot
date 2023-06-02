const vk = require("./api/vk");

const user = require("./database/functions/user");
const { numberWithSpaces } = require("./assets/utils");

const { menu, profile } = require("./assets/keyboards/main");

vk.updates.on("message", async (context) => {
  try {
    const payload = context?.messagePayload?.command;
    const text = context?.text?.toLowerCase();
    const sender = context.senderId;

    if (sender < 0) return;

    const account = await user.get(sender);

    if (account.length === 0) user.create(sender); // checking and registration

    if (payload === "start" || text === "начать") {
      vk.api.messages.send({
        user_id: sender,
        message: `Главное меню`,
        random_id: Date.now(),
        keyboard: menu,
      });
    }

    if (payload === "click") {
      const res = await user.applyClick(sender);

      vk.api.messages.send({
        user_id: sender,
        message: `Вы сделали клик\n\nБаланс: ${numberWithSpaces(res.balance)}`,
        random_id: Date.now(),
        keyboard: menu,
      });
    }

    if (payload === "profile") {
      const res = await user.get(sender);

      vk.api.messages.send({
        user_id: sender,
        message: `Профиль:\n\nID: ${res.id}\nVK ID: ${res.vk_id}\nУровень: ${
          res.level
        }\nБаланс: ${numberWithSpaces(res.balance)}`,
        random_id: Date.now(),
        keyboard: profile(100 * res.level),
      });
    }

    if (payload === "levelup") {
      const res = await user.get(sender);
      const cost = 100 * res.level;

      if (res.balance < cost)
        return vk.api.messages.send({
          user_id: sender,
          message: `Недостаточно средств. Необходимо: ${numberWithSpaces(
            cost
          )}\n\nНе хватает: ${numberWithSpaces(cost - res.balance)}`,
          random_id: Date.now(),
        });

      const update = await user.upgradeLevel(sender);

      vk.api.messages.send({
        user_id: sender,
        message: `Улучшение куплено. Текущий уровень: ${update.level}\n\nБаланс: ${numberWithSpaces(res.balance - cost)}`,
        random_id: Date.now(),
        keyboard: profile(100 * (Number(res.level)+1)),
      });
    }
  } catch (error) {
    console.log(`Error` + error);
  }
});

vk.updates
  .start()
  .then(() => console.log("Polling started"))
  .catch(console.error);
