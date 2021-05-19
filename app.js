'use strict'

let headerArr = ['User', 'Type', 'Price', 'Condition']
let allMobiles = [];
//Constructor function
function Mobile(name, type, price, condition){
    this.name = name,
    this.type = type,
    this.price = price,
    this.condition = condition,

    allMobiles.push(this),

    setItem();
}

// Setting Item using LocalStorage
function setItem(){
    let setArr = JSON.stringify(allMobiles)
    localStorage.setItem('mobile', setArr)
}

// Price Function
function randPriceGen(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

// Getting form and adding event listener
let form = document.getElementById('form');
form.addEventListener('submit', submitter);

// Submitter function
function submitter(event){
    event.preventDefault();

    let name = event.target.username.value;
    let type = event.target.type.value;
    let price = randPriceGen(100, 500);
    let condition = '';
    if(price < 200){
        condition = 'Old'
    } else {
        condition = "New"
    }

    let newInstance = new Mobile(name, type, price, condition);
    newInstance.render();
}

let resultsDiv = document.getElementById('resultsDiv');
let table = document.createElement('table');
resultsDiv.appendChild(table);

let hRow = document.createElement('tr');
table.appendChild(hRow);

function makingHeader(){

    for(let i = 0; i < headerArr.length; i++){
        let thElement = document.createElement('th');
        hRow.appendChild(thElement);
        thElement.textContent = `${headerArr[i]}`
    }
}
makingHeader();

Mobile.prototype.render = function (){

    let firstRow = document.createElement('tr');
    table.appendChild(firstRow);
    
    let tdElement1 = document.createElement('td');
    firstRow.appendChild(tdElement1);

    let tdElement2 = document.createElement('td');
    firstRow.appendChild(tdElement2);

    let tdElement3 = document.createElement('td');
    firstRow.appendChild(tdElement3);

    let tdElement4 = document.createElement('td');
    firstRow.appendChild(tdElement4);

    for(let i = 0; i < allMobiles.length; i++){
    
        tdElement1.textContent = this.name;
        tdElement2.textContent = this.type;
        tdElement3.textContent = this.price;
        tdElement4.textContent = this.condition;
        // if(allMobiles[i].price < 200){
        //     tdElement4.textContent = 'Old';
        //     allMobiles[i].condition = 'Old';
        // } else {
        //     tdElement4.textContent = 'New';
        //     allMobiles[i].condition = 'New';
        // }

    }
}

// Getting Items using localStorage
function getItem(){
    let data = localStorage.getItem('mobile');
    let getArr = JSON.parse(data)

    if(getArr){
        for(let i = 0; i < getArr.length; i++){
            new Mobile(getArr[i].name, getArr[i].type, getArr[i].price, getArr[i].condition)
        }
    }
}

getItem();

for(let i = 0; i < allMobiles.length; i++){
    allMobiles[i].render();
}