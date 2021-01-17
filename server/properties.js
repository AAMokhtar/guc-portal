const env = require("dotenv").config();

module.exports = {
    CONNECTION_STRING: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@omegacentauri.vydfb.mongodb.net/portalData?retryWrites=true&w=majority',
    PORT:  env.PORT || 4000,
    JWT_KEY: env.SECRET || 'akjhfdkadsjh32Efdsjkl78$^&alsdsfajh@#jkhsdfak%jhfdsa'
};