let express = require('express');
const { sequelize } = require('../database/db');
let router = express.Router();

sequelize.sync({ force: false }).then((result) => {
  console.log("Connected DB");
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
