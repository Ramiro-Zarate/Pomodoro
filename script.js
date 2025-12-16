let button = document.querySelector('#button');
let timer = document.querySelector('.tiempo');
let barraProgreso = document.querySelectorAll('.progreso')
let contador = 0


let estaCorriendo = false //para configurar el boton inicio
let intervalo = null

let tiempoRestante = 25*60 //pasa los minutos a segundos
let descanosCorto = 5*60
let estado = 'trabajo'

const contadorActualizado = (tiempo)=>{
    const minutos = Math.floor(tiempo/60);
    const segundos = tiempo % 60;
    timer.textContent = `${minutos}:${segundos}`
}


const inicio = () =>{
    estaCorriendo = true
    button.textContent = 'PAUSE'
    button.style.backgroundColor = 'var(--btn-active)';
    intervalo = setInterval(()=>{
        if (estado == 'trabajo'){
            timer.style.backgroundColor = 'var(--tm-color)'
            tiempoRestante--;
            contadorActualizado(tiempoRestante);
            if (tiempoRestante === 0){
                if (contador<barraProgreso.length){
                    barraProgreso[contador].classList.add('completado');
                }
                contador++;
                alert('Descansa!');
                estado = 'descanso'
        }
        }else{
            if (estado == 'descanso'){
                timer.style.backgroundColor = 'var(--bg-descanso)'
                descanosCorto--;
                contadorActualizado(descanosCorto);
                if (descanosCorto == 0){
                    pausa();
                    estado = 'trabajo';
                    alert('A trabajar!');
                    tiempoRestante = 25 * 60;
                    descanosCorto = 5 * 60;
                    contadorActualizado(tiempoRestante);
                }
            }
        }    
    }, 1000)
    }


const pausa = ()=>{
    estaCorriendo = false
    clearInterval(intervalo)
    button.textContent = 'START'
    button.style.backgroundColor = 'var(--btn-color)';
}

const verificarEstado=()=>{
    if (estaCorriendo){
        pausa()
    }else{
        inicio()
    }
}

button.addEventListener("click", verificarEstado);