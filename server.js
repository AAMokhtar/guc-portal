const app = require('./app.js');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://admin:admin@omegacentauri.vydfb.mongodb.net/portalData?retryWrites=true&w=majority").then(() =>{
    
app.listen(3000);
console.log("App is running...")

}).catch((err) => {
    console.log(err);
  });