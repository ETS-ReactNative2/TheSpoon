const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware.js');

const Customer=require('../models/customer.js');

//These are needed for checking the the nationality of a customer.
const {getNames} = require('country-list');
nationalities = getNames();


router.get('/', auth, isCustomer, async (req, res) => {
    console.log('In GET /api/user/customer');

    try {
        const customer = await Customer.findOne({
            where: {
                Email: req.body.email
            }
        });

        const customerInfo = {
            username: customer.Username,
            email: customer.Email
        };

        res.status(200).send(customerInfo);

    }catch (error) {
        res.status(500).send('Internal server error');
    }


});

router.put('/', auth, isCustomer, async (req,res) => {
    try {
        //check if the email is already taken (it must be unique)
        const customer = await Customer.findAll({
            where: {
                Email: req.body.email
            }
        });
        // Check if there is another customer with the email.
        if (customer.length > 0 && !(customer[0].dataValues.Email === req.body.email)) return res.status(400).send('Email already taken.');

        // Check if the gender is valid.
        if (!(genders.includes(req.body.gender))) return res.status(400).send('Invalid gender.');

        // Check if the ageRange is valid.
        if (!(ageRanges.includes(req.body.ageRange))) return res.status(400).send('Invalid ageRange.');

        // Check if the nationality is valid.
        let found = false;
        for(let i = 0; i < nationalities.length; i++) {
            if (nationalities[i] === req.body.nationality) {
                found = true;
                break;
            }
        }
        if (!found) return res.status(400).send('Invalid nationality.');

        //update the profile of the customer
        await Customer.update({
                Email: req.body.email,
                Gender: req.body.gender,
                AgeRange: req.body.ageRange,
                Nationality: req.body.nationality
            },
            {
                where: {
                    Username: req.username
                }
            });

        //get the updated owner data to send it back as a response
        const customerModified = await Customer.findAll({
            where: {
                Username: req.username
            }
        });

        res.status(200).send({
            email: customerModified[0].dataValues.Email,
            gender: customerModified[0].dataValues.Gender,
            ageRange: customerModified[0].dataValues.AgeRange,
            nationality: customerModified[0].dataValues.Nationality
            });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Delete profile of the owner
router.delete('/', auth, isCustomer, async (req, res) => {
    try {
        //because of the "on delete cascade", it will also destroy owner's restaurant, menus, menu items
        await Customer.destroy({
            where: {
                Username: req.username
            }
        });
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});



// Valid inputs for ageRange and Gender
ageRanges = [ "< 18" , "18-24" , "24-34" , "35-49" , "50-64" , "65+"];
genders = ['Male', 'Female', 'Other'];

module.exports = router;