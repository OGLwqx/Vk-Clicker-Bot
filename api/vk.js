const { VK } = require('vk-io');
require('dotenv').config()

const vk = new VK({
	token: process.env.VK_TOKEN
});

module.exports = vk