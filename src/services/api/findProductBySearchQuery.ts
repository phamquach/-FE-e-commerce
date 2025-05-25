export default async function getProductsBySearchQuery(search_query?: string | null) {
    if (!search_query) {
        return;
    }
    try {
        const response = await fetch(process.env.API_URL + `/api/product?search_query=${encodeURIComponent(search_query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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