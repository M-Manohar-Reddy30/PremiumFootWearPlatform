const bcrypt = require("bcryptjs");

bcrypt.hash("ManoharReddy@6020", 10)
  .then((hash) => {
    console.log("HASH:");
    console.log(hash);
  })
  .catch(console.error);