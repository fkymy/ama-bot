import fs from 'node:fs';
import { Client, Intents } from 'discord.js';
import config from './config';

const main = async () => {
  const intents = new Intents();
  intents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

  const client = new Client({ intents });

  const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.ts'));

  for (const file of eventFiles) {
    const { default: event } = await import(`./events/${file}`);
    if (event.once) {
      console.log('once!');
      client.once(event.name, async (...args) => event.execute(...args));
    } else {
      console.log('on!');
      client.on(event.name, async (...args) => event.execute(...args));
    }
  }

  client.login(config.token);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
