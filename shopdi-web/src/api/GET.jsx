
const baseUrl = "http://localhost:8080/";
const GET = async (url,token) => {
    
    console.log('token : ',token);
    const response = await fetch(baseUrl+url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
            "Access-Control-Allow-Origin": "http://localhost:5173",

        },
    });
    const data = await response.json();
    return data;
}

export default GET