var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.nombre = 'Felix Marcelo Romaña';
    //console.log('you viewed this page ' + req.session.views['/'] + ' times');
  //console.log(req.session);
    res.render('index', { title: 'Inicio' });
});

module.exports = router;
