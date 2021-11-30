require('dotenv').config()

const express = require("express"),
session = require('session'),

app = express(),
port = process.env.PORT || 5000,

discord = require('discord.js'),

mongoose = require("mongoose"),

{ Intents } = require('discord.js');

client = new discord.Client({intents: [
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILDS
]}),

needle = require('needle')


/*
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/


require('../forest/main')(require("glob"), path = require('path'), client, needle)
//require('../forest/other/functions/slash')(client)
require('./motor')(app, express, session)


require("http").createServer(app).listen(port, () => {
  console.log(`🌵 - listening on port: ${port}`)
})