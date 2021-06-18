import './sass-style.scss'
import Alert from './alert';

const menu = document.querySelector<HTMLDivElement>('.menu')!;
const mobileNav = document.querySelector<HTMLDivElement>('.nav-mobile-modal')!;
const closeNavModal = document.querySelector<HTMLDivElement>('.nav-mobile-modal > .close')!;
const alertError = new Alert('Unable to send message.', false).create();
const captchaError = new Alert('Complete the captcha first!', false).create();
const alertSuccess = new Alert('Message received!', true).create();

document.body.appendChild(captchaError);
document.body.appendChild(alertError);
document.body.appendChild(alertSuccess);

menu.onclick = function(){
  mobileNav.classList.remove('hidden');
}

closeNavModal.onclick = function(){
  mobileNav.classList.add('hidden');
}

/*contact form*/

const submitBtn = document.getElementById('submit')!;

submitBtn.addEventListener('click', function(e?: any){

  e.preventDefault();

  const fullname = (<HTMLInputElement>document.getElementById('fullname')!);
  const [firstName, lastName] = fullname.value.split(' ');
  const email: string = (<HTMLInputElement>document.getElementById('email')!).value;
  const message: string = (<HTMLTextAreaElement>document.getElementById('message')!).value;
  const captchaResponse = grecaptcha.getResponse();
  
  if(!captchaResponse){
    captchaError.classList.remove('hidden');
    setTimeout(()=> captchaError.classList.add('hidden'), 3000);
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
        alertSuccess.classList.remove('hidden');
        setTimeout(()=> alertSuccess.classList.add('hidden'), 3000);
        setTimeout(()=> location.reload(), 3000);
        return;
      }
      alertError.classList.remove('hidden');
      setTimeout(()=> alertError.classList.add('hidden'), 3000);
      setTimeout(()=> location.reload(), 3000);
      return;
    }).catch(() => {
      alertError.classList.remove('hidden');
      setTimeout(()=> alertError.classList.add('hidden'), 3000);
      setTimeout(()=> location.reload(), 3000);
      return;
    });
});