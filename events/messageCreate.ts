import { Message } from 'discord.js';

export default {
  name: 'messageCreate',
  once: false,
  execute(message: Message) {
    if (message.content === 'ping') {
      message.channel.send('pong');
    }
  }
}
