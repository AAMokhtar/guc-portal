/*const app = require("../../app");
const HR = require("../mongoose/dao/hr");

app.get("/hr/addMissingSign", async function (req, res) {
  /* data has this format
    data :{
     hrID:000000
     staffID:0000
          date: {
        type: Date, // day
      },
      signIn: {
        type: Date,
      },
      signOut: {
        type: Date,
      },
    }
    */
  try {
    let data = req.body.data;
    const { hrID, staffID, date, signIn, signOut } = data;
    if ((await HR.find({ id: hrID })).lenght == 0) throw Error("invalid hrID");

    res.status(201).json({ data });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e });
  }
});
*/