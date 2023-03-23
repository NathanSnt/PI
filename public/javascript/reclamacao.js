// let radio_estacao = document.querySelector('#radio-estacao');
// let radio_carro = document.querySelector('#radio-carro');
// let radio_linha = document.querySelector('#radio-linha');
// let div_linha_geral = document.querySelector('#linha-geral');
// let div_estacao_especifica = document.querySelector('#estacao-especifica');
// let div_carro_especifico = document.querySelector('#carro-especifico');

// radio_estacao.addEventListener('change', () => {
document.querySelector('#radio-estacao').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_estacao_especifica.style.display = 'block';
    div_linha_geral.style.display = 'none';
    div_carro_especifico.style.display = 'none';
    console.log("estação específica selecionado")
});

// radio_carro.addEventListener('change', () => {
document.querySelector('#radio-carro').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_carro_especifico.style.display = 'block';
    div_linha_geral.style.display = 'none';
    div_estacao_especifica.style.display = 'none';
    console.log("Carro específico selecionado")
});

// radio_linha.addEventListener('change', () => {
document.querySelector('#radio-linha').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_linha_geral.style.display = 'block';
    div_estacao_especifica.style.display = 'none';
    div_carro_especifico.style.display = 'none';
    console.log("Linha em geral selecionado")
});