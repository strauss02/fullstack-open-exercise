const baseUrl = '/api/persons'
const phoneInput = document.getElementById("phoneInput")
const nameInput = document.getElementById("nameInput")
const notyf = new Notyf();


document.getElementById("addContact").addEventListener("click",()=>{
    document.querySelector(".rendered-form").style.display = "block"
})

document.getElementById("cancel").addEventListener("click",()=>{
    document.querySelector(".rendered-form").style.display = "none"
    nameInput.value =""
    phoneInput.value =""
})

async function getAll(){
    const response = await axios.get(baseUrl)
    document.getElementById("phoneAderess").innerHTML = ""
    response.data.forEach(element => {
        const address = createElement("div","","phone")
        const name = createElement("label", element.name, "name")
        const number = createElement("label", element.number,"number")
        const removeBtn = createElement("button","remove", "removeBtn")
        address.appendChild(name)
        address.appendChild(number)
        address.appendChild(removeBtn)
        address.id = element.id
        document.getElementById("phoneAderess").appendChild(address)
        document.querySelectorAll(".removeBtn").forEach(btn=>{
            btn.addEventListener("click", removeContact)
        })
    });
}

async function addAddress(){
    if(!phoneInput.value || !nameInput){
        notyf.error('name or number is missing')
        return
    }
    try{
        const response = await axios.post(baseUrl,{
            name: nameInput.value,
            number: phoneInput.value
        })
        notyf.success(`${nameInput.value} added to address book`)
        nameInput.value =""
        phoneInput.value =""
        getAll()
    } catch{
        notyf.error(`${nameInput.value} is already on the address list`)
    }
}

document.getElementById("submit").addEventListener("click",addAddress)

//General create element function
function createElement(tagName, textContent, className) {
    const newElem = document.createElement(tagName);
    newElem.textContent = textContent;
    newElem.classList.add(className);
    return newElem;
}

async function removeContact(e){
    let id = e.target.parentElement.id
    await axios.delete(baseUrl+`/${id}`)
    getAll()

}




window.addEventListener('load', getAll)
