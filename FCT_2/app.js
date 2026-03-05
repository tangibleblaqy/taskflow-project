const tareasGuardadas = [];
let tareaActual;

const boton = document.getElementById("boton");
const buscador = document.getElementById("buscador");
const creador = document.getElementById("creador");
const tareas = document.getElementById("tareas");

const borrarFormulario = () => {
    creador.value = "";
}

const crearTarea = (tareaActual, tareas) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");

    p.textContent = tareaActual + "\u00A0";
    button.textContent = "Borrar";
    div.classList.add(tareaActual);

    div.append(p, button);
    tareas.append(div);
}

boton.addEventListener("click", (e) =>{
    e.preventDefault();
    tareaActual = creador.value.trim();

    if (tareaActual === "") {
    borrarFormulario();
    return alert("La tarea no puede estar vacío");
    } else if(tareasGuardadas.some((value) => value.toLowerCase() === tareaActual.toLowerCase())){
    borrarFormulario();
    return alert("No puede haber tareas repetidas"); 
    }
    tareasGuardadas.push(tareaActual);
    crearTarea(tareaActual, tareas);
    borrarFormulario();
})


