const baseUrl = 'http://localhost:8080/';
export async function signup(data) {
    const response = await fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}