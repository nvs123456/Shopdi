const baseUrl = "http://localhost:8080/";
const GET = async (url) => {
    const response = await fetch(baseUrl+url);
    const data = await response.json();
    return data;
}

export default GET