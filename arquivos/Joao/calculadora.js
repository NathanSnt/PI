function soma(){

   let n1 = document.getElementById('n1').value
   let n2 = document.getElementById('n2').value
   let resultado = document.getElementById('resultado').innerHTML =  parseInt(n1) + parseInt(n2)
}


let paragrafo = document.createElement("p")

paragrafo.innerText = "Segunda tem jogo"

//<p> Segunda tem jogo </p>

document.body.appendChild(paragrafo)


function minhaFuncao(){

document.getElementById('minhaDiv').classList.add('classe1','classe2','classe3')

}
function removerFuncao(){
   document.getElementById('minhaDiv').classList.remove('classe1','classe2','classe3')
}


function fundoAzul(){
   document.getElementById('texto').classList.add('classeblu')
}
function fundored(){
   document.getElementById('texto').classList.add('classered')
}
function removertudo(){
   document.getElementById('texto').classList.remove('classered','classeblu')
}
