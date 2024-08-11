
const subscribe_btn = document.querySelector(".subscribe-btn");

const routes = {
  '': '.index.html',
  '#/success': './success_page.html',
};

const render = async route => {
  const content = document.querySelector('body');
  const url = routes[route];

  if (url) {
    try {
      const response = await fetch(url)
      .then()
      if (response.ok) {
        content.innerHTML = await response.text();
      }
    }
    catch (error) {
      console.error('Error fetching the HTML content: ', error);
      content.innerHTML = "<h1>500 - Server Error</h1>";
    }
  }
  else {
    content.innerHTML = "<h1>404 Page Not Found </h1>";
  }
};

window.location.hash = '';
const link = document.querySelector(".custom-style");
link.href = "./styles/home.css";

window.onhashchange = () => {
  console.log("hash change");
  link.href = "./styles/success_page.css";
  render(window.location.hash);
}

const submit_btn = document.querySelector(".subscribe-btn");
const email = document.querySelector("#email");
const error1 = document.querySelector("#type1");
const error2 = document.querySelector("#type2");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInput() {
  let value = email.value;
  if (!value){
    email.classList.add("invalid");
    error2.classList.add("hidden");
    error1.classList.remove("hidden");
    console.log("triggered 1");
  }
  else if (!emailPattern.test(value)){
    email.classList.add("invalid");
    error1.classList.add("hidden");
    error2.classList.remove("hidden");
    console.log("triggered 2");
  }
  else{
    email.classList.remove("invalid");
    error1.classList.add("hidden");
    error2.classList.add("hidden");
  }
}

email.addEventListener("blur", validateInput);
submit_btn.addEventListener("click", (event) => {
  event.preventDefault();
  validateInput();
  if (error1.classList.contains("hidden") && error2.classList.contains("hidden")){
    window.location.hash = "/success";
  }
})