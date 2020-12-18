//------------------------------------------------DEPENDENCIES--------------------------------------

var express = require('express');
var router = express.Router();


//to encrypt and decrypt passwords
const bcrypt = require('bcryptjs');
//required to store information about current user
const jst = require('jsonwebtoken');

//-----------------------------------------------END OF DEPENDENCIES----------------------------



//-------------------------------------------------MODELS---------------------------------------------------------------------------------------



const Staff = require("../mongoose/dao/staff.js");



//-------------------------------------------------END OF MODELS--------------------------------------------------------------------------




//-------------------------------------------------VALIDATORS--------------------------------------------------------

//TODO: test
//function that validates string as one following the email format
function emailValidator(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//------------------------------------------------END VALIDATORS----------------------------------------




//------------------------------------ROUTES-------------------------------------------

//login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        //if user didn't enter email or password
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: "Please enter both email and passowrd" });
        }

        //if email entered is not valid
        if (!emailValidator(email)) {
            return res
                .status(400)
                .json({ msg: "Please enter a valid email address" });
        }

        //TODO: validate password

        //check if email exists in database
        const existingStaff = await Staff.findOne({ email: email });
        //if there is no such email in the staff table
        if (!existingStaff) {
            return res.status(400).json({ msg: "Email is not registered" });
        }

        //compare password entered with the hashed one stored in the staff model
        const passMatch = await bcrypt.compare(password, existingStaff.password);
        //if password does not match
        if (!passMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        //user passed all checks
        //should log in and receive a token

        //First find the role of the user

        //get the id of the staff
        const id = existingStaff.id;
        const role = existingStaff.role

        //fill the token payload with the staff id and role in uni
        const payload = { id: id, role: role };
        //create a token
        const token = jwt.sign(payload, jwtKey);
        //give the token to the user by adding it to the header of the response
        res.header({ "auth-token": token });

        //TODO: what to send to the user?
        return res.json({ msg: "Login Successful" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});


  //------------------------------------------END OF ROUTES-----------------------------------------------------

  module.exports = router;