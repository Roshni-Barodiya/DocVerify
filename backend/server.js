const express = require("express");
const cors = require("cors");
const upload = require("./routes/upload");
const verify = require("./routes/verify");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/upload", upload);
app.use("/verify", verify);

app.listen(5000, () => console.log("Backend running on 5000"));
