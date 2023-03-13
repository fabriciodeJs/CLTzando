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
    let salario = Number.parseFloat(salarioBruto.value);
    let desconto = Number.parseFloat(descontos.value);
    let depedentes = Number.parseInt(dependetes.value)


    const inss = verificacaoInss(salario);
    calculoSalarioLiquido(salario, inss, depedentes, desconto);





    salarioBruto.value = '';
    descontos.value = '';
    dependetes.value = '';
});

function calculoSalarioLiquido(salario, inss, depedentes, desconto) {

    console.log(inss)
    console.log(salario)
    console.log(depedentes)
    console.log(desconto)



}

function verificacaoInss(salario) {

    if (salario <= 1302) return 7, 5;

    if (salario <= 2571, 29) return 9;

    if (salario <= 3856, 94) return 12;

    if (salario <= 7507, 49) return 14;

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