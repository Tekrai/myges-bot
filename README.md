# MyGES BOT

**MyGES BOT** allows students to get the agenda of the week for GES schools through discord.
___Warning___, the code's dirty, but fonctionnal. Feel free to make it your own.

### Commands

The bot allows you to execute these commands. Feel free to add others.

| Command | Action |
| ------ | ------ |
| !agenda | show agenda |



### Getting Started

In order for the bot be functionnal you'll need to execute the following command after dowloading the project. Prior to this, you'll have to create a bot with your discord account. [See documentation](https://discord.com/developers/docs)

Install packages and depedencies.

```sh
$ npm install
```

Edit following lines in index.js with your credentials
```js
line 31 - myges.accessToken('myGES:login', 'myGES:password')
line 63 - client.login(discord:token)
```

To execute the script.

```sh
$ node index.js
```

Now the bot's working. Enjoy :D

License
----
MIT
