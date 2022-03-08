import { Message, TextChannel } from 'discord.js';
import { loadDefaultJapaneseParser } from 'budoux';

import { USERNAME, OG_IMAGE_BASE_URL } from '../constants';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: Message) {
    if (message.channel.type !== 'DM') return;
    if (message.type === 'REPLY' && message.author.username === USERNAME) return;

    // 1. Get CHANNEL_ID and message to be sent in correct format
    let channelId: string = '';
    let text: string = '';

    const words = message.content.split(/\s+/);
    if (words.length < 3) {
      message.reply('Format: send [CHANNEL_ID | LINK_TO_CHANNEL] メッセージ')
      return;
    }

    const [command, arg] = words;
    if (command !== 'send') {
      message.reply('Format: send [CHANNEL_ID | LINK_TO_CHANNEL] メッセージ')
      return;
    }

    const split = arg.split('/').pop();
    if (split) {
      channelId = split;
    }

    text = words.slice(2, words.length).join(' ');
    if (text.length > 140) {
      message.reply('Message must be less than 140 letters');
      return;
    }

    // Display HTML tags as plain text
    text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Natural line breaks for Japanese
    const parser = loadDefaultJapaneseParser();
    const textWithLineBreak = parser.translateHTMLString(text);

    // 2. Generate og-image url
    const url = new URL(OG_IMAGE_BASE_URL);
    url.pathname = `${encodeURIComponent(text)}.png`;
    url.searchParams.append('theme', 'light');
    url.searchParams.append('md', '1');
    url.searchParams.append(
      'fontSize',
      text.length < 50 ? '100px' :
      text.length < 100 ? '75px' : '60px'
    );

    // 3. Send text to channel
    const channel = message.client.channels.cache.get(channelId);
    if (channel && channel.type === 'GUILD_TEXT') {
      (channel as TextChannel).send(url.href)
        .then(() => message.react('👍'))
        .catch((err) => message.reply(`Error sending message: '${err}'`));
    } else {
      message.reply(`Could not find channel with CHANNEL_ID: '${channelId}'`);
    }
  }
}
