const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database")
const adminRoutes = require("./routes/admin");

const app = express();;
app.use(bodyparser.json());
app.use(cors());

app.use(adminRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => { console.log(err) })




