import { getData } from './get.js'

const prod1 = 'http://localhost:4000/productos/';
const prod2 = 'http://localhost:4001/productos2/';

const main = document.getElementById('main');
const section = document.getElementById('section');
const modalCar = document.getElementById('cont-carrito');
const detalle = document.getElementById('body2')
const modalProd = document.getElementById('productosM');
const carrito = document.getElementById('btnCar')




// ========Consumiendo api productos1
const getInfo = async () => {
    const resp = await fetch(prod1);
    const info = await resp.json();

    // ======Destructuración de array por medio de forEach
    info.forEach(prod => {
        const { id, nombre, precioUno, precioDos, img, descuento } = prod;
        main.innerHTML += `
        
        <div id="cards">
            <div id="dcto"><p>${descuento}</p> </div>
            <img src="${img}" id="foto" alt="tiendita" title="${nombre}">
            <h5><span id="precio">$ ${precioUno}/kg </span><span id="orig">$ ${precioDos}/kg</span></h5>
            <p id="nameP">${nombre}</p>
            <a id ="btnX" href="#popup2"><button  id="${id}" class="btnA" type="button">Agregar</button></a>
        </div>
        `
    });
    // ====Activar getInfo2()
    getInfo2();
}

// ==========Consumiendo Api Productos2
const getInfo2 = async () => {
    const resp = await fetch(prod2);
    const info = await resp.json();

    // ======Destructuración de array por medio de forEach
    info.forEach(prod => {
        const { id, nombre, precio, img, gramo } = prod;
        section.innerHTML += `
        <div id="cards2">     
        <img src="${img}" id="foto" alt="tiendita" title="${nombre}">
        <h5 id="precio">$ ${precio}</h5>
        <p id="nameP">${nombre}</p>
        <div id="gramo"><p>${gramo}</p> </div>
        <a id ="btnX" href="#popup2"><button id="${id}"  class="btnA" type="button">Agregar</button></a>
    </div>
        `

    });
}


let productosCarrito = [];

// ===========Generando evento click
main.addEventListener('click', async (e) => {

    // encontrar elemento que tenga clase btnA
    if (e.target.classList.contains('btnA')) {

        // Atrapando el id del elemento
        const idx = e.target.id;

        // ==== agregando id al link de localhost para obtener info de un producto en especifico
        let res = await fetch(prod1 + idx)
        let data = await res.json();
        console.log(data)

        // ====Destructuración directa de objeto
        let { nombre, img, precioUno, id, cantidad } = data

        modalProd.innerHTML = `
    <div id="modalImg"><img src=${img} alt=""></div>
    <div id="modalInfo">
        <h2>${nombre}</h2>
        <h3>${precioUno}</h3>
        <p id="iva">Precios con IVA incluido</p>
        <p id="peso">Peso aproximado por pieza, puede variar de acuerdo al peso real</p>
        
            <h5 id="madurez">Selecciona la madurez que deseas</h5>
            <div id="cont-select">
            <select name="elegir" id="select">
                <option value="">Maduro (para hoy)</option>
                <option value="">Normal (3-5 días)</option>
                <option value="">Verde (7 días)</option>
            </select>
            </div>
            <p>La cantidad esta representada gramos (gr) </p>
        <div id="cant">
            <button id="disminuir" class="btn cant" ">-</button>
            <input id="cantidad" type="number" value="${cantidad}" readonly>
            <button id="aumentar" class="btn cant" ">+</button>
        </div>
        <a id="${id} " class="btn irCarrito">Agregar</a>
    </div>
            `


    }
    // ====== Formula para sumar y restar cantidades
    const btnMas = document.getElementById('aumentar');
    const btnMenos = document.getElementById('disminuir');
    const inputCant = document.getElementById('cantidad');



    btnMas.addEventListener('click', () => {
        inputCant.value = parseInt(inputCant.value) + 250;
    })

    btnMenos.addEventListener('click', () => {
        inputCant.value = parseInt(inputCant.value) - 250;
        if (inputCant.value <= 0) {
            inputCant.value = 0;
        }

    })


    detalle.addEventListener('click', async (e) => {
        const botonIr = e.target.classList.contains('irCarrito');
        let idA = e.target.id;
        if (botonIr) {
            const produ = await getData(prod1);
            const object = await produ.find(item => item.id === Number(idA))

            let {img, nombre, precioUno, id, cantidad} = object


            agregarDatos(id, img, nombre, precioUno, cantidad);

            localStorage.setItem('Carrito', JSON.stringify(productosCarrito))

        }
    })

});



// ===========Generando evento click
section.addEventListener('click', async (e) => {

    // encontrar elemento que tenga clase btnA
    if (e.target.classList.contains('btnA')) {

        // Atrapando el id del elemento
        const idx = e.target.id;

        // ==== agregando id al link de localhost para obtener info de un producto en especifico
        let res = await fetch(prod2 + idx)
        let data = await res.json();

        // ====Destructuración directa de objeto
        let { nombre, precio, img, gramo, id, cantidad } = data
        console.log(data);
        modalProd.innerHTML = `
        <div id="modalImg"><img src=${img} alt=""></div>
        <div id="modalInfo">
            <h2>${nombre}</h2>
            <h3>${precio}</h3>
            <p id="iva">Precios con IVA incluido</p>
            <p>Actualmente el precio por gramo/unidad es de ${gramo} </p>
            <p>La cantidad esta representada en numero de unidades </p>
            <div id="cant">
            <button id="disminuir" class="btn cant" ">-</button>
            <input id="cantidad" type="number" value="${cantidad}" readonly>
            <button id="aumentar" class="btn cant" ">+</button>
        </div>
            <a id="${id}" class="irCarrito btn" >Agregar</a>
        </div>
                `
    }



    // ====== Formula para sumar y restar cantidades
    const btnMas = document.getElementById('aumentar');
    const btnMenos = document.getElementById('disminuir');
    const inputCant = document.getElementById('cantidad');

    btnMas.addEventListener('click', () => {
        inputCant.value = parseInt(inputCant.value) + 1;
    })
    btnMenos.addEventListener('click', () => {
        inputCant.value = parseInt(inputCant.value) - 1;
        if (inputCant.value <= 0) {
            inputCant.value = 0;
        }
        console.log(cantidad);

    });
    detalle.addEventListener('click', async (e) => {
        const botonIr = e.target.classList.contains('irCarrito');
        let idA = e.target.id;
        if (botonIr) {
            const produ = await getData(prod2);
            const object = await produ.find(item => item.id === Number(idA))
            let { id, img, nombre, precio, cantidad } = object


            agregarDatos2(id, img, nombre, precio, cantidad);
            localStorage.setItem('Carrito', JSON.stringify(productosCarrito))
        }
    })
})


// Agregando a Array productosCarrito para productos de archivo productos1.json
const agregarDatos = (id, img, nombre, precioUno, cantidad) => {

    const existeProducto = productosCarrito.find(producto => producto.id === id);
    if (existeProducto) {
        return
    } else {
        productosCarrito.unshift({
            id: id,
            image: img,
            name: nombre,
            price: precioUno,
            quantity: cantidad

        })
    }
}
// Agregando a Array productosCarrito para productos de archivo productos2.json
const agregarDatos2 = (id, img, nombre, precio, cantidad) => {

    const existeProducto = productosCarrito.find(producto => producto.id === id);
    if (existeProducto) {
        return
    } else {
        productosCarrito.unshift({
            id: id,
            image: img,
            name: nombre,
            price: precio,
            quantity: cantidad

        })
    }

}

let coleccion = [];

const getLocal = () => {
    const print = JSON.parse(localStorage.getItem('Carrito'));
    print.forEach(element => {
        const { id, image, name, price } = element
        coleccion.push({
            id: id,
            image: image,
            name: name,
            price: price
        })

        traerCol(id, image, name, price);
    });
    
}
    const traerCol = (id, image, name, price) =>{

        if(coleccion.hasOwnProperty(id)){
            return
        }else{
                modalCar.innerHTML += `
            <li class="card" style="width: 18rem;">
                <div class="card-body">
                <img src=${image} class="card-img-top" style="width: 30%;" alt="...">
                <h5 class="card-title">${name}</h5>
         
                <h5 class="card-title">USD$ ${price}</h5>
                <a href="#" class="btn btn-outline-dark" style="background-color: #FFFF;">Return</a>
                </div>
            </li>
            `
        }
        }
    // }




carrito.addEventListener('click', () => {
    getLocal();
})

// ======Evento DOMContentLoaded para activar getInfo
document.addEventListener('DOMContentLoaded', getInfo)
