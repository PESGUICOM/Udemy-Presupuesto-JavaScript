const ingresos = [
    new Ingreso("Salario", 900000.00),
    new Ingreso("Sueldo", 300000),
];

const egresos = [
    new Egreso("Tarjetas", 250000),
    new Egreso("Impuestos", 51000),
];

//LLamando a las funciones
let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngreso = () =>{
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () =>{
    let totalEgresos = 0;
    for (let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}
let cargarCabecero = () => {
    let presupueso = totalIngreso() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/ totalIngreso();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupueso);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngreso());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

//para cambiar el idioma, el país, la moneda
const formatoMoneda = (valor) => {
     return valor.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US",{style: "percent", minimumFractionDigits:2});
}

//Función cargar Ingresos
const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                              <ion-icon name="close-circle-outline"
                              onclick="eliminarIngreso(${ingreso.id})"></ion-icon> 
                            </button>
                        </div>
                    </div>
                </div>`;
    return ingresosHTML;
}
//Creando el método o función eliminar ingreso
//con findIndex busca el elemento(id) que estamos buscando para recuperar el arreglo (array)
//con splice indicamos cuántos elementos eliminar (indiceEliminar, 1)
const eliminarIngreso = (id) => {
     let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
     ingresos.splice(indiceEliminar, 1);
     cargarCabecero();
     cargarIngresos();
}

//Función cargar Egresos
const cargarEgresos = () => {
    let egresosHTML = "";
    for (let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresosHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor"> ${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
    return egresosHTML;
}

//Creando el método o función eliminar egreso
const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if (descripcion.value !== "" && valor.value !== ""){
        if (tipo.value === "ingreso"){
              ingresos.push(new Ingreso (descripcion.value, Number(valor.value)));//+valor.value
              cargarCabecero();
              cargarIngresos();
        } else if (tipo.value === "egreso") {
              egresos.push(new Egreso(descripcion.value, +valor.value));
              //agregar un +valor.value para convertir una posible cadena(string) en números o numéricos
              cargarCabecero();
              cargarEgresos();
        }  
    }
}