const btnMenu = document.querySelector('#btn-menu');
const tagMenu = document.querySelector('.navegacao-mobile');
const body = document.querySelector('.pagina');

btnMenu.addEventListener('click', (e) => {

    if(tagMenu.style.display == 'none'){
        tagMenu.style.display = 'flex';
    }else{
        tagMenu.style.display = 'none';
    }
});

function monitorar() {
   if(window.innerWidth >= 700){
        tagMenu.style.display = 'none';
   }


}