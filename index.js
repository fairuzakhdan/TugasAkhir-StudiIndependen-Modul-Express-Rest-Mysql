const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const coffeeRouter = require('./routes/coffee')

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use('/register', registerRouter)
app.use('/auth', loginRouter)
app.use('/coffee', coffeeRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server Berjalan di http://localhost:${port}`);
});
