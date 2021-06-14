import './style.css'

const menu = document.querySelector<HTMLDivElement>('.menu')!;
const mobileNav = document.querySelector<HTMLDivElement>('.nav-mobile-modal')!;
const closeNavModal = document.querySelector<HTMLDivElement>('.nav-mobile-modal > .close')!;

menu.onclick = function(){
  mobileNav.classList.remove('hidden');
}

closeNavModal.onclick = function(){
  mobileNav.classList.add('hidden');
}

console.log('rendered')

/*contact form*/

const form = document.querySelector<HTMLDivElement>('#app > div.showcase.grid > div.contact-me > div > form')!;

form.onsubmit = function(e?: any){

  e.preventDefault();

  const [firstname, lastname]: string = e.target[0].value.split(' ')!;
  const email: string = e.target[1]!.value!;
  const message: string = e.target[2].value!;
  const captchaResponse: string = grecaptcha.getResponse();

  if(!captchaResponse){
    alert('Complete the captha!');
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
        firstname,
        lastname,
        email, 
        message, 
        captcha: captchaResponse
      })
    }).then((response?: any) => {
      if(response.body === "OK"){
        alert('received!');
        return;
      }
      alert('error');
    }).catch(() => {
      alert('Unable to send!');
    });
}