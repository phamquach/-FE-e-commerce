

export default async function getProducts(url: string) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;
}