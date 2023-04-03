/*                  Moedas                */
const saida_saidaDolar = document.querySelector('.dolar');
const saida_euro = document.querySelector('.euro');
const saida_ibovespa = document.querySelector('.ibovespa');
const saida_bitcoin = document.querySelector('.bitcoin');
/*                  Input                */
const salarioBruto = document.querySelector('#valorSalario');
const descontos = document.querySelector('#valorDescontos');
const dependetes = document.querySelector('#valorDependetes');
const btnSalario = document.querySelector('#btnSLiquido');
/*                  Saida-tabela                */
const saidaSalarioBru = document.querySelector('#salarioBruto');
const innsPorc = document.querySelector('#saida-inss');
const valorInss = document.querySelector('#saida-valor-inss');
const valorDesconto = document.querySelector('#desconto');
const saidaIrrfPorc = document.querySelector('#porcentagemIrrf');
const saidaIrrfValor = document.querySelector('#valorIrrf');
const saidaSalarioLiq = document.querySelector('#sLiquido');
const saidaPensao = document.querySelector('#saida-pensao');
const totalDesconto = document.querySelector('#total');

btnSalario.addEventListener('click', (e) => {
    
    if(!salarioBruto.value){
         alert('Preencha com o Sálario') 
         return;
    } 
    
    
    
    
    let salarioB = parseInt(salarioBruto.value.split(",")[0].replace(/\D/g,""));
    let desconto = Number(descontos.value.split(",")[0].replace(/\D/g,""));
    let pensao = Number(dependetes.value.split(",")[0].replace(/\D/g,""));

    const inss = calculoInss(salarioB, pensao, desconto);
    const irrf = calculoIrrf(salarioB, inss);
    const totalDesc = calculoDescontos(inss, irrf, desconto, pensao);
    const salarioLiquido = calculoSalario(inss, irrf, pensao, desconto, salarioB);
    
    
    formatar(salarioB, desconto, pensao, inss, irrf, salarioLiquido, totalDesc);
    
    salarioBruto.value = '';
    descontos.value = '';
    dependetes.value = '';
    
});

function calculoDescontos(inss, irrf, desconto, pensao){
    return inss + irrf + desconto + pensao;
}


function formatar(salarioB, desconto, pensao = 0.0, inss = 0.0, irrf = 0, salarioLiquido, totalDesc) {
    
    const salarioBruto = salarioB.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const desc = desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const pen = pensao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const ins = inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const irr = irrf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const salarioL = salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const total = totalDesc.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    
    saidaValores(salarioBruto, desc, pen, ins, irr, salarioL, total);
    
}

function saidaValores(salarioBruto, desconto, pensao, inss, irrf, salarioLiquido, total){
    saidaSalarioBru.innerHTML = salarioBruto;
    valorDesconto.innerHTML = desconto;
    valorInss.innerHTML = inss;
    saidaPensao.innerHTML = pensao;
    saidaIrrfValor.innerHTML = irrf;
    saidaSalarioLiq.innerHTML = salarioLiquido;
    totalDesconto.innerHTML = total;
}

function calculoSalario(inss, irrf, pensao = 0.0, desconto = 0.0, salario) {
    const salarioLiquido = ((salario - inss) - pensao) - desconto;

    return salarioLiquido;
}

function calculoIrrf(salario, inss) {

    console.log(salario)

    if (salario <= 1903.98) {
        saidaIrrfPorc.innerHTML = '0%';
        return 0;
    }

    if (salario <= 2826,65) {
        saidaIrrfPorc.innerHTML = '7.5%';
        return inss - 142.8;
    }

    if (salario <= 3751.05) {
        saidaIrrfPorc.innerHTML = '15%';
        return inss - 354.80;
    }

    if (salario <= 4664.68) {
        saidaIrrfPorc.innerHTML = '22.5%';
        return inss - 636.13;
    }

    saidaIrrfPorc.innerHTML = 'Teto - 27.5%';
    return inss - 869.36;
    
}

function calculoInss(salario) {

    if (salario <= 1302) {
        innsPorc.innerHTML = '7.5%'
        return salario * 7.5 / 100;
    }

    if (salario <= 2571.29) {
        innsPorc.innerHTML = '9%'
        return salario * 9 / 100;
    }

    if (salario <= 3856.94) {
        innsPorc.innerHTML = '12%'
        return salario * 12 / 100;
    }

    if (salario <= 4664.68) {
        innsPorc.innerHTML = '14%'
        return salario * 14 / 100;
    }

    innsPorc.innerHTML = 'Teto - R$ 828.39'
    return 828.39;

}

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    let tecla = (!evento) ? window.event.keyCode : evento.which;
    let valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    let resultado = "";
    let mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}