import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let totalAmount = {}; // Variable to store the total values for each user

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  
  if (interaction.commandName === 'payup') {
    const amount = interaction.options.getInteger('amount'); // Get the amount from the command
    const description = interaction.options.getString('description'); // Get the amount from the command
    const userId = interaction.user.id; // Get the user's id
    if (!totalAmount[userId]) { // If the user doesn't have a total amount yet, initialize it to 0
      totalAmount[userId] = 0;
    }

    totalAmount[userId] += amount; // Add the amount to the user's total
    await interaction.reply(`<@${userId}>: ${description} - ${amount}`);
  }

  if (interaction.commandName === 'total') {
    const userId = interaction.user.id; // Get the user's id
    if (!totalAmount[userId]) { // If the user doesn't have a total amount yet, initialize it to 0
        totalAmount[userId] = 0;
    }

    await interaction.reply(`<@${userId}> is owed a total of ${totalAmount[userId]}`);
  }

  if (interaction.commandName === 'paid') {
    const userId = interaction.user.id; // Get the user's id
    totalAmount[userId] = 0;

    await interaction.reply(`Amount owed to <@${userId}> has been paid up.`);
  }
});

client.login(process.env.DISCORD_TOKEN);