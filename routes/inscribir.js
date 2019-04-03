var express = require('express');
var router = express.Router();
var fs = require('fs');
var listaInscritos = [];

const listar = () => {
    try {
        listaInscritos = JSON.parse(fs.readFileSync('./data/inscripcion.json'));
    } catch (error) {
        listaInscritos = [];
    }
}

const listarCursos = () => {
    try {
        listaCursos = JSON.parse(fs.readFileSync('./data/cursos.json'));
        listaCursos = listaCursos.filter(curso => curso.estado == 'disponible');
    } catch (error) {
        listaCursos = [];
    }
    return listaCursos;
}

const guardar = () => {
    let cursos = JSON.stringify(listaInscritos);
    fs.writeFile('./data/inscripcion.json', cursos, (err) => {
        console.log(err);
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    listar();
    res.render('inscribir', { title: 'Inscribir curso', inscribir_curso: true, cursos: listarCursos()});
});

router.post('/', function(req, res, next) {
    listar();
    var curso = JSON.parse(req.body.curso);
    var inscripcion = listaInscritos.find(cursoSel => cursoSel.id == curso.id);
    var index = -1;
    let duplicado = null;
    if(inscripcion) {
        index = listaInscritos.indexOf(inscripcion);
        duplicado = inscripcion.estudiantes.find(inscrito => inscrito.documento == req.body.documento);
    } else {
        inscripcion = curso;
        inscripcion.estudiantes = [];
    }
    if(duplicado) {
        res.render('inscribir', { title: 'Inscribir curso', error_inscribir: true, msgError:'Ya está registrado en este curso'});
    } else {
        delete req.body.curso;
        inscripcion.estudiantes.push(req.body);
        if(index >= 0) {
            listaInscritos[index] = inscripcion;
        } else {
            listaInscritos.push(inscripcion);
        }
        guardar();
        res.render('inscribir', { title: 'Inscribir curso', guardar_inscribir: true, nombre:req.body.nombre, curso:curso.nombre});
    }
});

module.exports = router;
