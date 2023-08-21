import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'payup',
    description: 'Pay up a certain amount',
    options: [
      {
        name: 'amount',
        type: 4,
        description: 'Amount to pay up',
        required: true,
      },
      {
        name: 'description',
        type: 3,
        description: 'Description of the payment',
        required: true,
      },
    ],
  },
  {
    name: 'total',
    description: 'Get the total amount owed to the user',
  },
  {
    name: 'paid',
    description: 'Sets the amounts owed to the user as paid',
  },
];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.APP_ID), {
    body: commands,
  });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
