// Alert for mobile device
var width = window.innerWidth;
function devicewidth() {
  if (width <= 480) {
    document.getElementById(
      "alert"
    ).innerHTML = `<div class="alert  mb-0 border-white alert-warning alert-dismissible fade show" role="alert">
    <strong>&#128075;, </strong><span class='fs-6'> Optimal viewing on a tablet, laptop, or PC. Click 'cross' on your device too. </span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  } else {
    document.getElementById("alert").innerHTML = `<div class='m-0 p-0'></div>`;
  }
}
devicewidth();

document.getElementById("icon").onclick = function () {
  this.classList.toggle("navbar-toggler-icon");
  this.classList.toggle("bi-arrow-right");
  this.classList.toggle("h2");
};
// Navbar Hide and show
window.onscroll = function () {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").classList.add("fixed-top");
  } else {
    document.getElementById("navbar").classList.remove("fixed-top");
  }
};
// Weather Api
const apiKey = "4fda4948ba84441e6c2dc036bc4b0295";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
async function getWeatherByLocation(city) {
  const response = await fetch(url(city));
  const Data = await response.json();
  // console.log(Data);
  return addWeatherToPage(Data);
}

const addWeatherToPage = (data) => {
  const temp = Ktoc(data?.main?.temp);
  const temp1 = Ktoc(data?.main?.temp_max);
  const temp2 = Ktoc(data?.main?.temp_min);
  // const sunrise = new Date(data?.sys?.sunrise * 1000)
  //   .toISOString()
  //   .slice(11, 19);
  // const sunset = new Date(data?.sys?.sunset * 1000).toISOString().slice(11, 19);
  const weather = document.createElement("div");
  weather.classList.add("weather");
  // console.log(typeof data.cod);
  if (data.cod == "404") {
    weather.innerHTML = `
    <div class ='d-flex text-white justify-content-center align-items-center flex-column my-2'>
    <h6>City not found</h6><h6>please check spelling</h6><div class=" mt-3 fs-6 spinner-border text-danger" role="status">
  </div></div>`;
    main.innerHTML = "";
    main.appendChild(weather);
    return;
  }
  weather.innerHTML = `
  <div class='d-flex flex-column justify-content-between align-items-center'>
          <h2 class='d-flex text-white justify-content-center align-items-center mt-5'>
          <span class='px-1'> <i class="bi bi-thermometer-high"></i>:${temp1}°C</span> 
          <span class='px-1'> Now:${temp}°C </span> 
          <span class='px-1'> <i class="bi bi-thermometer-low"></i>:${temp2}°C </span>
          </h2>

          <div class='d-flex justify-content-center align-items-center'>
          <img class='shadow-lg rounded-circle'  src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png"/>
          <h3 class='mx-2'>Sky : ${
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)
          }</h3>
          </div></div>`;
  //   cleanup
  main.innerHTML = "";
  main.appendChild(weather);
};

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});

// Date and Time
setInterval(myTimer, 1000);
function myTimer() {
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString();
  let year = date.getFullYear();
  document.getElementById("date").innerHTML = year;
}
// Contact form
let Fname = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let message = document.getElementById("message");
let contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = {
    Fname: Fname.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent");
      Fname.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";
    } else {
      alert("Something went wrong!");
    }
  };
  xhr.send(JSON.stringify(formData));
});
