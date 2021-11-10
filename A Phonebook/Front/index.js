/* eslint-disable no-undef */
const baseUrl = '/api/persons';
const phoneInput = document.getElementById('phoneInput');
const nameInput = document.getElementById('nameInput');
const notyf = new Notyf();

document.getElementById('addContact').addEventListener('click', () => {
  document.querySelector('.rendered-form').style.display = 'block';
});

document.getElementById('cancel').addEventListener('click', () => {
  document.querySelector('.rendered-form').style.display = 'none';
  nameInput.value = '';
  phoneInput.value = '';
});

// render contact
async function getAll() {
  try {
    const response = await axios.get(baseUrl);
    console.log(response);
    document.getElementById('phoneAderess').innerHTML = '';
    response.data.forEach((element) => {
      const address = createElement('div', '', 'phone');
      const name = createElement('label', element.name, 'name');
      const number = createElement('label', element.number, 'number');
      const removeBtn = createElement('button', 'remove', 'removeBtn');
      address.appendChild(name);
      address.appendChild(number);
      address.appendChild(removeBtn);
      address.id = element.id;
      document.getElementById('phoneAderess').appendChild(address);
      document.querySelectorAll('.removeBtn').forEach((btn) => {
        btn.addEventListener('click', removeContact);
      });
    });
  } catch (error) {
    notyf.error(error.response.data.error);
  }
}

// Add new contact
async function addAddress() {
  if (!phoneInput.value || !nameInput.value) {
    notyf.error('name or number is missing');
    return;
  }
  try {
    const response = await axios.get(`${baseUrl}/name/${nameInput.value}`);
    if (!response.data) {
      await axios.post(baseUrl, {
        name: nameInput.value,
        number: phoneInput.value,
      });
      notyf.success(`${nameInput.value} added to address book`);
    } else {
      await axios.put(`${baseUrl}/updateNumber`, {
        name: nameInput.value,
        number: phoneInput.value,
      });
    }
    nameInput.value = '';
    phoneInput.value = '';
    getAll();
  } catch (err) {
    notyf.error(err.response.data.error);
  }
}

document.getElementById('submit').addEventListener('click', addAddress);

// General create element function
function createElement(tagName, textContent, className) {
  const newElem = document.createElement(tagName);
  newElem.textContent = textContent;
  newElem.classList.add(className);
  return newElem;
}
// remove contact
async function removeContact(e) {
  let id = e.target.parentElement.id;
  await axios.delete(baseUrl + `/${id}`);
  getAll();
}

window.addEventListener('load', getAll);
