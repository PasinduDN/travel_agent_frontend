import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { sendQueryToBackend } from '../hooks/useApi';

const QueryForm = ({ setChatContent }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await sendQueryToBackend(query);
    setChatContent(result);  // Update the chat with the result
    setQuery('');
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
      <TextField
        label="Ask your question"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default QueryForm;
