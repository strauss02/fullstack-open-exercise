/* eslint-disable no-undef */
const BASE_URL = 'http://localhost:3001/api'

const entriesSection = document.querySelector('.entries-container')

const entriesArray = []

function createEntry(id, name, number) {
  const entry = document.createElement('div')
  entry.className = 'entry'
  entry.textContent = `${id} | ${name} | ${number}`
  entriesArray.push(entry)
}

window.addEventListener('load', handleLoad)

async function handleLoad(e) {
  const data = await axios.get(`${BASE_URL}/persons`).then((res) => res.data)
  console.log(data)
  data.forEach((item) => createEntry(item.id, item.name, item.number))
  renderEntries()
}

function renderEntries() {
  entriesArray.forEach((item) => {
    entriesSection.append(item)
  })
}

createEntry(5, 'ido', 543)
