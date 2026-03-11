## Primeros pasos con Cursor

Este documento resume mi experiencia inicial utilizando **Cursor** como editor asistido por IA: cómo es la interfaz, qué funcionalidades destaqué en el uso diario y qué mejoras noté especialmente en el código (sobre todo en archivos Markdown).

---

## 1. La interfaz

Para alguien acostumbrado a **VS Code**, la interfaz de Cursor resulta **muy familiar**:

- **Diseño similar**: barras laterales, pestañas de archivos y paleta de comandos recuerdan mucho a VS Code, lo que reduce la curva de aprendizaje.
- **Integración de IA**: los paneles de chat y las acciones con IA están integrados en el propio editor, sin necesidad de extensiones externas.
- **Ausencia de algunos plugins**: aunque se echan en falta algunos plugins de VS Code, la integración nativa de IA compensa gran parte de esas ausencias.

En resumen, es un entorno cómodo si ya vienes del ecosistema de VS Code.

---

## 2. Funcionalidades principales

### 2.1 Chat integrado en el editor

La inclusión de un **chat integrado** facilita mucho el flujo de trabajo:

- Permite **resolver dudas** sin salir del editor.
- Puede **modificar varios archivos a la vez** siguiendo instrucciones en lenguaje natural.
- Ahorra tiempo en tareas repetitivas o de refactorización.

Aunque el tiempo de respuesta puede ser algo mayor que en otros agentes de IA, la **calidad y claridad de las explicaciones** compensa la espera en la mayoría de los casos.

### 2.2 Autocompletado con IA

El **autocompletado inteligente** sugiere:

- Fragmentos de código que ayudan a **expandir la aplicación**.
- Estructuras repetitivas (bucles, funciones, componentes, etc.), reduciendo el tiempo de escritura.

Estas sugerencias suelen estar bien contextualizadas y, en general, mejoran la velocidad de desarrollo.

### 2.3 Modificación inline del código

La funcionalidad de **edición inline** es especialmente intuitiva:

- Muestra el código eliminado en **rojo** y el nuevo en **verde**.
- Permite **aceptar o revertir** los cambios con un solo clic.

Esto hace que probar refactorizaciones o alternativas de implementación sea muy rápido y seguro.

### 2.4 Ejemplo de duda resuelta

Un caso concreto fue cuando buscaba la función **Composer** y no la encontraba en la interfaz actual.  
El chat explicó que se trataba de una funcionalidad de una **versión anterior** de Cursor y sugirió flujos de trabajo equivalentes con las herramientas actuales.

---

## 3. Código y Markdown mejorados

La parte donde más valor he notado ha sido en la **mejora de archivos Markdown**:

- Se ha mejorado mucho la **legibilidad** del contenido.
- La **presentación** es más clara, con títulos, listas y secciones bien estructuradas.
- El tiempo necesario para dejar un documento “limpio” es **mucho menor** que haciéndolo manualmente.

### 3.1 Ejemplo simple de mejora

Antes, un texto podía estar escrito en un solo párrafo largo y sin formato.  
Tras pasar por Cursor, termina organizado en:

- Encabezados claros (`##`, `###`).
- Listas ordenadas y con negritas para resaltar ideas clave.
- Separadores (`---`) que dividen bien las secciones.

### 3.2 Mejoras adicionales aplicadas al Markdown

Además de la reescritura básica, probé algunas **mejoras extra** sobre la documentación:

- Uso de **tablas** para resumir información comparativa (por ejemplo, ventajas e inconvenientes de distintas herramientas).
- Inclusión de **bloques de código** con el lenguaje indicado (```javascript```, ```html```, etc.) para que sea más fácil de leer y copiar.
- Añadir pequeñas **notas destacadas** con iconos o palabras clave para llamar la atención sobre puntos críticos.

Estas mejoras hacen que los documentos sean más **profesionales, fáciles de escanear** y agradables de leer, algo muy útil para apuntes técnicos o documentación de proyectos.

### 3.3 Ejemplo práctico con funciones de JavaScript (FCT_3)

Además del Markdown, utilicé Cursor para revisar y mejorar algunas funciones de JavaScript del proyecto **FCT_3**, como las relacionadas con la gestión de tareas.

#### Ejemplo 1: Búsqueda de tareas

**Código original:**

```javascript
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
```

**Versión mejorada con la ayuda de Cursor:**

```javascript
const buscarTarea = () => {
  const termino = buscador.value.trim().toLowerCase();

  document.querySelectorAll(".tarea").forEach((div) => {
    const p = div.querySelector("p");
    const textoTarea = p.textContent.toLowerCase();

    const coincide = textoTarea.includes(termino);
    div.style.display = coincide ? "block" : "none";
  });
};
```

**Mejoras aplicadas:**

- Se normaliza el texto del buscador con `trim().toLowerCase()` para evitar problemas con mayúsculas o espacios extra.
- Se eliminan los `console.log` innecesarios.
- Se usan nombres de variables más claros (`termino`, `textoTarea`, `coincide`).
- Se simplifica la lógica de presentación con un operador ternario.

#### Ejemplo 2: Gestión del modo oscuro

**Código original:**

```javascript
const tema = document.getElementById("tema");
tema.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
```

**Versión mejorada con la ayuda de Cursor:**

```javascript
const tema = document.getElementById("tema");

const alternarTema = () => {
  document.documentElement.classList.toggle("dark");
};

tema.addEventListener("click", alternarTema);
```

**Mejoras aplicadas:**

- Se extrae la lógica a una función `alternarTema`, lo que facilita su reutilización (por ejemplo, al cargar la página según preferencias del usuario).
- El código queda más legible y preparado para futuras ampliaciones (guardar el tema en `localStorage`, leer la preferencia del sistema, etc.).
