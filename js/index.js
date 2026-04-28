const paletteContainer = document.getElementById("palette");
const button = document.getElementById("generate-btn");
const selectCantidad = document.getElementById("cantidad");
const hslBtn = document.getElementById("hsl-btn");
const hexBtn = document.getElementById("hex-btn");
let formatoActual = "";
let paletaActual = []; // aca se guardan los colores
const guardarBtn = document.getElementById("guardar-btn");
const paletasGuardadas = document.getElementById("paletas-guardadas");

// Colores en hsl
function generarColorHSL() {
  let h = Math.floor(Math.random() * 360);
  let s = Math.floor(Math.random() * 41) + 60; // 60 a 100
  let l = Math.floor(Math.random() * 31) + 35; // 35 a 65

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Colores en hex
function generarColorHex() {
  const letras = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }

  return color;
}

// Paleta segun cantidad
function generarPaleta(cantidad) {
  const viejos = paletaActual;
  paletaActual = [];

  for (let i = 0; i < cantidad; i++) {
    // si el color estaba bloqueado, lo conserva
    if (viejos[i] && viejos[i].bloqueado) {
      paletaActual.push(viejos[i]); // conserva color Y estado
    } else {
      if (formatoActual === "hex") {
        const hex = generarColorHex(); // guarda el HEX fijo acá
        paletaActual.push({ color: hex, bloqueado: false }); // fondo y texto son el mismo HEX
      } else {
        paletaActual.push({ color: generarColorHSL(), bloqueado: false });
      }
    }
  }
}

function mostrarPaleta() {
  paletteContainer.innerHTML = "";

  paletaActual.forEach(function(item) {
    const div = document.createElement("div");
    div.classList.add("color-box");
    div.style.backgroundColor = item.color; // funciona con HSL y HEX
    div.title = "Copiar al portapapeles";

    // Texto del color
    const span = document.createElement("span"); // primero se crea
    span.textContent = item.color;               // después se usa
    div.dataset.color = item.color;

    // Botón candado
    const candado = document.createElement("button");
    candado.classList.add("candado-btn");
    candado.textContent = item.bloqueado ? "🔒" : "🔓";
    candado.title = "Bloquear/desbloquear color";
    
    // Clic en candado — bloquea/desbloquea
    candado.addEventListener("click", function(e) {
      e.stopPropagation();
      item.bloqueado = !item.bloqueado;
      candado.textContent = item.bloqueado ? "🔒" : "🔓";
    });

    // Clic en div — copia al portapapeles
    div.addEventListener("click", function() {
      navigator.clipboard.writeText(div.dataset.color);
      span.textContent = "¡Copiado!";
      setTimeout(function() {
        span.textContent = div.dataset.color;
      }, 1000);
    });

    div.appendChild(span);
    div.appendChild(candado);
    paletteContainer.appendChild(div);
  });
}

//Paleta en pantalla
function renderizarPaleta() {
  if (formatoActual === "") return;

  // Oculta el instructivo la primera vez
  const instructivo = document.getElementById("instructivo");
  if (instructivo) {
    instructivo.style.display = "none";
  }

  const cantidad = Number(selectCantidad.value);
  generarPaleta(cantidad);
  mostrarPaleta();
}

//Lista cantidad en paleta
selectCantidad.addEventListener("change", function() {
  if (paletaActual.length === 0) return; // si no hay paleta, no hace nada

  const cantidadNueva = Number(selectCantidad.value);

  // agrega colores al final
 while (paletaActual.length < cantidadNueva) {
  paletaActual.push({ 
    color: generarColorHSL(), 
    hex: generarColorHex(),
    bloqueado: false 
  }); //objeto. mantiene los colores fijos
}
  // quita colores del final
  while (paletaActual.length > cantidadNueva) {
    paletaActual.pop();
  }

  mostrarPaleta();
});

// Botones
button.addEventListener("click", renderizarPaleta);


//Alternador paleta hsl
hslBtn.addEventListener("click", function () {
  formatoActual = "hsl";
  hslBtn.classList.add("activo");
  hexBtn.classList.remove("activo");
  paletaActual = []; // resetea todo al cambiar formato
  paletteContainer.innerHTML = ""; // limpia la pantalla
});

//Alternador paleta hex
hexBtn.addEventListener("click", function () {
  formatoActual = "hex";
  hexBtn.classList.add("activo");
  hslBtn.classList.remove("activo");
  paletaActual = []; // resetea todo al cambiar formato
  paletteContainer.innerHTML = ""; // limpia la pantalla
});

// Guarda la paleta actual en localStorage
function guardarPaleta() {
  if (paletaActual.length === 0) return; // si no hay paleta, no hace nada

  const guardadas = JSON.parse(localStorage.getItem("paletas")) || [];

  if (guardadas.length >= 2) {
    alert("Ya tenés 2 paletas guardadas. Borrá una para guardar otra.");
    return;
  }

  guardadas.push({
    colores: paletaActual,
    formato: formatoActual
  });

  localStorage.setItem("paletas", JSON.stringify(guardadas));
  mostrarPaletasGuardadas();
}

// Muestra las paletas guardadas en pantalla
function mostrarPaletasGuardadas() {
  const guardadas = JSON.parse(localStorage.getItem("paletas")) || [];
  paletasGuardadas.innerHTML = "";

  guardadas.forEach(function(paleta, index) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("paleta-guardada");

    // Muestra los colores en miniatura
    paleta.colores.forEach(function(item) {
      const mini = document.createElement("div");
      mini.classList.add("color-mini");
      mini.style.backgroundColor = item.color;
      mini.textContent = item.color;
      contenedor.appendChild(mini);
    });

    // Botón borrar
    const borrarBtn = document.createElement("button");
    borrarBtn.textContent = "Borrar";
    borrarBtn.title = "Borrar paleta guardada";
    borrarBtn.addEventListener("click", function() {
      guardadas.splice(index, 1); // quita esta paleta del array
      localStorage.setItem("paletas", JSON.stringify(guardadas));
      mostrarPaletasGuardadas();
    });

    contenedor.appendChild(borrarBtn);
    paletasGuardadas.appendChild(contenedor);
  });
}

guardarBtn.addEventListener("click", guardarPaleta);

// Carga las paletas guardadas al abrir la página
mostrarPaletasGuardadas();