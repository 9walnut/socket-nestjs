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

export const signup = async (userid, username, password) => {
  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid, username, password }),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return await response.json();
};
