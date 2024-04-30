const API_URL = "http://localhost:8080/login";

export async function loginToServer(username, password) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const { token } = await response.json();
    localStorage.setItem("jwt", token); // 토큰 저장
    return token;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}
