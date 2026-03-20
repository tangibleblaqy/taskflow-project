let tareasGuardadas = [];
const formularioTarea = document.getElementById("formularioTarea");
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

const tareasTotales = document.getElementById("tareasTotales");
const tareasCompletas = document.getElementById("tareasCompletas");
const tareasSkilling = document.getElementById("tareasSkilling");
const tareasBossing = document.getElementById("tareasBossing");
const otrasTareas = document.getElementById("otrasTareas");
  

//actualizar localstorage
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
  div.className = "tarea flex flex-row items-center max-w-full p-1 pl-2 draggable rounded-2xl border border-[rgb(128,128,128)] m-2.5 mx-0 transition-transform duration-200 lg:hover:scale-102";
  div.classList.add(tarea.categoria);

  const p = document.createElement("p");
  p.textContent = tarea.valor;
  p.dataset.valor = tarea.valor;
  p.className = "flex-1 inline-block p-1.5 font-['Times_New_Roman'] whitespace-nowrap overflow-x-auto";
  if (tarea.categoria === "completado"){
    p.classList.add("line-through");
  }

  const img = new Image(20, 20);
  if (tarea.categoria === "skilling"){
    img.src = "/recursos/Stats_icon.png"
  } else if (tarea.categoria === "bossing"){
    img.src = "/recursos/Multicombat.png"
  } else if(tarea.categoria === "otro"){
    img.src = "/recursos/Dungeon_icon.png"
  } else {
    img.src = "/recursos/Distraction_map_icon.png"
  }

  const borrar = document.createElement("button");
  borrar.textContent = "✕";
  borrar.className = "borrar border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200 hover:bg-red-500 hover:border-red-500";
  borrar.style.margin = "0.125rem";  

  //eventListener para boton de borrar
  borrar.addEventListener("click", () => {
    const valorP = div.querySelector("p").dataset.valor;
    tareasGuardadas = tareasGuardadas.filter(tarea => tarea.valor !== valorP);
    actualizarLocal();
    div.remove();
    mostrarInformacion();
    actualizarEstadisticas();
  })
  
  //si no esta completo
  if(tarea.categoria !== "completado"){

    const editar = document.createElement("button");
    editar.textContent = "🖉";
    editar.className = "editar border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200";
    editar.style.margin = "0.125rem";

    //eventListener para boton de editar
    editar.addEventListener("click", () => {
      const valorP = prompt("Editar tarea:", p.textContent);
      if (valorP !== null) {
        if(valorP === ""){
          alert("no puede estar vacío");
          return;
       }
        const editar = tareasGuardadas.find(t => t.valor === p.dataset.valor);
        if (editar) editar.valor = valorP;
        p.textContent = valorP;
        p.dataset.valor = valorP;
        actualizarLocal();
        actualizarEstadisticas();
      }
      return;
    })

    const completar = document.createElement("button");
    completar.textContent = "✓";
    completar.className = "completar border border-[rgb(128,128,128)] rounded-2xl w-7 h-7 transition-transform duration-200 hover:bg-green-500 hover:border-green-500";
    completar.style.margin = "0.125rem";

 
    //eventListener para boton de completar
    completar.addEventListener("click", () => {
      p.classList.add("line-through");
      p.classList.add("completado");
      div.classList.remove("skilling", "bossing", "otro");
      div.classList.add("completado");
      const tareaTemporal = tareasGuardadas.find(tarea => tarea.valor === p.textContent);
      tareaTemporal.categoria = "completado";
      const imagen = div.querySelector("img");
      imagen.src = "/recursos/Distraction_map_icon.png?t=" + Date.now();
      completar.remove();
      editar.remove();
      actualizarLocal();
      actualizarEstadisticas();
      })

      div.append(img, p, borrar, editar, completar);
  }else{
    div.append(img, p, borrar);
  }
    document.getElementById("tareas").appendChild(div);
    if (filtroActual && !div.classList.contains(filtroActual)) {
      div.classList.add("hidden");
    }
}

//Marcar todo como completado
const todoCompletado = () => {  
  const respuesta = confirm("¿Estás seguro de que quieres marcar todas las tareas como completadas?");
  if (respuesta) {
      const divTareas = document.getElementById("tareas");
      const todoTarea = divTareas.querySelectorAll("div p");
      todoTarea.forEach((p) => {
      p.classList.add("completado", "line-through")
      const parentDiv = p.closest("div");
      parentDiv.classList.remove("skilling", "bossing", "otro");
      parentDiv.classList.add("completado");
      const tareaTemporal = tareasGuardadas.find(tarea => tarea.valor === p.textContent);
      tareaTemporal.categoria = "completado";
      actualizarLocal();
    });
    const imagen = divTareas.querySelectorAll("img");
    imagen.forEach((img) => {
      img.src = "/recursos/Distraction_map_icon.png?t=" + Date.now()
      divTareas.querySelectorAll("div button:nth-child(4), div button:nth-child(5)").forEach(boton => boton.remove());;
    })
  }
}

completarTodo.addEventListener("click", () =>{
  todoCompletado();
  actualizarEstadisticas();
})

//borrar todo completado:
const borrarCompletado = () => {
  const respuesta = confirm("¿Estás seguro de que quieres borrar todas las tareas completadas?");  
  if (respuesta) {
    const divTareas = document.getElementById("tareas");
      divTareas.querySelectorAll(".completado").forEach(tarea =>{
      const valorP = tarea.dataset.valor;
      tareasGuardadas = tareasGuardadas.filter(t => t.valor !== valorP);
      tarea.parentElement.remove();
      actualizarLocal();
    })
    mostrarInformacion();
    actualizarEstadisticas();
  }
}

borrarTodo.addEventListener("click", () =>{
  borrarCompletado();
})

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

//filtrar por categoria
let filtroActual = null;
const botones = [completados, skilling, bossing, otro];

const filtrarTareas = (categoria) => {
  const tarea = tareas.querySelectorAll("div");
  tarea.forEach(valor => {
    if (categoria === null || valor.classList.contains(categoria)) {
      valor.classList.remove("hidden");
    } else {
      valor.classList.add("hidden");
    }
  });
}

const activarBoton = (boton, categoria) => {
  filtroActual = filtroActual === categoria ? null : categoria;
  botones.forEach(b => b.classList.remove("elegido"));
  if (filtroActual) {
    boton.classList.add("elegido");
  }
  filtrarTareas(filtroActual);
}

completados.addEventListener("click", () =>{
  activarBoton(completados, "completado");
})

skilling.addEventListener("click", () =>{
  activarBoton(skilling, "skilling");
})

bossing.addEventListener("click", () =>{
  activarBoton(bossing, "bossing");
})

otro.addEventListener("click", () =>{
  activarBoton(otro, "otro");
})

//Buscador
buscador.addEventListener("input", (buscarTarea));

//Crear tarea
formularioTarea.addEventListener("submit", (e) =>{
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
    actualizarEstadisticas();
})

//Funcion para mostrar informacion, si no hay tarea muestra la imagen
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

//Recuperar tareas al recargar la pagina
window.addEventListener("load", () => {
  tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareasGuardadas.forEach(tarea => crearTarea(tarea));
  mostrarInformacion();
  actualizarEstadisticas();
})

//Modo oscuro
const tema = document.getElementById("tema");
tema.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
})

//estadisticas
const actualizarEstadisticas = () => {
  tareasTotales.textContent = tareasGuardadas.length;
  tareasCompletas.textContent = tareasGuardadas.reduce((contador, tarea) => tarea.categoria === "completado" ? contador + 1 : contador, 0);
  tareasSkilling.textContent = tareasGuardadas.reduce((contador, tarea) => tarea.categoria === "skilling" ? contador + 1 : contador, 0);
  tareasBossing.textContent = tareasGuardadas.reduce((contador, tarea) => tarea.categoria === "bossing" ? contador + 1 : contador, 0);
  otrasTareas.textContent = tareasGuardadas.reduce((contador, tarea) => tarea.categoria === "otro" ? contador + 1 : contador, 0);
  felicitar();
}

//felicitar
const felicitar = () => {
  if (tareasTotales.textContent === tareasCompletas.textContent){
    const textoFelicitacion = document.getElementById("textoFelicitacion");
    const baile = document.getElementById("baile");
    textoFelicitacion.classList.remove("hidden");
    baile.classList.remove("hidden");
  } else{
    textoFelicitacion.classList.add("hidden");
    baile.classList.add("hidden");
  }
}