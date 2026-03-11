let tareasGuardadas = [];
let tareaActual;

const boton = document.getElementById("boton");
const buscador = document.getElementById("buscador");
const creador = document.getElementById("creador");
const tareas = document.getElementById("tareas");

//actualizar LocalStorage
const actualizarLocal = () => {
    localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
}

//borrar valores del formulario
const borrarFormulario = () => {
    creador.value = "";
}

//funcion para crear tareas
const crearTarea = (tarea) => {
    const div = document.createElement("div");
    div.classList.add("tarea");

    const p = document.createElement("p");
    p.textContent = tarea + "\u00A0";
    p.dataset.valor = tarea;

    //crear boton para borrar
    const button = document.createElement("button");
    button.textContent = "Borrar";
    button.classList.add("borrar");

    //eventListener para boton de borrar
    button.addEventListener("click", () => {
      const valorP = div.querySelector("p").dataset.valor;
      tareasGuardadas = tareasGuardadas.filter(tarea => tarea !== valorP);
      actualizarLocal();
      div.remove();
    });

    div.append(p, button);
    tareas.append(div);
}

//funcion para buscar tarea
const buscarTarea = () => {
    const valorBuscador = buscador.value;
    console.log(valorBuscador);
    document.querySelectorAll(".tarea").forEach(div => {
    const p = div.querySelector("p");
    const tarea = p.textContent.toLowerCase();
    
    //presentacion de la tarea
    if (tarea.includes(valorBuscador)) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  })
}

//Crear tarea
boton.addEventListener("click", (e) =>{
    e.preventDefault();
    tareaActual = creador.value.trim();

    //comprobar que no sea repetido o vacio
    if (tareaActual === "") {
    borrarFormulario();
    return alert("La tarea no puede estar vacío");
    } else if(tareasGuardadas.some((value) => value.toLowerCase() === tareaActual.toLowerCase())){
    borrarFormulario();
    return alert("No puede haber tareas repetidas"); 
    }
    tareasGuardadas.push(tareaActual);
    crearTarea(tareaActual);
    actualizarLocal();
    borrarFormulario();
})

//Buscador
buscador.addEventListener("input", (buscarTarea));

//Recuperar tareas al recargar la pagina
window.addEventListener("load", () => {
  tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach(tarea => crearTarea(tarea));
});


