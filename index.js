//Express se encarga de gestionar los crud a la base de datos
import express from 'express';
//Morgan se utiliza para ver por consola las peticiones que se realizan desde el navegador
import morgan from 'morgan';
//Cors pertime realizar peticiones remotas 
import cors from 'cors';

import path from 'path';

//Mongoose es el ODM para la base de datos
import mongoose from 'mongoose';

import router from './routes';
//Establecer cadena de conexión a la base de datos
mongoose.Promise=global.Promise;
const dbUrl= 'mongodb://localhost:27017/dbsistema';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose=> console.log('Conectando a la base de datos en el puerto 27017'))
.catch(err=> console.log(err));

const app= express();

app.use(morgan('dev'));

app.use(cors());


//Habilita al backend para recibir peticiones json a traves del metodo post
app.use(express.json());

app.use(express.urlencoded({extended:true}));
//Indicar la ruta para los archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);
//El sistema se encarga de asignar automaticamente el puerto de ejecución, sino se usa el puerto 3000
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('Server on port ' + app.get('port'));
});
