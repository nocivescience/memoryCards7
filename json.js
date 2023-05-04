const unObjeto = {
    nombre: 'Jon',
    apellido: 'MirCha',
    edad: 35,
    cursos: ['Node.js', 'React.js'],
    direccion: {
        calle: 'Las flores',
        numero: 25,
        ciudad: 'Bogotá',
        pais: 'Colombia'
    },
    casado: false,
};
const string = JSON.stringify(unObjeto);
const objeto = JSON.parse(string);
console.log(string);
console.log(objeto);