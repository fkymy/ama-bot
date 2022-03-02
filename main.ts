import { Client, Intents, Message } from 'discord.js';
import config from './config';

const intents = new Intents();
intents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents });

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  client.user?.setActivity('active');
  const link = client.generateInvite({
    scopes: ['bot'],
    permissions: [],
  });
  console.log(`Generated bot invite link: ${link}`);
});

client.on('messageCreate', (msg: Message) => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.login(config.token);
