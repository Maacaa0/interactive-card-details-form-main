// DIVS TO SHOW/HIDE
const form = document.querySelector("form");
const thankYou = document.querySelector(".thank-you-page");
const continueBtn = document.getElementById("continue-button");
const errorMsg = document.querySelectorAll(".error-msg");

// CARD INFO 
const cardNumber = document.getElementById("card-number-display");
const cardName = document.getElementById("name-display");
const cardExpMM = document.getElementById("mmexp");
const cardExpYY = document.getElementById("yyexp");
const cardCVC = document.getElementById("cvc-display");

const allInputs = document.querySelectorAll("input");
const confirmBtn = document.getElementById("confirm-button");

// INPUT 
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const mmInput = document.getElementById("month");
const yyInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");

// ERRORS
const wrongInput = ["Wrong format", "Wrong format, characters only", "Wrong format, numbers only", "Can't be blank", "Card number has to be 16 digits long"];

// CHECK FUNCTION 

function displayError(inputVal) {
    inputVal.classList.add("error-border"),
    inputVal.nextElementSibling.classList.add("add"),
    inputVal.classList.remove("confirmed-border")  
}

function removeError(inputVal) {
    inputVal.classList.add("confirmed-border"),
    inputVal.classList.remove("error-border"),
    inputVal.nextElementSibling.classList.remove("add")
    
}



 //NAME INPUT
 let checkNameConditions = false
nameInput.addEventListener("input", function() {
    if (/^[a-zA-Zá-žÁ-Ž\s]*$/.test(nameInput.value) == false) {
        displayError(nameInput),
        nameInput.nextElementSibling.textContent = wrongInput[1],
        checkNameConditions = false  

     } else if (nameInput.value === "") {
        displayError(nameInput),
        nameInput.nextElementSibling.textContent = wrongInput[3],
        checkNameConditions = false  

        } else {
        removeError(nameInput),
        checkNameConditions = true
   }
   cardName.textContent = nameInput.value
})


// NUMBER INPUT
let checkNumberConditions = false;
numberInput.addEventListener("input", function() {

    let numInputWithBlankSpaces = numberInput.value.substr(0,4) + " " + numberInput.value.substr(4,4) + " " + numberInput.value.substr(8,4) + " " + numberInput.value.substr(12,4) + " ";
    

    if (/^[\d\s]*$/.test(numberInput.value) == false) {
        displayError(numberInput),
        numberInput.nextElementSibling.textContent = wrongInput[2],
        checkNumberConditions = false

    } else if (numberInput.value === "") {
        displayError(numberInput)
        numberInput.nextElementSibling.textContent = wrongInput[3]
        checkNumberConditions = false

    } else if (numberInput.value.length !== 16) {
        numberInput.classList.add("error-border"),
        numberInput.nextElementSibling.classList.add("add"),
        numberInput.classList.remove("confirmed-border"),
        numberInput.nextElementSibling.textContent = wrongInput[4], checkNumberConditions = false

        } else {
            numberInput.classList.add("confirmed-border")
            numberInput.classList.remove("error-border"),
            numberInput.nextElementSibling.classList.remove("add"),
            checkNumberConditions = true
   }
   cardNumber.textContent = numInputWithBlankSpaces
})



// EXP. MONTH INPUT
let checkMonthConditions = false;
mmInput.addEventListener("input", function() {
    if (mmInput.value === "") {
        mmInput.nextElementSibling.classList.add("add"),
        mmInput.classList.add("error-border"),
            mmInput.classList.remove("confirmed-border"),
            mmInput.nextElementSibling.textContent = wrongInput[3]
            checkMonthConditions = false; 
    } else if (mmInput.value > 12 || !/[0-9]{2}/.test(mmInput.value) || mmInput.value === "") {
        mmInput.nextElementSibling.classList.add("add"),
        mmInput.nextElementSibling.textContent = wrongInput[0]
        mmInput.classList.add("error-border"),
        mmInput.classList.remove("confirmed-border"),
        checkMonthConditions = false; 
    } else {
        mmInput.nextElementSibling.classList.remove("add"),
        mmInput.classList.remove("error-border"),
        mmInput.classList.add("confirmed-border"),
        checkMonthConditions = true;
    } 
    cardExpMM.textContent = mmInput.value
})

// EXP. YEAR INPUT
let currentYear = new Date().toString().split(" ")[3].slice(2)
let checkYearConditions = false;
yyInput.addEventListener("input", function() {
    if (yyInput.value === "") {
        yyInput.nextElementSibling.classList.add("add"),
        yyInput.classList.add("error-border"),
            yyInput.classList.remove("confirmed-border"),
            yyInput.nextElementSibling.textContent = wrongInput[3]
            checkYearConditions = false; 
    
 } else if (yyInput.value < Number(currentYear) || !/[0-9]{2}/.test(yyInput.value)) {
            yyInput.nextElementSibling.classList.add("add"),
            yyInput.nextElementSibling.textContent = wrongInput[0]
            yyInput.classList.add("error-border"),
            yyInput.classList.remove("confirmed-border"),
            checkYearConditions = false; 
        } else {
            yyInput.classList.remove("error-border"),
            yyInput.classList.add("confirmed-border"),
            yyInput.nextElementSibling.classList.remove("add")
            checkYearConditions = true;
        } 
    cardExpYY.textContent = yyInput.value
})

//CVC INPUT
let checkCvcConditions = false;
cvcInput.addEventListener("input", function() {
    if (cvcInput.value === "") {
        displayError(cvcInput),
        cvcInput.nextElementSibling.textContent = wrongInput[3],
        checkCvcConditions = false  

     } else if (!/[0-9]{3}/.test(cvcInput.value)) {
        displayError(cvcInput),
        cvcInput.nextElementSibling.textContent = wrongInput[0],
        checkCvcConditions = false  

        } else {
        removeError(cvcInput),
        checkCvcConditions = true
   }
    cardCVC.textContent = cvcInput.value
});


let allConditions = [checkNameConditions,checkNumberConditions,checkMonthConditions,checkYearConditions,checkCvcConditions]


 confirmBtn.addEventListener("click", function() {
    if (checkNameConditions && checkNumberConditions && checkMonthConditions && checkYearConditions && checkCvcConditions){
        allInputs.forEach(x => x.classList.remove("error-border"))
        thankYou.style.display = "flex",
        form.classList.add("remove")
  } else {
        allInputs.forEach(x => x.classList.add("error-border"))
        alert("Check your inserted data!")
   }
    
})

    continueBtn.addEventListener("click", function(){
        window.location.reload()
    })
