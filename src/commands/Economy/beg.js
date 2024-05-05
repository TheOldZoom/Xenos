const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('beg')
        .setDescription('Beg for money'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;
        const amount = Math.floor(Math.random() * 91) + 10;
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return interaction.reply('There was an error reading the data.');
            }
            let userData = JSON.parse(data);
            if (!userData[userId]) {
                userData[userId] = {
                    bank: 0,
                    handheld: amount
                };
            } else {
                userData[userId].handheld += amount;
            }


            fs.writeFile('data.json', JSON.stringify(userData, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return interaction.reply('There was an error updating the data.');
                }
            });

            const embed = new EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: `You Begged And Received $${amount}`, iconURL: 'https://cdn.discordapp.com/attachments/1236106561944948806/1236428834090520606/8627-diamond.gif?ex=6637f995&is=6636a815&hm=38eebc5b7419504d9068c2540ad85bee421a7633ad8b0b788ee4667f20c36dfc&'})
            interaction.reply({ embeds: [embed]});
        });
    },
};
