const modal = document.getElementById("modal");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const companyInput = document.getElementById("companyInput");
const cardHolder = document.getElementById("cardHolder");
const card_Form = document.getElementById("card_Form");

const person = function(name, phone, email, company) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.company = company;
}

const peopleAR = [];

function newCard() {
modal.classList.remove("hidden");
card_Form.classList.remove("hidden");
modal.addEventListener("click", () => {
 if (Event.target = modal) {
     modal.classList.add("hidden");
     card_Form.classList.add("hidden");
 }
})
}

function removeCard (card, index, people) {
    cardHolder.removeChild(card);
    peopleAR.splice(index, 1);
    localStorage.setItem("people", JSON.stringify(peopleAR));
}

function cardELBuilder (name, phone, email, company, person) {
// peopleAR.push(person);

let peopleUnparsed =  localStorage.getItem(("people"));
let people = JSON.parse(peopleUnparsed);
// let index = people.indexOf(person);
let card = document.createElement("div");
card.classList.add("card");
let nameEL = document.createElement("h1");
nameEL.textContent = name;
let hr = document.createElement("hr");
let phoneEl = document.createElement("h2");
phoneEl.textContent = phone
let emailEl = document.createElement("h2");
emailEl.textContent = email;
let companyEl = document.createElement("h3");
companyEl.textContent = company;
let RemoveEl = document.createElement("p");
peopleAR.push(person);

// if (localStorage.getItem("people") !== null) {
//     RemoveEl.addEventListener("click", () => {removeCard(card, people.indexOf(person), people)});
//     RemoveEl.textContent = "Remove"; 
//     RemoveEl.classList.add("remove");
//     peopleAR.push(person);
// }

    RemoveEl.addEventListener("click", () => {removeCard(card, peopleAR.indexOf(person), people)});
    RemoveEl.textContent = "Remove"; 
    RemoveEl.classList.add("remove");
    localStorage.setItem("people",JSON.stringify(peopleAR));

card.append(nameEL, hr, phoneEl, emailEl, companyEl,);
card.appendChild(RemoveEl);
cardHolder.appendChild(card);

}

function onload() {
    let peopleUnparsed =  localStorage.getItem(("people"));
    let people = JSON.parse(peopleUnparsed);
    people.forEach((person) => {
        cardELBuilder(person.name, person.phone, person.email, person.company, person);
 });
 }

function Buildcard() {
let name = nameInput.value;
if (name == "") {
    alert("Name Required");
    return;
}
let phone = phoneInput.value;
let email = emailInput.value;
let company = companyInput.value;
let personOBJ = new person (name, phone, email, company);
nameInput.value = "";
phoneInput.value = "";
emailInput.value = "";
companyInput.value = "";
modal.classList.add("hidden");
card_Form.classList.add("hidden");
cardELBuilder(name, phone, email, company, personOBJ);
}

onload();