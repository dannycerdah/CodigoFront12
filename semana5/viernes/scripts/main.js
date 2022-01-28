// GET - Se hace la peticion
function obtenerComputadoras() {
  fetch("https://61ef3f1cd593d20017dbb3e3.mockapi.io/person")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (people) {
      document.getElementById("app").innerHTML = "";
      people.forEach(function (person) {
        // se recorre coleccion
        agregarNodoEnHtml(crearNodo(person));
      });
    });

  function crearNodo(person) {
    console.log("computadora", person);
    const nodo = document.createElement("article");
    nodo.innerHTML = `
      <article class="card mb-4">
          <div class="card-body">
              <h5  class="card-title">Nombre: ${person.name}</h5>
              <p class="card-text">Apellido: ${person.lastName}</p>
              <p class="card-text">DNI: ${person.dni}</p>
              <p class="card-text">Edad: ${person.age}</p>
              <img style="width:100%" class="img-full" src=${person.photo}>
              <br>
              <br>
              <button class="js_delete">ELIMINAR</button>
              <button  data-bs-toggle="modal" data-bs-target="#exampleModal"  class="js_edit">EDITAR</button>
          </div>
        </article>
    `;

    nodo.querySelector(".js_delete").onclick = function () {
      if (confirm("Estas seguro que quieres eliminar el elemento")) {
        fetch(
          `https://61ef3f1cd593d20017dbb3e3.mockapi.io/person/${person.id}`,
          {
            method: "DELETE",
          }
        )
          .then((respuesta) => respuesta.json())
          .then((respuesta) => {
            console.log("respuesta", respuesta);
            nodo.remove();
            alert(`Se elimino correctamente el id ${person.id}`);
          })
          .catch((error) =>
            alert(
              `No se pudo eliminar el id ${person.id}, por favor intentelo despues`
            )
          );
      }
    };

    nodo.querySelector(".js_edit").onclick = function () {
      // console.log("computadora", computadora);
      const inputName = document.querySelector(".js_form_edit .js_name");
      const inputLastName = document.querySelector(".js_form_edit .js_lastname");
      const inputDni = document.querySelector(".js_form_edit .js_dni");
      const inputAge = document.querySelector(".js_form_edit .js_age");
      const inputPhoto = document.querySelector(".js_form_edit .js_photo");
      const inputId = document.querySelector(".js_form_edit .js_id");
      // const refFormulario = obtenerReferenciasFormulario(
      //   document.querySelector(".js_form_edit")
      // );

      inputName.value = person.name;
      inputLastName.value = person.lastName;
      inputDni.value = person.dni;
      inputAge.value = person.age;
      inputPhoto.value = person.photo;
      inputId.value = person.id;
      // refFormulario.marca.value = computadora.marca
      // refFormulario.memoria.value = computadora.memoria
      // refFormulario.color.value = computadora.color
      // refFormulario.photo.value = computadora.photo
    };

    return nodo;
  }

  function agregarNodoEnHtml(nodo) {
    const app = document.getElementById("app");
    app.appendChild(nodo);
  }
}

/*
GET
Usando el metodo get 
realizar una peticion al endpoint creado con mockapi y pintar los datos en el navegador
*/
// obtenerComputadoras();
function obtenerValores(form) {
  return {
    name: form.querySelector(`.js_name`).value,
    lastName: form.querySelector(`.js_lastname`).value,
    dni: form.querySelector(`.js_dni`).value,
    age: form.querySelector(`.js_age`).value,
    photo: form.querySelector(`.js_photo`).value,
  };
}

function obtenerReferenciasFormulario(form) {
  return {
    name: form.querySelector(`.js_name`),
    lastName: form.querySelector(`.js_lastname`),
    dni: form.querySelector(`.js_dni`),
    age: form.querySelector(`.js_age`),
    photo: form.querySelector(`.js_photo`),
  };
}
/*POST */
function registrarEventoFormulario() {
  const form = document.querySelector(".js_form_create");

  // function obtenerValores() {
  //   return {
  //     marca: document.querySelector(".js_marca").value,
  //     memoria: document.querySelector(".js_memoria").value,
  //     color: document.querySelector(".js_color").value,
  //     photo: document.querySelector(".js_photo").value,
  //   };
  // }

  form.onsubmit = function (event) {
    event.preventDefault();

    fetch("https://61ef3f1cd593d20017dbb3e3.mockapi.io/person", {
      method: "POST",
      body: JSON.stringify(obtenerValores(form)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log("respuesta", respuesta);
        obtenerComputadoras();
        form.reset();
      })
      .catch((error) => console.log("error", error));
    //   .then((respuesta) => console.log(respuesta));
    // .then(function(respuesta) {
    //     return respuesta.json()
    // })
  };
}

// PUT
function registrarEventoFormularioEdit() {
  const form = document.querySelector(".js_form_edit");
  const botonClose = form.querySelector(".js_close");

  form.onsubmit = function (event) {
    event.preventDefault();
    const idValue = form.querySelector(".js_id").value;
    console.log(form.querySelector(".js_id").value);
    debugger;
    console.log(obtenerValores(form));
    fetch(`https://61ef3f1cd593d20017dbb3e3.mockapi.io/person/${idValue}`, {
      method: "PUT",
      body: JSON.stringify(obtenerValores(form)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log("respuesta", respuesta);
        obtenerComputadoras();
        botonClose.click();
      })
      .catch(() =>
        alert(`No se pudo actualizar el id ${idValue} intentelo mas tarde`)
      );
  };
}

obtenerComputadoras();
registrarEventoFormulario();
registrarEventoFormularioEdit();

/*DELETE
Agregar el verbo delete al hacer click en el boton eliminar de la tarjeta
*/