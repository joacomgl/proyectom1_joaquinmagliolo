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
  paletaActual = []; // limpia la paleta anterior

  for (let i = 0; i < cantidad; i++) {
    paletaActual.push(generarColorHSL()); // siempre guarda HSL
  }
}

function mostrarPaleta() {
  paletteContainer.innerHTML = "";

  paletaActual.forEach(function(colorHSL) {
    const div = document.createElement("div");
    div.classList.add("color-box");
    div.style.backgroundColor = colorHSL;

    if (formatoActual === "hex") {
      div.textContent = generarColorHex(); // muestra formato hex
    } else {
      div.textContent = colorHSL; // muestra formato hsl
    }

    paletteContainer.appendChild(div);
  });
}

function renderizarPaleta() {
  if (formatoActual === "") return; // si no eligió formato, no hace nada

  const cantidad = Number(selectCantidad.value);
  generarPaleta(cantidad);
  mostrarPaleta();
}

// Botones y lista 
button.addEventListener("click", renderizarPaleta);
selectCantidad.addEventListener("change", renderizarPaleta);

//Alternador paleta hsl
hslBtn.addEventListener("click", function () {
  formatoActual = "hsl";
  hslBtn.classList.add("activo");
  hexBtn.classList.remove("activo");
  paletteContainer.innerHTML = ""; // ← limpia la pantalla
});

//Alternador paleta hex
hexBtn.addEventListener("click", function () {
  formatoActual = "hex";
  hexBtn.classList.add("activo");
  hslBtn.classList.remove("activo");
  paletteContainer.innerHTML = ""; // ← limpia la pantalla
});