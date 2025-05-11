export default async function checkMe(): Promise<{
  data: User;
  message: string;
}> {
  const response = await fetch(process.env.API_URL + "/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Check me failed");
  }

  const data = await response.json();
  return data;
}