export default async function verifyEmail(email: string, verifiedCode: string) {
    const response = await fetch(process.env.API_URL + "/api/auth/verify-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verifiedCode })
    });

    if (!response.ok) {
        throw new Error("Xác thực thất bại!");
    }

    const data = await response.json();
    return data;
}