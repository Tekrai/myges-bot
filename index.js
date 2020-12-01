const myges = require('./myges/Client');
const moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client();


// Set the locale environment
moment.updateLocale('fr', {
  week: {
   dow: 1,
  },
});

/**
 * Starting point (first & last day of week)
 */
let from_date = moment().startOf('week');
let to_date = moment().endOf('week');
console.log(from_date.toString(), to_date.toString());


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message',  async (msg) => {
  if (msg.content === '!agenda') {

    let token = myges.accessToken('myges:login', 'myges:password').then(async(token) => {

      let agenda = await myges.getAgenda(Math.floor(Date.parse(from_date)), Math.floor(Date.parse(to_date)), token).then(agenda => {
        // if agenda has those errors
        agenda = agenda.replace('undefined:1', '');
        agenda = agenda.replace('undefined', '');

        agenda = JSON.parse(agenda).result
        console.log(agenda);

        let embed = new Discord.MessageEmbed()
    		.setColor("#ba1f60")
    		.setTitle(`Planning du ${moment(from_date).format('D/MM/YYYY')} au ${moment(to_date).format('D/MM/YYYY')}`)
    		.setFooter('© Swan Gonçalves, Dev FULL-STACK', client.user.avatarURL())
    		.setTimestamp();

    		agenda.forEach((item, i) => {
          embed.addFields({
           name: `${moment(item.start_date).format('ddd')} ${moment(item.start_date).format('HH:mm')} - ${moment(item.end_date).format('HH:mm')}`,
           value: `${item.name} \n Campus **${(item.rooms === null) ? 'Distanciel ou salle non-définie' : item.rooms }**`
        });

      });

        msg.channel.send(embed);

    });
  });
}
});


client.login('discord:token')
