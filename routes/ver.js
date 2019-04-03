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
};

const guardar = () => {
    let cursos = JSON.stringify(listaCursos);
    fs.writeFile('./data/cursos.json', cursos, (err) => {
        console.log(err);
    });
};

router.get('/', function(req, res, next) {
    console.log(req.session);
    listar();
    var cursosDisponibles = listaCursos.filter(curso => curso.estado == 'disponible');
    res.render('ver', { title: 'Ver cursos', guardar_curso: true, cursos: listaCursos, cursosDisponibles: cursosDisponibles });
});

router.post('/', function(req, res, next) {
    listar();
    var cursoSel = listaCursos.find(curso => curso.id == req.body.idCurso);
    var estadoCurso = false;
    if(cursoSel) {
        var index = listaCursos.indexOf(cursoSel);
        var estado = cursoSel.estado == 'disponible'?'cerrado':'disponible';
        cursoSel.estado = estado;
        listaCursos[index] = cursoSel;
        guardar();
        estadoCurso = true;
    }
    var cursosDisponibles = listaCursos.filter(curso => curso.estado == 'disponible');
    res.render('ver', { title: 'Ver cursos', actualizar_curso: estadoCurso, cursos: listaCursos, cursosDisponibles: cursosDisponibles });
});

module.exports = router;
