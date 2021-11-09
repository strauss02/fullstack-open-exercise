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
      url: "/api/persons",
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
      url: `/api/persons/${selectedContact}`,
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
  e.stopImmediatePropagation();
  e.preventDefault();
  showContactDetails(e.target.value);
});

async function addContact() {
  const nameField = document.getElementById("contectName").value;
  const numberField = document.getElementById("phoneNumber").value;
  try {
    const addContact = await axios({
      method: "POST",
      url: "/api/persons",
      data: {
        name: nameField,
        number: numberField,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(addContact.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
}

async function removeContact() {
  try {
    const numberField = Number(
      document.getElementById("contact-id").textContent
    );
    const removeContact = await axios({
      method: "DELETE",
      url: `/api/persons/${numberField}/remove`,
      data: {},
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert(removeContact.data.message);
  } catch (err) {
    alert(err.response.data.message);
  }
}

document.getElementById("removeContact").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  removeContact();
});

document.getElementById("addContact").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  addContact();
});

window.addEventListener("load", (e) => {
  ganeratePhoneBook();
});
