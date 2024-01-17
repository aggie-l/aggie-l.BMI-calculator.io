const metricRadio = document.querySelector(".metric")
const imperialRadio = document.querySelector(".imperial")
const heightInput = document.querySelector(".height")
const weightInput = document.querySelector(".weight")

let unit = "metric"
let heightUnit = "cm"
let weightUnit = "kg"
let height
let weight
let bmi
let idealMinWeight
let idealMaxWeight



const changeUnits = () => {
    if (unit === "metric") {
        heightUnit = "cm";
        weightUnit = "kg";
    } else {
        heightUnit = "in";
        weightUnit = "lbs";
    }
    document.querySelectorAll(".input-permanent")[0].innerHTML = heightUnit
    document.querySelectorAll(".input-permanent")[1].innerHTML = weightUnit
}



const updateBMI = () => {
    document.querySelector(".bmi-score").innerHTML = Math.round(bmi * 10) / 10

    let evaluation;
    if (bmi < 18.5) {
        evaluation = "underweight"
    } else if (bmi < 25) {
        evaluation = "healthy weight"
    } else if (bmi < 30) {
        evaluation = "overweight"
    } else if (bmi >= 30) {
        evaluation = "obese"
    }

    let idealWeightSpan = (Math.round(idealMinWeight * 10) / 10) + weightUnit + " - "
        + (Math.round(idealMaxWeight * 100) / 100) + weightUnit + "."
 
    document.querySelector(".bmi-evaluation").innerHTML = evaluation + "."
    document.querySelector(".bmi-ideal-weight").innerHTML = idealWeightSpan
}


const updateBmiText = (change) => {
    if (change === "result") {
        document.querySelector(".greeting").classList.add("hidden")
        document.querySelector(".result-left").classList.remove("hidden")
        document.querySelector(".result-right").classList.remove("hidden")
        updateBMI();
    } else {
        document.querySelector(".greeting").classList.remove("hidden")
        document.querySelector(".result-left").classList.add("hidden")
        document.querySelector(".result-right").classList.add("hidden")
    }
}


metricRadio.addEventListener("click", (e) => {
    unit = "metric"
    changeUnits()
    calculateBMI()
    heightInput.value = ''
    weightInput.value = ''
})

imperialRadio.addEventListener("click", (e) => {
    unit = "imperial"
    changeUnits()
    calculateBMI()
    heightInput.value = ''
    weightInput.value = ''
})

heightInput.addEventListener("keyup", (e) => {
    height = heightInput.value
    calculateBMI()
})

weightInput.addEventListener("keyup", (e) => {
    weight = weightInput.value
    calculateBMI()
})


const checkInput = () => {
    if (height > 0 && weight > 0) {
        return true
    } else {
        return false
    }
}


const calculateBMI = () => {
    if (checkInput()) {
        if (unit === "metric") {
            bmi = weight / ((height / 100) * (height / 100));
            idealMinWeight = 18.5 * ((height / 100) * (height / 100));
            idealMaxWeight = 24.9 * ((height / 100) * (height / 100));
        } else {
            bmi = (weight / (height * height)) * 703;
            
            idealMinWeight = 18.5 / 703 * (height * height);
            idealMaxWeight = 24.9 / 703 * (height * height);
        }
        updateBmiText("result")
    } else {
        updateBmiText("reset")
    }
}

