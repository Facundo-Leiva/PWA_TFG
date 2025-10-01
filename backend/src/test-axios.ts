import axios from "axios";

async function testRequest() {
    try {
        const response = await axios.get("http://localhost:3000/usuarios"); 
        console.log(response.data);
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

testRequest();