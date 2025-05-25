export default async function updateUser(data: User) {
    try {
        const response = await fetch(process.env.API_URL + "/api/user-update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message);
        }

        return result
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
}