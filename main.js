//Clase pregunta
class Pregunta {
  constructor(pregunta, opcionA, opcionB, opcionC, opcionD, respuesta) {
    this.pregunta = pregunta;
    this.opcionA = opcionA;
    this.opcionB = opcionB;
    this.opcionC = opcionC;
    this.opcionD = opcionD;
    this.respuesta = respuesta;
  }
}

//Clase colección de preguntas
class ColeccionPreguntas {
  constructor() {
    this.preguntas = [];
  }

  agregarPregunta(pregunta) {
    this.preguntas.push(pregunta);
  }

  editPregunta(index) {
    var item = this.preguntas[index];
    var modalEditar = new bootstrap.Modal(document.getElementById("modalEdit"));
    modalEditar.show();
    //Campos del formulario
    var formEdit = document.getElementById("formEdit");
    var preguntaFormEdit = document.getElementById("preguntaEdit");
    var opcionAFormEdit = document.getElementById("opcionAEdit");
    var opcionBFormEdit = document.getElementById("opcionBEdit");
    var opcionCFormEdit = document.getElementById("opcionCEdit");
    var opcionDFormEdit = document.getElementById("opcionDEdit");
    var respuestaFormEdit = document.getElementById("respuestaEdit");

    preguntaFormEdit.value = item.pregunta;
    opcionAFormEdit.value = item.opcionA;
    opcionBFormEdit.value = item.opcionB;
    opcionCFormEdit.value = item.opcionC;
    opcionDFormEdit.value = item.opcionD;
    respuestaFormEdit.value = item.respuesta;

    // Agregar un evento al botón de guardar cambios
  var btnGuardarCambios = document.getElementById("btnGuardarCambios");
  btnGuardarCambios.addEventListener("click", function (event) {
  event.preventDefault();
    // Obtener los nuevos valores editados del formulario
    var newPregunta = preguntaFormEdit.value;
    var newOpcionA = opcionAFormEdit.value;
    var newOpcionB = opcionBFormEdit.value;
    var newOpcionC = opcionCFormEdit.value;
    var newOpcionD = opcionDFormEdit.value;
    var newRespuesta = respuestaFormEdit.value;

    item.pregunta = newPregunta;
    item.opcionA = newOpcionA;
    item.opcionB = newOpcionB;
    item.opcionC = newOpcionC;
    item.opcionD = newOpcionD;
    item.respuesta = newRespuesta;
    agregarDOM();
    modalEditar.hide();
  });
    
  }

  eliminarPregunta(index) {
    this.preguntas.splice(index, 1);
    agregarDOM();
  }

  obtenerPreguntas() {
    return this.preguntas;
  }
}


//Campos del formulario
var form = document.getElementById("form");
var preguntaForm = document.getElementById("pregunta");
var opcionAForm = document.getElementById("opcionA");
var opcionBForm = document.getElementById("opcionB");
var opcionCForm = document.getElementById("opcionC");
var opcionDForm = document.getElementById("opcionD");
var respuestaForm = document.getElementById("respuesta");

//Instancia de la colección de preguntas
var colPreguntas = new ColeccionPreguntas();

//evento submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var pregunta = preguntaForm.value;
  var opcA = opcionAForm.value;
  var opcB = opcionBForm.value;
  var opcC = opcionCForm.value;
  var opcD = opcionDForm.value;
  var resp = respuestaForm.value;
  console.log(resp);
  //Instacia de la pregunta del from
  const preguntaF = new Pregunta(pregunta, opcA, opcB, opcC, opcD, resp);
  console.log(preguntaF);
  colPreguntas.agregarPregunta(preguntaF);
  console.log(colPreguntas);
  agregarDOM();
  form.reset();
});

//obtener la lista 
var listaPreguntas = document.getElementById("listQuestions");

//Funcion para agregar al DOM
function agregarDOM() {
  listaPreguntas.innerHTML = "";
  const arrayPreguntas = colPreguntas.obtenerPreguntas();
  console.log(arrayPreguntas);
  if(arrayPreguntas.length>0){
    localStorage.setItem("preguntas", JSON.stringify(arrayPreguntas));
  }

  var fragPreguntas = document.createDocumentFragment();
  for (let i = 0; i < arrayPreguntas.length; i++) {
    const item = arrayPreguntas[i];
    console.log(item);
    const listItem = document.createElement("li");
    listItem.innerHTML = `<h6>${item.pregunta}</h6>
      <input type="radio" id="opcionA-imprimible" name="respuesta-imprimible${i}" value="opcionA">
      <label for="opcionA-imprimible">${item.opcionA}</label><br>
      <input type="radio" id="opcionA-imprimible" name="respuesta-imprimible${i}" value="opcionB">
      <label for="opcionA-imprimible">${item.opcionB}</label><br>
      <input type="radio" id="opcionA-imprimible" name="respuesta-imprimible${i}" value="opcionC">
      <label for="opcionA-imprimible">${item.opcionC}</label><br>
      <input type="radio" id="opcionA-imprimible" name="respuesta-imprimible${i}" value="opcionD">
      <label for="opcionA-imprimible">${item.opcionD}</label><br>
      `;
    var deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-primary", "btn-delete");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener('click', () => colPreguntas.eliminarPregunta(i));

    var botonEdit = document.createElement("button");
    botonEdit.classList.add("btn", "btn-primary", "btn-edit");
    botonEdit.textContent = "Editar";
    botonEdit.addEventListener("click", function () {
      colPreguntas.editPregunta(i);
    });
    listItem.appendChild(deleteBtn);
    listItem.appendChild(botonEdit);
    fragPreguntas.appendChild(listItem);
  }
  listaPreguntas.appendChild(fragPreguntas);
}

//localstorage colección de preguntas
var preguntas = JSON.parse(localStorage.getItem("preguntas"));
if (preguntas!==null) {
  for(let i=0;i<preguntas.length;i++){
    colPreguntas.agregarPregunta(preguntas[i]);
  }
}

//carousel inicio
var carousel = document.querySelector('.carousel');
var cellCount = 6;
var selectedIndex = 0;

function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
}

var prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

//eventos para abrir los contenedores de las preguntas
var divCrearPreguntas = document.querySelector('#crearPregunta');
var divOpen = document.getElementById('divGenerarPreguntas');
var divOpenList = document.getElementById('divListPreguntas');
divCrearPreguntas.addEventListener('click', function(){
  
  divOpenList.style.display = "none";
  divOpen.style.display = "block";
});

var divListPreguntas = document.querySelector('#listPreguntas');
divListPreguntas.addEventListener('click', function(){
  divOpen.style.display = "none";
  divOpenList.style.display = "block";
});

 





