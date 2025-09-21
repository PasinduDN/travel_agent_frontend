export async function sendPreferencesToBackend({ preferencesText, location, startDate, endDate }) {
  try {
    const response = await fetch("/api/process_preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        preferences_text: preferencesText,
        location,
        start_date: startDate,
        end_date: endDate,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.result; // LLM output
  } catch (error) {
    console.error("Error sending preferences:", error);
    return "Error processing your preferences. Please try again.";
  }
}
