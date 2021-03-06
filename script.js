
const body = document.getElementById("body");
const modal = document.getElementById("modal");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const companyInput = document.getElementById("companyInput");
const cardHolder = document.getElementById("cardHolder");
const card_Form = document.getElementById("card_Form");
const bgColorScale = document.getElementById("bgColorInput");
const txtColorScale = document.getElementById("txtColor");
const settingsMenu = document.getElementById("settingsMenu");

const person = function(name, phone, email, company) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.company = company;
}

const peopleAR = [];

var colorScheme = [];

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

function HBM() {
    if (localStorage.getItem("colorScheme")){
    let CSUC = localStorage.getItem("colorScheme")
    let CSC = JSON.parse(CSUC);
    bgColorScale.value = CSC[0];
    txtColorScale.value = CSC[1];
    }
    modal.classList.remove("hidden");
    settingsMenu.classList.remove("hidden")
    modal.addEventListener("click", () => {
    if (Event.target = modal) {
        modal.classList.add("hidden");
        settingsMenu.classList.add("hidden");
    }})
}

function manualColorChange() {
    colorSchemeLR = localStorage.getItem("colorScheme");
    colorSchemeLR = []
    colorScheme = []
    let BGcolor = bgColorScale.value;
    let txtColor = txtColorScale.value
    colorScheme.push(BGcolor);
    colorScheme.push(txtColor);
    body.style.backgroundColor = colorScheme[0];
    body.style.color = colorScheme[1];
    localStorage.setItem("colorScheme", JSON.stringify(colorScheme));
    // console.log(bgColorScale)
}

function removeCard (card, index) {
    cardHolder.removeChild(card);
    peopleAR.splice(index, 1);
    localStorage.setItem("people", JSON.stringify(peopleAR));
}

function editCard (nameEL, phoneEl, emailEl, companyEl, index, card, person) {
    nameEL.contentEditable = true;
    phoneEl.contentEditable = true;
    emailEl.contentEditable = true;
    companyEl.contentEditable = true;
    let doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    card.appendChild(doneBtn);
    doneBtn.addEventListener("click", () => {
        person.name = nameEL.textContent;
        person.phone = phoneEl.textContent;
        person.email = emailEl.textContent;
        person.company = companyEl.textContent;
        nameEL.contentEditable = false;
        phoneEl.contentEditable = false;
        emailEl.contentEditable = false; 
        companyEl.contentEditable = false;
        card.removeChild(doneBtn);
        peopleAR.splice(index, 1, person);
        localStorage.setItem("people",JSON.stringify(peopleAR));
    }) 
}

function cardELBuilder (name, phone, email, company, person) {
let peopleUnparsed =  localStorage.getItem(("people"));
let people = JSON.parse(peopleUnparsed);
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
let editEl = document.createElement("p");
editEl.textContent = "Edit";
peopleAR.push(person);
RemoveEl.addEventListener("click", () => {removeCard(card, peopleAR.indexOf(person))});
editEl.addEventListener("click", () => {editCard(nameEL, phoneEl, emailEl, companyEl, peopleAR.indexOf(person), card, person)});
RemoveEl.textContent = "Remove"; 
RemoveEl.classList.add("remove");
editEl.classList.add("editBTN");
localStorage.setItem("people",JSON.stringify(peopleAR));
card.append(nameEL, hr, phoneEl, emailEl, companyEl,);
card.appendChild(editEl);
card.appendChild(RemoveEl);
cardHolder.appendChild(card);
}

function onload() {
    if (localStorage.getItem("colorScheme")) {
    let ColorScheme = localStorage.getItem("colorScheme");
    let CCS = JSON.parse(ColorScheme);
    body.style.backgroundColor = CCS[0];
    body.style.color = CCS[1];}
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

