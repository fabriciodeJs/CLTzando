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
const saidaIrrfPorc = document.querySelector('porcentagemIrrf');
const saidaIrrfValor = document.querySelector('valorIrrf');
const saidaSalarioLiq = document.querySelector('#sLiquido');


btnSalario.addEventListener('click', (e) => {
    e.preventDefault();

    let salarioB = Number(salarioBruto.value);
    let desconto = Number(descontos.value);
    let pensao = Number(dependetes.value);

    const inss = calculoInss(salarioB);
    const irrf = calculoIrrf(salarioB);
    const salarioLiquido = calculoSalario(inss, irrf, pensao, desconto, salarioB);
    
    
    formatar(salarioB, desconto, pensao, inss, irrf, salarioLiquido);
    
    /*salarioBruto.value = '';
    descontos.value = '';
    dependetes.value = '';*/
});

function formatar(salarioB, desconto, pensao = 0.0, inss = 0.0, irrf = 0, salarioLiquido) {
    
    const salarioBruto = salarioB.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const desc = desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const pen = pensao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const ins = inss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const irr = irrf.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const salarioL = salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    
    saidaValores(salarioBruto, desc, pen, ins, irr, salarioL);
    
}

function saidaValores(salarioBruto, desconto, pensao, inss, irrf, salarioLiquido){
    saidaSalarioBru.innerHTML = salarioBruto;
    valorDesconto.innerHTML = desconto;
    valorInss.innerHTML = pensao;
    valorDesconto.innerHTML = inss;
    saidaIrrfValor.innerHTML = irrf;
    saidaSalarioLiq.innerHTML = salarioLiquido;
}

function calculoSalario(inss, irrf, pensao, desconto, salario) {
    const salarioLiquido = (((salario - inss) - irrf ) - pensao) - desconto;

    return salarioLiquido;
}

function calculoIrrf(salarioSemInss, salario) {

    if (salario <= 1903.98) {
        return 0;
    }

    if (salario <= 2826, 65) {
        return 142.8 ;
    }

    if (salario <= 3751.05) {
        return 354.80;
    }

    if (salario <= 4664.68) {
        return 636.13;
    }

    return 869.36;
    
}

function calculoInss(salario) {

    if (salario <= 1302) {
        return salario * 7.5 / 100;
    }

    if (salario <= 2571.29) {
        return salario * 9 / 100;
    }

    if (salario <= 3856.94) {
        return salario * 12 / 100;
    }

    if (salario <= 4664.68) {
        return salario * 14 / 100;
    }

    return 828.39;

}

/*String.prototype.reverse = function () {
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
}*/