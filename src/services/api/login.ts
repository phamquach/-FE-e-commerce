export default async function loginAPI(
    email: string,
    password: string
): Promise<{
    data: User; message: string;
}> {
    try {
        const response = await fetch(process.env.API_URL + "/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        return data;
    } catch {
        throw new Error('Login failed')
    }
}