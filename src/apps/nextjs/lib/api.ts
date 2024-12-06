export const fetchWithAuth = async (url: string, accessToken: string) => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};
