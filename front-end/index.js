"use strict"
/*---------- VARIIABLES DECLARATION ----------*/

// const BASEURL = "http://localhost:3001"; 
const BASEURL = "";

//PhoneBook
const phonebookDiv = document.getElementById("phonebook-data");
const serchBar = document.getElementById("seaech-contact");
//General
const errorDiv = document.getElementById("error-div");
const infoDiv = document.getElementById("info-div");
//Add new contact
const showAddCont = document.getElementById("show-add");
const addNewContentDiv = document.getElementById("add-content");
const closeAddContent = document.getElementById("close-btn");
const addNewContactBtn = document.getElementById("add-btn");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");

/*---------- EVENT LISTENERS ----------*/
window.addEventListener("load", generatePhoneBookToDom);
window.addEventListener("load", generateInfoToDom);

showAddCont.addEventListener("click", () => addNewContentDiv.style.display = "flex");
closeAddContent.addEventListener("click", () => addNewContentDiv.style.display = "none");

addNewContactBtn.addEventListener("click", addNewContact);

/*---------- NETWORK ----------*/
//API requset for update contact number 
async function updateContact() {
  try {
    const response = await axios.put(`${BASEURL}/api/persons`, {
      "name" : nameInput.value,
      "phoneNumber" : numberInput.value
    });

    //Update DOM 
     generatePhoneBookToDom();

     nameInput.value = "";
     numberInput.value = "";
     addNewContentDiv.style.display = "none";

  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}

//API requset for addind new contact
async function addNewContact() {
  try {
    const response = await axios.post(`${BASEURL}/api/persons`, {
      "name" : nameInput.value,
      "phoneNumber" : numberInput.value
    });

    //Update DOM 
     generatePhoneBookToDom();
     generateInfoToDom();

     nameInput.value = "";
     numberInput.value = "";
     addNewContentDiv.style.display = "none";

  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}

//API request for general info
async function getInfo() {
  try {
    const response = await axios.get(`${BASEURL}/info`);

    return response.data;

  } catch (error) {
    errorMessege(error.response.data.error, errorDiv);
  }
}
//API request phoneBook data
async function getPhoneBook() {
    try {
      //API request
      const response = await axios.get(`${BASEURL}/api/persons`);
      const phoneBookObj = response.data;

      return phoneBookObj;
    } catch (error) {
      errorMessege(error.response.data.error, errorDiv);
    }
}

//Api request for delete persin from phoneBook by id
async function deletefromPhoneBook(id) {
    try {
      //API request
      const response = await axios.delete(`${BASEURL}/api/persons/${id}`);

    } catch (error) {
      errorMessege(error.response.data.error, errorDiv);
    }
}

/*---------- PHONEBOOK ----------*/
//generate PhoneBook To Dom from data obj
async function generatePhoneBookToDom() {
    try {
        clearPhoneBookFromDom();
        const phoneBookObj = await getPhoneBook(); //Send API request to get Phone Book data
        
        for (const phoneMember of phoneBookObj) {
            //Create details elements
            const phoneMemberDiv = createElement("div", "", "phone-member-div");
            const idElem = createElement("label", phoneMember.id , "id");
            const nameElem = createElement("label", phoneMember.name , "name");
            const numberElem = createElement("label", phoneMember.number , "number");
            const removeButton = createElement("button", "Delete" , "delte-btn");
             // Adding remove content API request function as listener + update phoeBook
            removeButton.addEventListener("click", removeContentFromDom);
            const callButton = createElement("button", "Call" , "call-btn");
            callButton.addEventListener("click", ()=> alert("calling..."))

            //Append elements
            phoneMemberDiv.appendChild(idElem);
            phoneMemberDiv.appendChild(nameElem);
            phoneMemberDiv.appendChild(numberElem);
            phoneMemberDiv.appendChild(callButton);
            phoneMemberDiv.appendChild(removeButton);
            phonebookDiv.appendChild(phoneMemberDiv);
        }

    } catch (error) {
        console.log(error)
        errorMessege(error.response.data.error, errorDiv);
    }
}

function clearPhoneBookFromDom() {
    document.querySelectorAll(".phone-member-div").forEach((menber) => menber.remove());
}

// Remove phoneMember from DOM and DB
function removeContentFromDom(event) {
    try {
        // Reach the element id through the parent, reach the number contained in the content
        const phoneMemberIdNum = event.target.parentElement.firstElementChild.textContent; 
        deletefromPhoneBook(phoneMemberIdNum); // Delete from DB
        generatePhoneBookToDom(); //Update the DOM according to changes
        generateInfoToDom(); //Update info on DOM
    } catch (error) {
        errorMessege(error.response.data.error, errorDiv);
    }
}
// Serch contact on every key press
serchBar.addEventListener("keyup", (event) => {
  const searchStr = serchBar.value.toLowerCase();
  const allContactsNamesElem = document.querySelectorAll('.name');
  for (let i = 0; i < allContactsNamesElem.length; i++) {
    const contactName = allContactsNamesElem[i];
    filterContactsByStr(contactName, searchStr);
  }
})

// Gets a nameElem and a string. If it contains the string it will display the contact otherwise it will disappear.
function filterContactsByStr(nameElem, searchStr) {
  const nameContent = nameElem.textContent.toLowerCase()
  if (nameContent.includes(searchStr)) {
    nameElem.parentElement.style.display = ''
  } else {
    nameElem.parentElement.style.display = 'none'
  }
}
/*---------- ERROR HANDLER ----------*/
//Display Error massege
function errorMessege(messege, element) {
    const errorElem = document.createElement('div');
    errorElem.textContent = `Sorry ${messege}, please try again! ❌`;
    errorElem.classList.add('error-messege');
    element.appendChild(errorElem);
    setTimeout(() => errorElem.remove(), 5000);
  }

/*---------- DOM RELATED ----------*/
//General create element function
function createElement(tagName, textContent, className) {
    const newElem = document.createElement(tagName);
    newElem.textContent = textContent;
    newElem.classList.add(className);
    return newElem;
  }

//
async function generateInfoToDom() {
  clearInfo();
  const infoObj = await getInfo(); //Get obj from Api request
  const peopleNum = createElement("h3", infoObj.peopleNum, "info");
  const date = createElement("h3", infoObj.date, "info");
  infoDiv.appendChild(peopleNum);
  infoDiv.appendChild(date);
}

function clearInfo() {
  document.querySelectorAll(".info").forEach((elem) => elem.remove());
}