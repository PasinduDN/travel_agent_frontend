import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ChatBox = ({ chatContent }) => {
  return (
    <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', borderRadius: 1, minHeight: '200px' }}>
      <Paper sx={{ padding: 2, backgroundColor: 'white' }}>
        <Typography variant="body1" color="text.primary">{chatContent}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBox;
