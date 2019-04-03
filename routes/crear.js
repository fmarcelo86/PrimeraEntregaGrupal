var express = require('express');
var router = express.Router();
var fs = require('fs');
var listaCursos = [];

const listar = () => {
    try {
        listaCursos = JSON.parse(fs.readFileSync('./data/cursos.json'));
    } catch (error) {
        listaCursos = [];
    }
}

const guardar = () => {
    let cursos = JSON.stringify(listaCursos);
    fs.writeFile('./data/cursos.json', cursos, (err) => {
        console.log(err);
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('crear', { title: 'Crear curso', crear_curso: true });
});

router.post('/', function(req, res, next) {
    listar();
    let duplicado = listaCursos.find(curso => curso.id == req.body.id);
    if(duplicado) {
        res.render('crear', { title: 'Crear curso', error_curso: true, msgError:'Ya existe un curso con este id'});
    } else {
        req.body.estado = 'disponible';
        listaCursos.push(req.body);
        console.log(listaCursos);
        guardar();
        res.render('crear', { title: 'Crear curso', guardar_curso: true, msg:req.body.nombre, cursos: listaCursos });
    }
});

module.exports = router;
