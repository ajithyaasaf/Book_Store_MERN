const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())

const mongoose = require("mongoose");
const { PORT, mongoDBconfig } = require('./config');
const bookRouter = require('./routes/BookRoute')
app.use(express.json())
app.use('/books/',bookRouter)


mongoose.connect(mongoDBconfig).then(() => {
    app.listen(PORT, () => {
        console.log(`The port is connected to ${PORT}`);
    });
    console.log("The app connected successfully");
}).catch((err) => {
    console.error(err);
});







