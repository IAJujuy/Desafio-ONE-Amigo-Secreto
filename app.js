/*
  Amigo Secreto – Lógica en JavaScript
  Compatible con index.html del reto (ids: #amigo, #listaAmigos, #resultado)
  Funciones expuestas para los botones del HTML: agregarAmigo() y sortearAmigo()
*/

// ---- Estado de la aplicación ----
const amigos = []; // Aquí guardamos los nombres agregados por el usuario

// ---- Referencias a elementos del DOM (la "maqueta" en el HTML) ----
const inputNombre = document.getElementById('amigo');
const listaAmigosEl = document.getElementById('listaAmigos');
const resultadoEl = document.getElementById('resultado');

// ---- Funciones de utilidad ----
/** Limpia el listado del resultado del sorteo */
function limpiarResultado() {
  resultadoEl.innerHTML = '';
}

/**
 * Vuelve a dibujar (renderiza) la lista visible de amigos.
 * No escribimos HTML a mano como string para evitar errores; 
 * creamos <li> con createElement y asignamos textContent.
 */
function renderLista() {
  listaAmigosEl.innerHTML = '';
  amigos.forEach((nombre, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${nombre}`;
    listaAmigosEl.appendChild(li);
  });
}

// ---- Acciones invocadas por los botones del HTML ----
/**
 * Lee el nombre del input, valida y lo agrega al array "amigos".
 * Luego vuelve a dibujar la lista y limpia el resultado de sorteo anterior.
 */
function agregarAmigo() {
  const nombre = inputNombre.value.trim();

  // Validación de campo vacío
  if (!nombre) {
    alert('Por favor, escribe un nombre válido.');
    inputNombre.focus();
    return;
  }

  // Validación de duplicados (opcional, mejora UX)
  if (amigos.includes(nombre)) {
    alert('Ese nombre ya está en la lista.');
    inputNombre.select();
    return;
  }

  amigos.push(nombre);
  renderLista();
  limpiarResultado();

  // Deja listo el input para cargar el próximo nombre
  inputNombre.value = '';
  inputNombre.focus();
}

/**
 * Elige un nombre al azar dentro del array "amigos" y lo muestra en #resultado.
 */
function sortearAmigo() {
  limpiarResultado();

  if (amigos.length === 0) {
    alert('Primero agrega al menos un nombre.');
    inputNombre.focus();
    return;
  }

  const indice = Math.floor(Math.random() * amigos.length);
  const ganador = amigos[indice];

  const li = document.createElement('li');
  li.textContent = `🎉 Amigo secreto: ${ganador}`;
  resultadoEl.appendChild(li);
}

// ---- Pequeñas mejoras de usabilidad ----
// Permite presionar Enter en el input para agregar rápidamente.
if (inputNombre) {
  inputNombre.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      agregarAmigo();
    }
  });
}
