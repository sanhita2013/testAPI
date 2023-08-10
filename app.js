require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const product_route = require("./routes/products");
const connectDB = require("./db/connect");

app.get('/', (req, res) => {
    res.send('Hi, i am live');
})
//middleware  or set router

app.use('/api/products', product_route)
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am online`)
        })
    } catch (error) {
        console.log(error);

    }

}
start()