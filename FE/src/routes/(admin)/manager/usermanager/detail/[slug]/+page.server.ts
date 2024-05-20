import axios from "axios"


export async function load({ params }) {
    const id = params.slug
    const result = await axios.get(`https://authenticateservice.azurewebsites.net/api/Authenticate/GetUser?id=${id}`)
    return result.data
}