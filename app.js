const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people); // Enviamos todo el array
});

app.get("/people/:index", (req, res) => {
  /*La propiedad "params" del request permite acceder a los parámetros de la URL 
    (importante no confundir con la "query", que serían los parámetros que se colocan 
    luego del signo "?" en la URL)
   */
  res.json(people[req.params.index]); // Enviamos el elemento solicitado por su índice
});

app.post("/people", (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

  people.push(req.body); // Añadimos un nuevo elemento al array

  res.json(req.body); // Le respondemos al cliente el objeto añadido
});

app.put("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda actualizar el objeto asociado al índice indicado en la URL 
   */

     const index = req.params.index;
     const person = people[index];
   
  
     if (!person) {
       return res.status(404).send("Persona no encontrada");
     }
   
     
     const editableFields = ["first_name", "last_name", "email"];
     
     
     Object.keys(req.body).forEach((key) => {
       if (editableFields.includes(key)) {
         person[key] = req.body[key];
       }
     });
   
     
     res.status(200).json({
       message: "Persona actualizada con éxito",
       updatedPerson: person,
     });
});


app.delete("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
   */

     const index = parseInt(req.params.index);

     // Verificar si el índice es válido
     if (index < 0 || index >= people.length) {
         return res.status(404).json({ error: "Persona no encontrada" });
     }
 
     // Eliminar la persona (opcionalmente puedes establecer el campo a null)
     people[index] = null; // O puedes usar undefined o un objeto vacío {}
 
     res.json({
         message: "Persona eliminada.",
         people // Devolver el array actualizado
     });
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
