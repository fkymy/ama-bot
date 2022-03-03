import { Message, TextChannel } from 'discord.js';
import url from 'url';

import { USERNAME, OG_IMAGE_BASE_URL } from '../constants';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: Message) {
    if (message.channel.type !== 'DM') return;
    if (message.type === 'REPLY' && message.author.username === USERNAME) return;

    // console.log(`[SEND] author: '${message.author.username}', content: '${message.content}'`);
    // 1. Get CHANNEL_ID and message in correct format
    let channelId: string;
    let text: string;

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
    text = words.slice(2, words.length).join(' ');
    if (text.length > 140) {
      message.reply('Message must be less than 140 words');
      return;
    }

    // 2. Generate og-image url
    const url = new URL(OG_IMAGE_BASE_URL);
    url.pathname = `${encodeURIComponent(text)}.png`;
    url.searchParams.append('theme', 'light');
    url.searchParams.append('md', '1');
    url.searchParams.append('fontSize', '100px');

    // 3. Send text to channel
    const channel = message.client.channels.cache.get(channelId);
    if (channel && channel.type === 'GUILD_TEXT') {
      (channel as TextChannel).send(url.href)
        .then(() => message.react('👍'))
        .catch((err) => message.reply(`Error sending message: ${err}`));
    } else {
      message.reply(`Could not find channel with CHANNEL_ID: ${channelId}`);
    }
  }
}