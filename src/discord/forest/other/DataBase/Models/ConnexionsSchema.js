const mongoose = require('mongoose');

const connexionsSchema = new mongoose.Schema({
    Ip: { type: String, required: true},
    Username: { type: String, required:true },
    User_Id: { type: String, required:true },
    User_created: { type: String, required:true },
    Avatar_Url: { type: String, required:true },
    Status: { type: String, required:true },
    Play: { type: String, required:true },
    Plateform: { type: String, required:true },
    Prefix: { type: String, required:true },
    Color_Embed: { type: String, required:true },
    Premium: { type: String, required:true },
    Key: { type: String, required:true },
    Date: { type: String, required:true },
});

module.exports = mongoose.model('connexions', connexionsSchema);