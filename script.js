let loanAmount = 0;
let balance = 0;
const pay = 0;

let loanDiv;

window.onload = init;

function init(){
    loanDiv = document.getElementById("loan-div");
    console.log(loanDiv)
    loanDiv.style.display = "none";
}

function updateLoanAmount(change){
    loanAmount += change;
    if(loanAmount > 0){
        loanDiv.style.display = "none";
    }
    else {
        loanDiv.style.display = "flex"
    }
}


function getALoan(){
    console.log("clicked")
    let amount = window.promt("Please enter loan amount")
    if(amount == "" || amount == null){
        return
    }
    else {
        updateLoanAmount(amount);
    }
    

}