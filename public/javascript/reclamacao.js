
document.querySelector('#radio-estacao').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_estacao_especifica.style.display = 'block';
    document.querySelector("#radioEstacao").classList.toggle('selecionado')
    div_linha_geral.style.display = 'none';
    document.querySelector("#radioLinha").classList.remove('selecionado')
    div_carro_especifico.style.display = 'none';
    document.querySelector("#radioCarro").classList.remove('selecionado')
    console.log("estação específica selecionado")
});

document.querySelector('#radio-carro').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_carro_especifico.style.display = 'block';
    document.querySelector("#radioCarro").classList.add('selecionado')
    div_linha_geral.style.display = 'none';
    document.querySelector("#radioLinha").classList.remove('selecionado')
    div_estacao_especifica.style.display = 'none';
    document.querySelector("#radioEstacao").classList.remove('selecionado')
    console.log("Carro específico selecionado")
});

document.querySelector('#radio-linha').addEventListener('change', () => {
    let div_linha_geral = document.querySelector('#linha-geral');
    let div_estacao_especifica = document.querySelector('#estacao-especifica');
    let div_carro_especifico = document.querySelector('#carro-especifico');
    div_linha_geral.style.display = 'block';
    document.querySelector("#radioLinha").classList.toggle('selecionado')
    div_estacao_especifica.style.display = 'none';
    document.querySelector("#radioEstacao").classList.remove('selecionado')
    div_carro_especifico.style.display = 'none';
    document.querySelector("#radioCarro").classList.remove('selecionado')
    console.log("Linha em geral selecionado")
});