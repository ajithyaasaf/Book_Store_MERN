const mongoose = require("mongoose");
const { mongoDBconfig } = require('./config');
const Users = require('./m2'); // Importing the model

mongoose.connect(mongoDBconfig)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Creating and saving the user document
        const user = await Users.create({ name: "bala", age: 22 });
        console.log("User saved:", user);
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));
