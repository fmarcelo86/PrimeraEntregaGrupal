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

const eliminar = (data) => {
    var inscrito = listaInscritos.find(curso => curso.id == data.idCurso);
    if(inscrito) {
        var index = listaInscritos.indexOf(inscrito);
        var alumnos = inscrito.estudiantes.filter(estudiante => estudiante.documento != data.documento);
        inscrito.estudiantes = alumnos;
        listaInscritos[index] = inscrito;
    }
    console.log(alumnos);
}

const guardar = () => {
    let cursos = JSON.stringify(listaInscritos);
    fs.writeFile('./data/inscripcion.json', cursos, (err) => {
        console.log(err);
    });
}

router.get('/', function(req, res, next) {
    listar();
    res.render('verinscritos', { title: 'Ver cursos', inscritos: listaInscritos });
});

router.post('/', function(req, res, next) {
    listar();
    eliminar(req.body);
    guardar();
    res.render('verinscritos', { title: 'Ver cursos', eliminar_alumno: true, inscritos: listaInscritos });
});

module.exports = router;
