function Remover() {
  // Obtengo todos (ALL) los productos si hay
  const productosEnPantalla = document.querySelectorAll(".result-item");

  // Si no hay ninguno, no devuelvo nada
  if (productosEnPantalla.length == 0) {
    return;
  }

  // Si hay, los borro
  productosEnPantalla.forEach((carta) => carta.remove());
}

function mostrarResultados(results) {
  const contenedor = document.querySelector(".results"); //Etiqueta "results" que si es visible
  const template = document.querySelector("#result-item-template"); //invoco al template
  const resultadosH3 = document.querySelector(".resultados-texto"); //invoco a los RESULTADOS totales

  Remover(); //remuevo elementos buscados si los hay

  results.forEach((element) => {
    //itero con un foreach a los resultados que me entrega la API
    const titleElement = template.content.querySelector(".result-item-title"); //invoco al title del template
    titleElement.textContent = element.title; //Le cambio el title al template por el title que me entrega la api

    const conditionElement = template.content.querySelector(
      //invoco a la condicion del item
      ".result-item-condition"
    );
    conditionElement.textContent = element.condition; //Le sobreescribo la condicion que me entrega la API

    const linkRef = template.content.querySelector(".link-prod"); //invoco al link del item
    linkRef.href = element.permalink; //Le sobreescribo el link

    const priceElement = template.content.querySelector(".result-item-price"); //invoco a la etiqueta price
    priceElement.textContent = "$" + element.price; //le sobreescribo el precio que me entrega la API

    const cantidadVendidosElement = template.content.querySelector(
      //invoco a la etiqueta cantidad de elementos vendidos
      ".result-item-sell-count-number"
    );
    cantidadVendidosElement.textContent = element.sold_quantity; //le sobreescribo a la cantidad que me entrega la API

    const imgElement = template.content.querySelector(".result-img"); //invoco a la imagen
    imgElement.src = element.thumbnail; //sobreescribo la imagen default por la que me entrega la API

    const resultadosElement = resultadosH3.querySelector(".result-count"); // invoco a los resultados totales
    resultadosElement.textContent = results.length; // muestro la cantidad de resultados totales que me entregó la API

    const clone = document.importNode(template.content, true); //Creo un clon del template para luego introducirlo al contenedor que es la etiqueta results
    contenedor.appendChild(clone); //Introduzco la info del template al contenedor visible, creando la "CARTA" con la info que me dió la API
  });
}

function main() {
  const myFormEl = document.querySelector(".mi-form");
  myFormEl.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const palabraABuscar = evento.target.producto.value; //Recibo la palabra que escriba en el buscador

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then(function (res) {
        return res.json(); //entrega otra promesa
      })
      .then(function (data) {
        mostrarResultados(data.results); //le paso la los resultados de la data que me da ML a la funcion "mostrarResultados"
      });
  });
}

//EJECUTO el main
main();
