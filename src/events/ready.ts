import { Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setActivity('DM me: send [CHANNEL_ID | LINK_TO_CHANNEL] メッセージ');
    const link = client.generateInvite({
      scopes: ['bot'],
      permissions: [],
    });
    console.log(`Generated bot invite link: ${link}`);
  }
};
