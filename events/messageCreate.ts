import { Message, TextChannel } from 'discord.js';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: Message) {
    if (message.channel.type !== 'DM') return;
    if (message.type === 'REPLY' && message.author.username === '質問箱bot') return;

    // 1. Get CHANNEL_ID and message in correct format
    let channelId: string;
    let reply: string;

    const words = message.content.split(' ');
    if (words.length < 3) {
      message.reply('Format: send [CHANNEL_ID] message...')
      return;
    }
    if (words[0] !== 'send') {
      message.reply('Format: send [CHANNEL_ID] message...')
      return;
    }

    channelId = words[1];
    reply = words.slice(2, words.length).join(' ');
    if (reply.length > 140) {
      message.reply('Message must be less than 140 words');
      return;
    }

    // 2. Send text to channel
    const channel = message.client.channels.cache.get(channelId);
    if (channel && channel.type === 'GUILD_TEXT') {
      (channel as TextChannel).send(reply)
        .then(() => message.react('👍'))
        .catch((err) => message.reply(`Error sending message: ${err}`));
    } else {
      message.reply(`Could not find channel with CHANNEL_ID: ${channelId}`);
    }
  }
}
