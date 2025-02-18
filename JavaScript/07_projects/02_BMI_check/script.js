const form = document.querySelector('form');

// below use case will give you empty value
// const height = parseInt(document.querySelector('#height').value)

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const height = parseInt(document.querySelector("#height").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const results = document.querySelector("#results");

  if (height === "" || height < 0 || isNaN(height)) {
    alert("Please enter a valid height");
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    alert("Please enter a valid weight");
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    if(bmi < 18.6){
        results.innerHTML = `You are under weight.! Your BMI is: <span id="bmi">${bmi}</span>`
    } else if(bmi > 18.6 && bmi < 24.9){
        results.innerHTML = `You are fit. Your BMI is: <span id="bmi">${bmi}</span>`
    } else {
        results.innerHTML = `You are over weight!! Your BMI is: <span id="bmi">${bmi}</span>`
    }
  }
});
