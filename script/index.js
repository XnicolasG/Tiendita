const prod1 = 'http://localhost:4000/productos/';
const prod2 = 'http://localhost:4001/productos2/';

const main = document.getElementById('main');
const section = document.getElementById('section');
const modalCar = document.getElementById('body');
const modalProd = document.getElementById('productosM');




// ========Consumiendo api productos1
const getInfo = async () => {
    const resp = await fetch(prod1);
    const info = await resp.json();
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
    getInfo2();
}

// ==========Consumiendo Api Productos2
const getInfo2 = async () => {
    const resp = await fetch(prod2);
    const info = await resp.json();
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


main.addEventListener('click', async (e) =>{

       
    if(e.target.classList.contains('btnA')){
        const idx = e.target.id;
        
        let res = await fetch (prod1 + idx)
        let data = await res.json();
        console.log(data)
        
        let {nombre, img, precioUno, id} = data
            
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
            <input id="cantidad" type="number" value="250" readonly>
            <button id="aumentar" class="btn cant" ">+</button>
        </div>
        <a id="${id} " class="btn irCarrito" href="">Agregar</a>
    </div>
            `   
           
    
    }
    const btnMas = document.getElementById('aumentar');
const btnMenos = document.getElementById('disminuir');
const inputCant = document.getElementById('cantidad');

btnMas.addEventListener('click', () =>{
    inputCant.value = parseInt(inputCant.value) + 250;
})
btnMenos.addEventListener('click', () =>{
    inputCant.value = parseInt(inputCant.value) - 250;
    if(inputCant.value <= 0){
        inputCant.value = 0;
    }

})

});



section.addEventListener('click', async (e) =>{

       
        if(e.target.classList.contains('btnA')){
            const idx = e.target.id;
            
        let res = await fetch (`${prod2}${idx}`)
        let data = await res.json();
        
        let {nombre,precio, img, gramo, id} = data
        
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
            <input id="cantidad" type="number" value="1" readonly>
            <button id="aumentar" class="btn cant" ">+</button>
        </div>
            <a id="${id}" class="btn irCarrito" href="">Agregar</a>
        </div>
                ` 
    }
    const btnMas = document.getElementById('aumentar');
const btnMenos = document.getElementById('disminuir');
const inputCant = document.getElementById('cantidad');

btnMas.addEventListener('click', () =>{
    inputCant.value = parseInt(inputCant.value) + 1;
})
btnMenos.addEventListener('click', () =>{
    inputCant.value = parseInt(inputCant.value) - 1;
    if(inputCant.value <= 0){
        inputCant.value = 0;
    }

})
})


document.addEventListener('DOMContentLoaded', getInfo)