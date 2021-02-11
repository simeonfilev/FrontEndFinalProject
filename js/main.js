"use strict";

const kanyeQuoteURL = "https://api.kanye.rest?format=text";
const randomNumberAPI = "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=1";
const randomUserGeneratorURL = "https://randomuser.me/api/?results=10";
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
const salaryTableDiv = document.getElementById("salaryTable");
const salaryForm = document.getElementById("salaryForm");
const nameElement = document.querySelector(".salary-input[name=name]");
const emailElement = document.querySelector(".salary-input[name=email]");
const ageElement = document.querySelector(".salary-input[name=age]");
const yoeElement = document.querySelector(".salary-input[name=yoe]");
const salaryElement = document.querySelector(".salary-input[name=salary]");

function validateForm(){
    const emailVal = emailElement.value;
    const nameVal = nameElement.value;
    const ageVal = ageElement.value;
    const yoeVal = yoeElement.value;
    const salaryVal = salaryElement.value;

    if (!nameRegex.test(nameVal)) {
        alert("Invalid name, please try again!");
        return false;
    }
    if (!emailRegExp.test(emailVal)) {
        alert("Invalid email format, please try again!");
        return false;
    }
    if (yoeVal > ageVal) {
        alert("YOE can't be bigger than your age!");
        return false;
    }
    if (ageVal < 1 || ageVal > 100) {
        alert("Age should be between 1 and 100");
        return false;
    }
    if (salaryVal <= 100) {
        alert("Your salary needs to be bigger than 100!");
        return false;
    }

    return true;
}

window.addEventListener('load', (event) => {
    getKanyeQuote();

    if (salaryTableDiv) {
        document.getElementById("generateNewSalaryTableBtn").addEventListener("click", generateSalaryTable);
        generateSalaryTable();
    }

    if(salaryForm){
        salaryForm.addEventListener("submit", event => {
            event.preventDefault();
            validateForm();
        });
    }
});

function getKanyeQuote() {
    fetch(kanyeQuoteURL).then(function (response) {
        if (response.ok) {
            response.text().then(function (text) {
                document.getElementById("kanyeQuote").innerHTML = "Random Kanye quote: " + text;
            });
        } else {
            document.getElementById("kanyeQuote").innerHTML = "Can't load Kanye quote :(";
        }
    });
}


function generateSalaryTable() {
    clearTable();
    fetch(randomUserGeneratorURL)
        .then(response => response.json())
        .then(data => {
            createSalaryTable();
            for (let user of data.results) {
                createTableRow(user);
            }
        });


}
const createSalaryTable = () => {
    // create table
    let scoreboardTable = document.createElement('table');
    scoreboardTable.className = 'scoreboardTable';
    let scoreboardTableHead = document.createElement('thead');
    scoreboardTableHead.className = 'scoreboardTableHead';
    let scoreboardTableHeaderRow = document.createElement('tr');
    scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow';

    let tableHeaders = ["Name", "Country", "Age", "City", "Salary"];
    tableHeaders.forEach(header => {
        let scoreHeader = document.createElement('th');
        scoreHeader.innerText = header;
        scoreboardTableHeaderRow.append(scoreHeader);
    })

    scoreboardTableHead.append(scoreboardTableHeaderRow);
    scoreboardTable.append(scoreboardTableHead)
    let scoreboardTableBody = document.createElement('tbody');
    scoreboardTableBody.className = "scoreboardTable-Body";
    scoreboardTable.append(scoreboardTableBody);

    salaryTableDiv.append(scoreboardTable);
}

const clearTable = () => {
    while (salaryTableDiv.firstChild) salaryTableDiv.removeChild(salaryTableDiv.firstChild);
};

function createTableRow(user) {
    let name = user.name.first + " "+ user.name.last;
    let country = user.location.country;
    let city = user.location.city;
    let age = user.dob.age;
    let salary = Math.floor(Math.random() * (100000 - 1000 + 1) + 1000);

    let salaryTableBodyRow = document.createElement('tr');
    salaryTableBodyRow.className = 'salaryTableRow';

    let nameTd = document.createElement('td');
    nameTd.innerText = name;

    let countryTd = document.createElement('td');
    countryTd.innerText = country;

    let cityTd = document.createElement('td');
    cityTd.innerText = city;

    let ageTd = document.createElement('td');
    ageTd.innerText = age.toString();

    let salaryTd = document.createElement('td');
    salaryTd.innerText = salary;


    salaryTableBodyRow.append(nameTd,countryTd,ageTd,cityTd,salaryTd);
    const salaryTableBody = document.querySelector(".scoreboardTable-Body");

    salaryTableBody.append(salaryTableBodyRow);
}
