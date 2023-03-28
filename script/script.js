/*                  Moedas                */
const saida_saidaDolar = document.querySelector('.dolar');
const saida_euro = document.querySelector('.euro');
const saida_ibovespa = document.querySelector('.ibovespa');
const saida_bitcoin = document.querySelector('.bitcoin');
/*                  Input                */
const saidaSalarioLiquido = document.querySelector('#resultadoSalario');
const salarioBruto = document.querySelector('#valorSalario');
const descontos = document.querySelector('#valorDescontos');
const dependetes = document.querySelector('#valorDependetes');
const btnSalario = document.querySelector('#btnSLiquido');



btnSalario.addEventListener('click', (e) => {
    let salario = Number(salarioBruto.value);
    let desconto = Number(descontos.value);
    let depedentes = Number(dependetes.value);

    const salarioSemInss = calculoInss(salario);
    const irrf = calculoIrrf(salarioSemInss, salario);
    const salarioComDesconto = calculoDesconto(salarioSemInss, desconto);
    console.log(salarioComDesconto);
    salarioBruto.value = '';
    descontos.value = '';
    dependetes.value = '';
});

function calculoDesconto(salarioSemInss, desconto) {

    return salarioSemInss - desconto;
}

function calculoIrrf(salarioSemInss, salario) {

    if (salario <= 1903.98) {
        return salarioSemInss;
    }

    if (salario <= 2826, 65) {
        const parcela = 142.8;
        return (salarioSemInss * 7.5 / 100) - parcela ;
    }
    
    if (salario <= 3751.05) {
        const parcela = 354.80;
        return (salarioSemInss * 15 / 100) - parcela;
    }

    if (salario <= 4664.68) {
        const parcela = 636.13;
        return (salarioSemInss * 22.5 / 100) - parcela;
    }

    const parcela = 869.36;
    return (salarioSemInss * 27.5/ 100) - parcela;
    
}

function calculoInss(salario) {

    if (salario <= 1302) {
        const inss = 7.5;
        return salario - (salario * inss / 100);
    }

    if (salario <= 2571.29) {
        const inss = 9;
        return salario - (salario * inss / 100);
    }

    if (salario <= 3856.94) {
        const inss = 12;
        return salario - (salario * inss / 100);
    }

    if (salario <= 4664.68) {
        const inss = 14;
        return salario - (salario * inss / 100);
    }

    const inss = 828.39;
    return salario - inss;

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