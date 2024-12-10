export const fetchWithAuth = async (
    url: string,
    accessToken: string,
    options: RequestInit = {}
) => {
    const res = await fetch(url, {
        method: "POST", //default to POST
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json", // Default content type
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

// example POST
// const createResource = async () => {
//     const { data: session } = useSession();
//
//     if (!session || !session.validity) {
//         console.error("User is not authenticated");
//         return;
//     }
//
//     try {
//         const response = await fetchWithAuth(
//             "https://example.com/api/resource", // Replace with your API URL
//             session.validity.valid_until.toString(), // Use the valid token
//             {
//                 method: "POST", // Specify POST method
//                 body: JSON.stringify({
//                     key: "value", // Replace with your POST payload
//                     anotherKey: "anotherValue",
//                 }),
//             }
//         );
//
//         console.log("Resource created:", response);
//     } catch (error) {
//         console.error("Error creating resource:", error);
//     }
// };
