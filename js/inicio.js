// JavaScript de la página Inicio. No requiere librerías ni instalación.
"use strict";

const paginaInicio = document.querySelector(".cb-inicio");

if (paginaInicio) {
  paginaInicio.classList.add("cb-js");

  // 1. Abrir y cerrar el menú en celulares.
  const botonMenu = paginaInicio.querySelector(".cb-menu");
  const navegacion = paginaInicio.querySelector(".cb-nav");
  botonMenu.hidden = false;

  function cerrarMenu() {
    navegacion.classList.remove("cb-nav-abierta");
    botonMenu.setAttribute("aria-expanded", "false");
  }

  botonMenu.addEventListener("click", () => {
    const abierto = navegacion.classList.toggle("cb-nav-abierta");
    botonMenu.setAttribute("aria-expanded", String(abierto));
  });

  navegacion.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) cerrarMenu();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && navegacion.classList.contains("cb-nav-abierta")) {
      cerrarMenu();
      botonMenu.focus();
    }
  });

  // 2. Mostrar las tarjetas que coinciden con la categoría elegida.
  const filtros = paginaInicio.querySelector(".cb-filtros");
  const botonesFiltro = filtros.querySelectorAll(".cb-filtro");
  const tarjetas = paginaInicio.querySelectorAll(".cb-tarjeta");
  const resultado = paginaInicio.querySelector("#resultado-filtro");
  filtros.hidden = false;

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      const categoriaElegida = boton.dataset.filtro;
      let cantidad = 0;

      botonesFiltro.forEach((otroBoton) => {
        otroBoton.setAttribute("aria-pressed", String(otroBoton === boton));
      });

      tarjetas.forEach((tarjeta) => {
        const coincide = categoriaElegida === "todos" || tarjeta.dataset.categoria === categoriaElegida;
        tarjeta.hidden = !coincide;
        if (coincide) cantidad++;
      });

      resultado.textContent = cantidad === 1 ? "Se muestra 1 categoría." : `Se muestran ${cantidad} categorías.`;
    });
  });
}
