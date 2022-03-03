import { Message, TextChannel } from 'discord.js';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: Message) {
    if (message.channel.type !== 'DM') return;

    // 1. get first word as channelID
    const delim = message.content.indexOf(' ');
    console.log('index', delim);
    const channelId = message.content.substring(0, delim);
    const reply = message.content.substring(delim + 1, message.content.length);
    console.log(`channelId: '${channelId}'`);
    console.log(`reply: '${reply}'`);

    // 2. send text to channel
    console.log(message);
    console.log(message.client);
    console.log(message.client.user);

    const channel = message.client.channels.cache.get(channelId);
    if (channel && channel.type === 'GUILD_TEXT') {
      (channel as TextChannel).send(reply);
      message.react('👍');
    }
    // message.reply({ content: reply });
  }
}
