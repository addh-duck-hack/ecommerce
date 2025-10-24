import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './router/index.js'

//Traemos las variables de entorno
const PORT = process.env.PORT || 3000;

//CONEXION A LA BASE DE DATOS
mongoose.Promise = global.Promise;
const dbUrL = "mongodb://d3f4ult0:oHMn466UKRPeAyqPLRrG9TNfjmd8e5Meouws1BydhYqupzVcX6@mongo.duck-hack.cloud/ecommerce?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
mongoose.connect(dbUrL)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/',router)

app.set('port',PORT);

app.listen(app.get('port'), () => {
    console.log("EL SERVIDOR SE EJECUTO PERFECTAMENTE EN EL PUERTO " + PORT);
})