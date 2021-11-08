"use strict"
const BASEURL = "http://localhost:3001"; 
const phonebookDiv = document.getElementById("phonebook-data");
const  errorDiv = document.getElementById("error-div");

/*---------- NETWORK ----------*/
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
            //Append elements
            phoneMemberDiv.appendChild(idElem);
            phoneMemberDiv.appendChild(nameElem);
            phoneMemberDiv.appendChild(numberElem);
            phonebookDiv.appendChild(phoneMemberDiv);
        }

    } catch (error) {
        errorMessege(error.response.data.error, errorDiv);
    }
}

function clearPhoneBookFromDom() {
    document.querySelectorAll(".phone-member-div").forEach((menber) => menber.remove());
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