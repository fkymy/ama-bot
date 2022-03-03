import fs from 'node:fs';
import path from 'path';
import { Client, Intents } from 'discord.js';
import config from './config';

async function main() {
  const intents = new Intents();
  intents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  );

  const client = new Client({ intents: intents, partials: ['CHANNEL'] });

  const eventFiles = fs.readdirSync(path.resolve(__dirname, './events'));
  for (const file of eventFiles) {
    const { default: event } = await import(`./events/${file}`);
    if (event.once) {
      client.once(event.name, async (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, async (...args) => event.execute(...args, client));
    }
  }

  client.login(config.token);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
