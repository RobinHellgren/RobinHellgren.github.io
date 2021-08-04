let loanAmount = 0;
let balance = 0;
let purchasedLaptopAfterLoan = true;
let pay = 0;
let computers = [];
let currentComputer;

let loanDiv;
let balanceRow;
let loanAmountRow;
let getLoanButton;
let payRow;
let repayButton;
let laptopSelect;
let laptopFeatures;
let laptopTitle;
let laptopDescription;
let laptopPrice;
let laptopImg;

window.onload = init;

function init(){
    loanDiv = document.getElementById("loan-div");
    balanceRow = document.getElementById("customer-balance");
    loanAmountRow = document.getElementById("customer-loan-balance");
    getLoanButton = document.getElementById("get-loan-button");
    payRow = document.getElementById("customer-pay");
    repayButton = document.getElementById("repay-button");
    laptopSelect = document.getElementById("laptop-menu");
    laptopFeatures = document.getElementById("laptop-features");
    laptopTitle = document.getElementById("laptop-view-name");
    laptopDescription = document.getElementById("laptop-view-description");
    laptopPrice = document.getElementById("laptop-view-price");
    laptopImg = document.getElementById("laptop-img")
    fetchAPIData();
    updateDOMLoanRow();
    updateDOMBalanceRow();
    updateDOMPayRow();
}

async function fetchAPIData(){
    let json;
    try{
        let response = await fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
        json = await response.json();
    }
    catch(error){
        console.error(error);
    }
    console.log(json)
    json.forEach(computer => {
        computers.push(computer);
        console.log(computer);
    });
    updateDOMLaptopSelect();
}
function getALoan(){
    let amount = window.prompt("Enter the balance of the loan you want to take.")
    amount = parseInt(amount);
    console.log(amount < balance*2)
    if(amount === "" || amount === null){
        alert("Please enter a valid amount")
        return;
    }
    else if(amount < balance*2){
        loanAmount += amount;
        balance += amount;
        updateDOMLoanRow();
        updateDOMBalanceRow();
        updateDOMGetLoanButton();
        updateDOMRepayButton();
        purchasedLaptopAfterLoan = false;
    }
    else if(amount > balance*2){
        alert("You can't take a loan greater than twice your current balance");
    }
}
function repayLoan(){
    if(pay >= loanAmount){
        pay -= loanAmount;
        loanAmount = 0;
    }
    else {
        loanAmount -= pay;
        pay = 0;
    }
    updateDOMLoanRow();
    updateDOMPayRow();
    updateDOMRepayButton();
    updateDOMGetLoanButton();
}

function work(){
    pay += 100;
    updateDOMPayRow();
}

function bankPay(){
    if(loanAmount > 0){
        let bankCutOfPay = (pay/100)*10;
        pay -= bankCutOfPay;
        if(bankCutOfPay > loanAmount){
            bankCutOfPay -= loanAmount;
            loanAmount = 0;
            pay += bankCutOfPay;
        }
        else{
            loanAmount -= bankCutOfPay;
        }
    }
    balance += pay;
    pay = 0;
    updateDOMBalanceRow();
    updateDOMLoanRow();
    updateDOMPayRow();
}

function buyLaptop(){
    if(balance >= currentComputer.price){
        balance -= currentComputer.price;
        alert("Congratulations on your new laptop!");
    }
    else {
        alert("You can't afford that laptop ://")
    }
    updateDOMBalanceRow();
}

function updateDOMGetLoanButton(){
    if(loanAmount > 0){
        getLoanButton.style.display = 'none';
    }
    else if(purchasedLaptopAfterLoan){
        getLoanButton.style.display = 'initial';
    }
}
function updateDOMLoanRow() {
    if(loanAmount > 0){
        loanDiv.style.display = "flex"
    }
    else {
        loanDiv.style.display = "none";
    }
    loanAmountRow.innerHTML = loanAmount + " SEK";
}
function updateDOMBalanceRow(){
    balanceRow.innerHTML = balance + " SEK"
}
function updateDOMPayRow(){
    payRow.innerHTML = pay + " SEK"
}
function updateDOMRepayButton(){
    if(loanAmount > 0){
        repayButton.style.display = "initial"
    }
    else {
        repayButton.style.display = "none";
    }
}
function updateDOMLaptopSelect(){
    computers.forEach(computer => {
        let opt = document.createElement('option');
        opt.value = computer.id;
        opt.innerHTML = computer.title;
        laptopSelect.appendChild(opt);
    });
}
function updateDOMOnLaptopSelect(){
    const computer = computers.find(computer => computer.id == laptopSelect.value);
    currentComputer = computer;
    laptopFeatures.innerHTML = '';
    computer.specs.forEach(feature => {
        var li = document.createElement("li");
        li.innerHTML = feature;
        laptopFeatures.appendChild(li);
    })

    laptopTitle.innerHTML = computer.title;
    laptopDescription.innerHTML = computer.description;
    laptopPrice.innerHTML = computer.price + " SEK";
    laptopImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + computer.image;

}