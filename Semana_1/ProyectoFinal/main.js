let tareasGuardadas = [];
let tareasCompletadas = [];

const boton = document.getElementById("boton");
const buscador = document.getElementById("buscador");
const creador = document.getElementById("creador");
const tipo = document.getElementById("tipo");
const tareas = document.getElementById("tareas");

const estadisticas = document.getElementById("estadisticas");
const chatHead = document.getElementById("chathead");

const filtros = document.getElementById("filtros");
const completados = document.getElementById("completado");
const skilling = document.getElementById("skilling");
const bossing = document.getElementById("bossing");
const otro = document.getElementById("otro");

const botonTodo = document.getElementById("botonTodo");
const completarTodo = document.getElementById("completarTodo");
const borrarTodo = document.getElementById("borrarTodo");

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
    div.className = "tarea flex flex-row items-center min-w-0 max-w-full p-1 pl-2 rounded-2xl border border-[rgb(128,128,128)] m-2.5 mx-0 transition-transform duration-200";
    div.classList.add(tarea.categoria);

    const p = document.createElement("p");
    p.textContent = tarea.valor;
    p.dataset.valor = tarea.valor;
    p.className = "flex-1 inline-block p-1.5 font-['Times_New_Roman'] whitespace-nowrap overflow-x-auto";

    const img = new Image(20, 20);
    if (tarea.categoria === "skilling"){
      img.src = "/recursos/Stats_icon.png"
    } else if (tarea.categoria === "bossing"){
      img.src = "/recursos/Multicombat.png"
    } else{
      img.src = "/recursos/Dungeon_icon.png"
    }

    const borrar = document.createElement("button");
    borrar.textContent = "✕";
    borrar.className = "borrar cursor-pointer border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200 hover:scale-110 hover:bg-red-500 hover:border-red-500";
    borrar.style.margin = "0.125rem";  

    //eventListener para boton de borrar
    borrar.addEventListener("click", () => {
      const valorP = div.querySelector("p").dataset.valor;
      tareasGuardadas = tareasGuardadas.filter(tarea => tarea.valor !== valorP);
      actualizarLocal();
      div.remove();
      mostrarInformacion();
    })

    const editar = document.createElement("button");
    editar.textContent = "🖉";
    editar.className = "editar cursor-pointer border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200 hover:scale-110";
    editar.style.margin = "0.125rem";

    //eventListener para boton de editar
    editar.addEventListener("click", () => {
      const valorP = prompt("¿Como se llamará la tarea?");
      if (valorP !== null) {
        if(valorP === ""){
          alert("no puede estar vacío");
          return;
        }
        p.textContent = valorP;
        p.dataset.valor = valorP;
        tareasGuardadas.tarea.valor = valorP;
        actualizarLocal();
      }
      return;
    })

    const completar = document.createElement("button");
    completar.textContent = "✓";
    completar.className = "completar cursor-pointer border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200 hover:scale-110 hover:bg-green-500 hover:border-green-500";
    completar.style.margin = "0.125rem";

    //eventListener para boton de completar
    completar.addEventListener("click", () => {
      p.classList.toggle("line-through");
    })

    div.append(img, p, borrar, editar, completar);
    document.getElementById("tareas").appendChild(div);
}


//funcion para buscar tarea
const buscarTarea = () => {
    const valorBuscador = buscador.value;
    document.querySelectorAll(".tarea").forEach(div => {
    const p = div.querySelector("p");
    const tarea = p.textContent.toLowerCase();
    
    //presentacion de la tarea
    if (tarea.includes(valorBuscador)) {
      div.classList.remove("hidden");
    } else {
      div.classList.add("hidden");;
    }
  })
}

//Funcion para mostrar estadisticas
const mostrarInformacion = () => {
  if (!tareasGuardadas.length){
    estadisticas.classList.add("hidden");
    filtros.classList.add("hidden");
    botonTodo.classList.add("hidden");
    chatHead.classList.remove("hidden");
  }else{
    estadisticas.classList.remove("hidden");
    filtros.classList.remove("hidden");
    botonTodo.classList.remove("hidden");
    chatHead.classList.add("hidden");
  }
}

//Crear tarea
boton.addEventListener("click", (e) =>{
    e.preventDefault();
    
    const tareaTemporal = {categoria: tipo.value, valor: creador.value};

    //comprobar que no sea repetido o vacio
    if (tareaTemporal.valor === "") {
    borrarFormulario();
    return alert("La tarea no puede estar vacío");
    } else if(tareasGuardadas.some((value) => value.valor.toLowerCase() === tareaTemporal.valor.toLowerCase())){
    borrarFormulario();
    return alert("No puede haber tareas repetidas"); 
    }


    tareasGuardadas.push(tareaTemporal);
    crearTarea(tareaTemporal);
    actualizarLocal();
    borrarFormulario();
    mostrarInformacion();
})

//Buscador
buscador.addEventListener("input", (buscarTarea));

//Recuperar tareas al recargar la pagina
window.addEventListener("load", () => {
  tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach(tarea => crearTarea(tarea));
  mostrarInformacion();
})

//Modo oscuro
const tema = document.getElementById("tema");
tema.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
})

//Marcar todo como completado
