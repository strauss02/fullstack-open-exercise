const baseUrl = 'http://localhost:3001/api/notes'

async function getAll(){
    const request = await axios.get(baseUrl)
    console.log(request.data)
}


document.getElementById("try").addEventListener("click",getAll)