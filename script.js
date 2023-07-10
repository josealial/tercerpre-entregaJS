let pasajes = [
  { id: 1, destino: "BARCELONA", precio: 1249, categoria: "EUROPA", asientosDisponibles: 34, rutaImagen: "BARCELONA.jpg" },
  { id: 2, destino: "PARIS", precio: 1430, categoria: "EUROPA", asientosDisponibles: 24, rutaImagen: "PARIS.jpg" },
  { id: 3, destino: "LISBOA", precio: 1590, categoria: "EUROPA", asientosDisponibles: 18, rutaImagen: "LISBOA.jpg" },
  { id: 4, destino: "VENECIA", precio: 1730, categoria: "EUROPA", asientosDisponibles: 3, rutaImagen: "VENECIA.jpg" },
  { id: 5, destino: "LONDRES", precio: 1350, categoria: "EUROPA", asientosDisponibles: 29, rutaImagen: "LONDRES.jpg" },
  { id: 6, destino: "BANGKOK", precio: 2470, categoria: "ASIA", asientosDisponibles: 5, rutaImagen: "BANGKOK.jpg" },
  { id: 7, destino: "TOKIO", precio: 2380, categoria: "ASIA", asientosDisponibles: 15, rutaImagen: "TOKIO.jpg" },
  { id: 8, destino: "DUBAI", precio: 2000, categoria: "ASIA", asientosDisponibles: 7, rutaImagen: "DUBAI.jpg" },
  { id: 9, destino: "TORONTO", precio: 1036, categoria: "AMERICA", asientosDisponibles: 23, rutaImagen: "TORONTO.jpg" },
  { id: 10, destino: "CALIFORNIA", precio: 1363, categoria: "AMERICA", asientosDisponibles: 15, rutaImagen: "CALIFORNIA.jpg" },
]


let contenedor = document.getElementById("destinos")
let btnVerCarrito = document.getElementById("btnVerCarrito")
let carritoContainer = document.getElementById("carritoContainer")
let carritoLabel = document.getElementById("carritoLabel")
let totalLabel = document.getElementById("totalLabel")
let btnsFiltrarCategoria = document.getElementsByClassName("btnFiltrarCategoria")


let carrito = []


crearTarjetas(pasajes)


//BOTONES FILTRO
Array.from(btnsFiltrarCategoria).forEach((btn) => {
  btn.addEventListener("click", filtrarPorCategoria)
})

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrar)

function filtrar() {
  let busqueda = buscador.value.toUpperCase()
  let arrayFiltrado = pasajes.filter(producto => producto.destino.includes(busqueda) || producto.categoria.includes(busqueda))
  crearTarjetas(arrayFiltrado)
}

function crearTarjetas(pasajes) {
  contenedor.innerHTML = ""
  pasajes.forEach((pasaje) => {
    let tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.innerHTML = `
        <h4>${pasaje.destino}</h4>
        <div class=image style="background-image: url(../image/${pasaje.rutaImagen})"></div>
        <p>Precio: $${pasaje.precio}</p>
        <p>Categoría: ${pasaje.categoria}</p>
        <p>Asientos Disponibles: ${pasaje.asientosDisponibles}</p>
        <button class="btnAgregarCarrito"
        data-id="${pasaje.id}">Agregar al Carrito</button>
      `
    contenedor.appendChild(tarjeta)
  })

  let btnsAgregarCarrito = document.getElementsByClassName("btnAgregarCarrito")
  Array.from(btnsAgregarCarrito).forEach((btn) => {
    btn.addEventListener("click", agregarAlCarrito)
  })
}

function agregarAlCarrito(event) {
  let pasajeId = parseInt(event.target.getAttribute("data-id"))
  let pasaje = pasajes.find((e) => e.id === pasajeId)

  if (pasaje) {
    carrito.push(pasaje)
    actualizarCarrito()
  }
}

btnVerCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
  let carritoHTML = ""
  let total = 0
  carrito.forEach((pasaje) => {
    carritoHTML += `<p>${pasaje.destino} - $${pasaje.precio}</p>`
    total += pasaje.precio
  })
  carritoLabel.innerHTML = carritoHTML
  totalLabel.innerHTML = `Total: $USD${total}`
}

function actualizarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function filtrarPorCategoria(event) {
  let categoria = event.target.getAttribute("data-categoria")

  if (categoria === "todos") {
    crearTarjetas(pasajes)
  } else {
    let arrayFiltrado = pasajes.filter((pasaje) => pasaje.categoria === categoria)
    crearTarjetas(arrayFiltrado)
  }
}

