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

            //Append elements
            phoneMemberDiv.appendChild(idElem);
            phoneMemberDiv.appendChild(nameElem);
            phoneMemberDiv.appendChild(numberElem);
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
    } catch (error) {
        errorMessege(error.response.data.error, errorDiv);
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