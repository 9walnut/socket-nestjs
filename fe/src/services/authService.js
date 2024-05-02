const API_URL = "http://localhost:8080/auth/login";

export async function loginToServer(userid, password) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const { token } = await response.json();
    localStorage.setItem("jwt", token);
    return token;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}
