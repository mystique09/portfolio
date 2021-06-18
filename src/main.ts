import './sass-style.scss'
import Alert from './alert';
import anime from 'animejs/lib/anime.es.js'

const menu = document.querySelector<HTMLDivElement>('.menu')!;
const mobileNav = document.querySelector<HTMLDivElement>('.nav-mobile-modal')!;
const closeNavModal = document.querySelector<HTMLDivElement>('.nav-mobile-modal > .close')!;
const uLinks = document.querySelectorAll('.nav-mobile-modal > ul > li');

menu.onclick = function(){
  mobileNav.classList.remove('hidden');
}

closeNavModal.onclick = function(){
  mobileNav.classList.add('hidden');
}

uLinks.forEach((link)=>{
  link.onclick = function(){
    mobileNav.classList.add('hidden');
  }
});

/* Alerts */

function animateAlert(alert){
  alert.classList.remove('hidden');
  setTimeout(()=> alert.classList.add('hidden'), 3000);
  return;
}

const alertError = new Alert('Unable to send message.', false).create();
const requiredError = new Alert('Required Fields!', false).create();
const alertSuccess = new Alert('Message received!', true).create();

document.body.appendChild(alertError);
document.body.appendChild(requiredError);
document.body.appendChild(alertSuccess);

/*contact form*/

const submitBtn = document.getElementById('submit')!;

submitBtn.addEventListener('click', function(e?: any){

  e.preventDefault();

  const fullname = (<HTMLInputElement>document.getElementById('fullname')!);
  const [firstName, lastName] = fullname.value.split(' ');
  const email: string = (<HTMLInputElement>document.getElementById('email')!).value;
  const message: string = (<HTMLTextAreaElement>document.getElementById('message')!).value;
  const captchaResponse = grecaptcha.getResponse();
  
  if(!captchaResponse || !email || !firstName || !message){
    animateAlert(requiredError);
    return;
  }

  fetch('https://emailjs-backend.herokuapp.com/api', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0', 
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        firstName,
        lastName: lastName || "nolastname",
        email, 
        comment: message, 
        captcha: captchaResponse
      })
    }).then((response?: any) => {
      if(response.statusText === "OK"){
        animateAlert(alertSuccess);
        setTimeout(()=> location.reload(), 3000);
        return;
      }
      animateAlert(alertError);
      setTimeout(()=> location.reload(), 3000);
      return;
    }).catch(() => {
      animateAlert(alertError);
      setTimeout(()=> location.reload(), 3000);
      return;
    });
});

/*  ANIMEJS AJIMATIONS */