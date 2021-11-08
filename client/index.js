const BASE_URL = 'http://localhost:3001/api'

const entriesSection = document.querySelector('.entries-container')

const entriesArray = []

function createEntry(id, name, number) {
  const entry = document.createElement('div')
  entry.className = 'entry'
  entry.textContent = `${id} | ${name} | ${number}`
  entriesSection.append(entry)
}

window.addEventListener('load', handleLoad)

async function handleLoad(e) {
  const data = await axios.get(`${BASE_URL}/persons`).then((res) => res)
  console.log(data)
}

function renderEntries() {
  entriesArray.forEach((item) => createEntry(item))
}

createEntry(5, 'ido', 543)
