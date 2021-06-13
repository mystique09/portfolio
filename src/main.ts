import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

const menu = document.querySelector<HTMLDivElement>('.menu')!;
const mobileNav = document.querySelector<HTMLDivElement>('.nav-mobile-modal')!;
const closeNavModal = document.querySelector<HTMLDivElement>('.nav-mobile-modal > .close')!;

menu.onclick = function(e: any){
  mobileNav.classList.remove('hidden');
}

closeNavModal.onclick = function(e: any){
  mobileNav.classList.add('hidden');
}