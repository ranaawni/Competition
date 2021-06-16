const mongoose = require("mongoose");

//connecting to mongoDB
mongoose.connect(
  "mongodb+srv://root:root@cluster0.flpzr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB.");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error : " + err);
});
