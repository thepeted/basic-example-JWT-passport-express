const _ = require("lodash");

module.exports = function(name) {
  const users = [
    {
      id: 1,
      name: "santa",
      password: "hohoho"
    },
    {
      id: 2,
      name: "kanye",
      password: "golddigger"
    }
  ];
  return users[_.findIndex(users, { name: name })];
};
