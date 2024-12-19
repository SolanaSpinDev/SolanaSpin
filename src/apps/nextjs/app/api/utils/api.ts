export const fetchWithAuth = async (
    url: string,
    method: string,
    token: string,
    body?: {
        [key: string]: string | number;
    }
) => {
    let options: RequestInit = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    }
    if (body) {
        options = {
            ...options,
            body: JSON.stringify(body)
        }
    }

    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
