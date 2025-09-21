import axios from 'axios';

export const sendQueryToBackend = async (query) => {
  try {
    const response = await axios.post('http://localhost:8080/api/query', { query });
    return response.data.response;  // Ensure this matches the response structure from your Spring Boot backend
  } catch (error) {
    console.error("Error in API call:", error);
    return "Sorry, there was an error processing your request.";
  }
};
