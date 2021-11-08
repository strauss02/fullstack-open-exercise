"use strict";

function displayContacts(allContacts) {
  const phonebookParent = document.getElementById("select-phonebook");
  for (let contact of allContacts) {
    const optionElement = document.createElement("option");
    optionElement.setAttribute("value", contact.id);
    optionElement.textContent = contact.name;

    phonebookParent.append(optionElement);
  }
}

async function ganeratePhoneBook() {
  try {
    const phonebookJson = await axios({
      method: "GET",
      url: "http://localhost:3001/api/persons",
      data: {},
      headers: {
        "Content-Type": "application/json",
      },
    });
    displayContacts(phonebookJson.data);
  } catch (err) {
    console.log(err.message);
  }
}

function displayContactDetails(contactDetails) {
  const contactId = document.getElementById("contact-id");
  const contactName = document.getElementById("contact-name");
  const contactNumber = document.getElementById("contact-number");
  contactId.textContent = contactDetails.id;
  contactName.textContent = contactDetails.name;
  contactNumber.textContent = contactDetails.number;
}

async function showContactDetails(selectedContact) {
  try {
    const contactDetails = await axios({
      method: "GET",
      url: `http://localhost:3001/api/persons/${selectedContact}`,
      data: {},
      headers: {
        "Content-Type": "application/json",
      },
    });
    displayContactDetails(contactDetails.data);
  } catch (err) {
    console.log(err.message);
  }
}

document.getElementById("select-phonebook").addEventListener("change", (e) => {
  e.preventDefault();
  console.log(e.target.value);
  showContactDetails(e.target.value);
});

async function addContact() {
  const nameField = document.getElementById("contectName").value;
  const numberField = document.getElementById("phoneNumber").value;
  try {
    await axios({
      method: "POST",
      url: "http://localhost:3001/api/persons",
      data: {
        name: nameField,
        number: numberField,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err.message);
  }
}

document.getElementById("addContact").addEventListener("click", (e) => {
  addContact();
});

function removeContact() {}

window.addEventListener("load", (e) => {
  ganeratePhoneBook();
});
