// HINWEIS: Alle API-Aufrufe sollten mit try-catch abgesichert werden!
// Denke daran, die passenden HTTP-Methoden zu verwenden (GET, POST, PUT, etc.)
const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export const registerApi = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      console.log("user registration is completed!");
      return result;
    }

    throw new Error(result?.message || "error during registration");
  } catch (error) {
    console.error("Error in registerApi:", error);
    throw error;
  }
};

export const loginApi = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (response.ok) {
      console.log("user logged in!");
      return result;
    }

    throw new Error(result?.message || "error during login");
  } catch (error) {
    console.error("Error in loginAPI:", error);
    throw error;
  }
};

export const payInApi = async (newBalance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/balance`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ balance: newBalance }),
    });
    const result = await response.json();

    if (response.ok) {
      console.log("new balance added");
      return result;
    }

    throw new Error(result?.message || "error in balance");
  } catch (error) {
    console.error("Error in payInApi:", error);
    throw error;
  }
};

export const chargeOffApi = async (newBalance) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/balance`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ balance: newBalance }),
    });
    const result = await response.json();

    if (response.ok) {
      console.log("balance updated successfully!");
      return result;
    }

    throw new Error(result?.message || "error updating balance");
  } catch (error) {
    console.error("Error in chargeOffApi:", error);
    throw error;
  }
};

export const getUserApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/currentUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const result = await response.json();

    if (response.ok) {
      console.log("current user");
      return result;
    }

    throw new Error(result?.message || "error fetching current user data");
  } catch (error) {
    console.error("Error in getUserApi :", error);
    throw error;
  }

  // AUFGABE: Hole die aktuellen Benutzerdaten vom Backend
  //
  // Diese Funktion wird OHNE Parameter aufgerufen!
  // Das Backend sollte den aktuell eingeloggten User anhand des Tokens erkennen.
  //
  // TODO:
  // - Sende eine Anfrage an dein Backend (z.B. GET /api/user)
  // - Hole den Benutzer anhand des gespeicherten Tokens
  // - Gib ein Objekt zurück mit folgendem Format:
  // {
  //    balance: 1000,
  //    transactions: []  // ← Immer leeres Array zurückgeben!
  // }
};
