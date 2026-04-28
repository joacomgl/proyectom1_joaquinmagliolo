const paletteContainer = document.getElementById("palette");
const button = document.getElementById("generate-btn");
const selectCantidad = document.getElementById("cantidad");
const hslBtn = document.getElementById("hsl-btn");
const hexBtn = document.getElementById("hex-btn");
let formatoActual = "";
let paletaActual = []; // aca se guardan los colores

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
      const hex = generarColorHex(); // guarda el HEX fijo acá
      paletaActual.push({ color: hex, bloqueado: false }); // fondo y texto son el mismo HEX
    }
  }
}

function mostrarPaleta() {
  paletteContainer.innerHTML = "";

  paletaActual.forEach(function(item) {
    const div = document.createElement("div");
    div.classList.add("color-box");
    div.style.backgroundColor = item.color; // funciona con HSL y HEX

    // Texto del color
    const span = document.createElement("span"); // primero se crea
    span.textContent = item.color;               // después se usa
    div.dataset.color = item.color;

    // Botón candado
    const candado = document.createElement("button");
    candado.classList.add("candado-btn");
    candado.textContent = item.bloqueado ? "🔒" : "🔓";
    
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
  if (formatoActual === "") return; // si no eligió formato, no hace nada

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