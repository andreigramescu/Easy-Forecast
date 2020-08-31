const weatherForm = document.querySelector("form");
const locationInput = document.querySelector("input");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = locationInput.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        alert("Location not supported!");
      } else {
        alert(data.location + "\n" + data.forecast);
      }
    });
  });
});
