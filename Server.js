const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", (req, res) => {
  const { user, timestamp } = req.body;

  const data = {
    user,
    timestamp,
  };

  fs.writeFile("uploaded_data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Error saving data." });
    } else {
      // Simulate smart contract deployment
      exec("cardano-cli deploy-contract ./contract.plutus", (err, stdout) => {
        if (err) {
          res.status(500).send({ message: "Smart contract deployment failed." });
        } else {
          res.send({ message: "Data uploaded and contract deployed!" });
        }
      });
    }
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
