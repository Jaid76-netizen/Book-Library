const express = require("express");
const dataBaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");
const cors = require("cors");

// database connection
dataBaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req,res) => {
//     res.send("Hello I am root! How are you?")
// });

app.use("/book" , authMiddleWare , bookRouter);
app.use("/user" , userRouter);

app.listen(8000, () => {
   console.log("port is listening 8000"); 
});