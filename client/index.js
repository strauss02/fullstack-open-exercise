/* eslint-disable no-undef */

// const { default: axios } = require('axios')

/* ---------------------------- */
// REMEMBER TO FLIP THIS WHEN NOT USING LIVE SERVER

const BASE_URL = 'http://localhost:3001/api'
// const BASE_URL = '/api'

/* ---------------------------- */

const entriesSection = document.querySelector('.entries-container')
const infoSection = document.querySelector('h6')

const entriesArray = []

function createEntry(id, name, number) {
  const entry = document.createElement('div')
  const deleteBtn = document.createElement('button')
  entry.className = 'entry'
  entry.textContent = ` ${name} | ${number}`
  entry.setAttribute('data-id', id)
  deleteBtn.className = 'delete-button'
  deleteBtn.innerText = 'X'
  deleteBtn.addEventListener('click', handleDeleteClick)
  entry.append(deleteBtn)
  entriesArray.push(entry)
}

async function getPhonebookInfo() {
  axios.get(`${BASE_URL}/info`).then(async (res) => {
    infoSection.innerHTML = res.data
  })
}

window.addEventListener('load', handleLoad)

async function handleLoad(e) {
  entriesArray.length = 0
  const data = await axios.get(`${BASE_URL}/persons`).then((res) => res.data)
  console.log(data)
  data.forEach((item) => createEntry(item.id, item.name, item.number))
  renderEntries()
  getPhonebookInfo()
}

function handleDeleteClick(e) {
  const id = e.target.closest('div').getAttribute('data-id')
  axios
    .delete(`${BASE_URL}/persons/${id}`)
    .then((res) => {
      console.log('deleted!')
    })
    .catch((err) => {
      console.log('err occured while trying to delete.')
    })
  handleLoad()
}

async function renderEntries() {
  await entriesSection.replaceChildren()
  entriesArray.forEach((item) => {
    entriesSection.append(item)
  })
}
