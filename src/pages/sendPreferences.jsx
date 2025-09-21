// sendPreferences.js
export async function sendPreferences(preferencesData) {
  try {
    const response = await fetch("http://localhost:8000/api/process_preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(preferencesData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to process preferences");
    }

    const result = await response.json();
    return result; // { result: "AI response text" }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
