import express from 'express';
import path from 'path';
import hbs from 'hbs';

const app = express();
const PORT = 8080;

app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(path.dirname(''), 'views'));
hbs.registerPartials(path.join(path.dirname(''), 'views/partials'));

app.set("view options", { layout:'layouts/main' });

const proyectos = [
  { 
    id: 1, 
    titulo: "Sistema de Inventario", 
    descripcion: "App en Node.js para controlar stock de productos, gestionar entradas y salidas de inventario, generar reportes de existencias y alertas automáticas cuando el stock está bajo. Incluye autenticación de usuarios y manejo de roles." 
  },
  { 
    id: 2, 
    titulo: "Gestor de Tareas", 
    descripcion: "Aplicación web con JavaScript puro que permite crear, editar y eliminar tareas, organizarlas por prioridad y fecha de entrega, y marcar tareas completadas. Incluye almacenamiento local para guardar las tareas entre sesiones." 
  },
  { 
    id: 3, 
    titulo: "Portafolio Personal", 
    descripcion: "Portafolio web desarrollado con Express y Handlebars (HBS) que muestra información personal, proyectos realizados y enlaces de contacto. Incluye navegación con rutas organizadas, vistas parciales para header y footer, y diseño responsivo adaptable a dispositivos móviles." 
  }
];


app.get('/', (req, res) => {
    res.render('home', {
        nombre: "Natalie Muñoz",
        titulo: "Portafolio Personal",
        proyectos: proyectos
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        titulo: "Sobre mí",
        contenido: "Soy desarrolladora web con experiencia en JavaScript, Node.js y Express. Me apasiona crear aplicaciones eficientes y escalables."
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        titulo: "Mis Proyectos",
        proyectos: proyectos
    });
});

app.use((req, res) => {
    res.status(404).render('404', {
        titulo: "404 - Página No Encontrada",
        mensaje: "Lo sentimos, la página que buscas no existe."
    });
});

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

