import './sass-style.scss'

const menu = document.querySelector<HTMLDivElement>('.menu')!;
const mobileNav = document.querySelector<HTMLDivElement>('.nav-mobile-modal')!;
const closeNavModal = document.querySelector<HTMLDivElement>('.nav-mobile-modal > .close')!;

menu.onclick = function(){
  mobileNav.classList.remove('hidden');
}

closeNavModal.onclick = function(){
  mobileNav.classList.add('hidden');
}

/*contact form*/

const form = document.querySelector<HTMLFormElement>('#app > div.showcase.grid > div.contact-me > div > form')!;

const submitBtn = document.getElementById('submit')!;

submitBtn.addEventListener('click', function(e?: any){

  e.preventDefault();

  const fullname = document.getElementById('fullname')!;
  const [firstName, lastName] = fullname.value.split(' ');
  const email: string = document.getElementById('email')!.value;
  const message: string = document.getElementById('email')!.value;
  const captchaResponse = grecaptcha.getResponse;

  console.log(email, firstName, lastName, message, captchaResponse)
  
  alert(JSON.stringify({firstName, lastName, email, message, captchaResponse}))

  if(!captchaResponse){
    alert('Complete the captha!');
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
      if(response.body === "OK"){
        alert('received!');
        alert(JSON.stringify(response.body))
      }
      alert('error');
    }).catch(() => {
      alert('Unable to send!');
    });
});