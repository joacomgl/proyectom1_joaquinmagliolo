<h1 align="left">🎨 Colorfly Palette Generator</h1>

###

<p align="left">Generador de paletas de colores con soporte HSL y HEX, bloqueo de colores, copiado al portapapeles y guardado de paletas favoritas.</p>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />
</div>

###

<h2 align="left">📸 Vista previa</h2>

###

<p align="left">
  <img width="1920" height="870" alt="Image" src="https://github.com/user-attachments/assets/10770ed6-75b3-4c12-98bf-906e8c084005" />
</p>

###

<h2 align="left">🚀 Demo en vivo</h2>

###

<p align="left">
  <a href="https://joacomgl.github.io/proyectom1_joaquinmagliolo/" target="_blank">
    👉 Ver en GitHub Pages
  </a>
</p>

###

<h2 align="left">📖 Manual de usuario</h2>

###

<p align="left">
  1️⃣ <strong>Elegí un formato</strong> — hacé clic en <code>HSL</code> o <code>HEX</code> según el formato de color que necesites.<br><br>
  2️⃣ <strong>Elegí la cantidad de colores</strong> — seleccioná 6, 8 o 9 colores desde el menú desplegable.<br><br>
  3️⃣ <strong>Generá tu paleta</strong> — apretá el botón <code>Generar Paleta</code>. Cada vez que lo apretás se genera una paleta nueva.<br><br>
  4️⃣ <strong>Copiá un color</strong> — hacé clic sobre cualquier tarjeta de color para copiar su código al portapapeles.<br><br>
  5️⃣ <strong>Bloqueá colores</strong> — usá el 🔓 en cada tarjeta para bloquear un color. Los colores bloqueados no cambian al generar una nueva paleta.<br><br>
  6️⃣ <strong>Guardá paletas favoritas</strong> — apretá <code>Guardar Paleta</code> para guardar la paleta actual. Podés guardar hasta 2 paletas. Se mantienen guardadas aunque cierres el navegador.<br><br>
  7️⃣ <strong>Borrá paletas guardadas</strong> — apretá <code>Borrar</code> en cualquier paleta guardada para eliminarla.
</p>

###

<h2 align="left">⚙️ Decisiones técnicas</h2>

###

<p align="left">
  <strong>Formato de colores</strong><br>
  Los colores HSL se generan con rangos controlados de saturación (60–100%) y luminosidad (35–65%) para evitar colores demasiado apagados u oscuros. Los colores HEX se generan de forma aleatoria con caracteres del 0 al F.<br><br>

  <strong>Separación entre generar y mostrar</strong><br>
  Se separó la lógica en dos funciones: <code>generarPaleta()</code> que crea los colores y los guarda en el array <code>paletaActual</code>, y <code>mostrarPaleta()</code> que dibuja las tarjetas en pantalla. Esto permite cambiar el formato sin regenerar colores.<br><br>

  <strong>Estructura de datos</strong><br>
  Cada color se guarda como un objeto <code>{ color, bloqueado }</code> en el array <code>paletaActual</code>. Esto permite conservar el estado de bloqueo entre generaciones.<br><br>

  <strong>Bloqueo de colores</strong><br>
  Al generar una nueva paleta, <code>generarPaleta()</code> revisa si cada posición tiene un color bloqueado. Si lo tiene, conserva el objeto entero. Si no, genera uno nuevo.<br><br>

  <strong>localStorage</strong><br>
  Las paletas guardadas se serializan con <code>JSON.stringify()</code> antes de guardarlas y se deserializan con <code>JSON.parse()</code> al leerlas. Esto permite persistir los datos entre sesiones.<br><br>

  <strong>Diseño responsive</strong><br>
  Se usaron media queries para adaptar el layout a tablet (hasta 768px) y móvil (hasta 600px). En móvil las tarjetas se achican y los controles se reorganizan con <code>flex-wrap</code>.<br><br>

  <strong>Microfeedback</strong><br>
  Se implementó un sistema de toast para confirmar acciones (copiar, guardar, borrar) y tooltips nativos con el atributo <code>title</code> en los botones.
</p>

###

<h2 align="left">💻 Ejecutar localmente</h2>

###

<p align="left">
  <strong>Opción A — Sin usar Git (más fácil)</strong><br><br>
  1. Andá al repositorio en GitHub.<br>
  [CAPTURA — botón verde "Code" en el repositorio]<br><br>
  2. Hacé clic en el botón verde que dice <code>Code</code>.<br><br>
  3. Seleccioná <code>Download ZIP</code>.<br>
  [CAPTURA — menú desplegable con la opción Download ZIP]<br><br>
  4. Descomprimí el archivo ZIP en tu computadora.<br><br>
  5. Abrí la carpeta y hacé doble clic en <code>index.html</code>.<br><br>
  ✅ El proyecto se abre directo en tu navegador. No necesitás instalar nada.<br><br>

  <strong>Opción B — Usando Git</strong><br><br>
  1. Asegurate de tener <a href="https://git-scm.com/downloads" target="_blank">Git instalado</a>.<br><br>
  2. Abrí una terminal (en Windows: click derecho → "Abrir en Terminal" o buscá "cmd").<br><br>
  3. Escribí este comando y apretá Enter:<br>
  <code>git clone https://github.com/joacomgl/proyectom1_joaquinmagliolo.git</code><br><br>
  4. Entrá a la carpeta del proyecto:<br>
  <code>cd proyectom1_joaquinmagliolo</code><br><br>
  5. Abrí el archivo <code>index.html</code> en tu navegador.<br><br>
  ✅ Listo, el proyecto corre de forma local.
</p>

###

<h2 align="left">🌐 Desplegar en GitHub Pages</h2>

###

<p align="left">
  1. Subí el proyecto a un repositorio de GitHub.<br><br>
  2. Andá a <strong>Settings → Pages</strong> en tu repositorio.<br><br>
  3. En <strong>Source</strong> seleccioná la rama <code>main</code> y la carpeta <code>/ (root)</code>.<br><br>
  4. Apretá <strong>Save</strong>. GitHub Pages va a generar el link automáticamente en unos segundos.<br><br>
  [CAPTURA — pantalla de configuración de GitHub Pages]
</p>

###
