export default async function Logout(): Promise<{
  data: User;
  message: string;
}> {
  const response = await fetch(process.env.API_URL + "/api/auth/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  const data = await response.json();
  return data;
}