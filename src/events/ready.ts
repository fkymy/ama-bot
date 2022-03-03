import { Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setActivity('active');
    const link = client.generateInvite({
      scopes: ['bot'],
      permissions: [],
    });
    console.log(`Generated bot invite link: ${link}`);
  }
};
