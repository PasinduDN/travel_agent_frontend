// src/pages/TripDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Button,
    Typography,
    Paper,
    Box,
    Grid,
    TextField,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Card,
    CardContent,
    Link,
    Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TripDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tripPlan = location.state?.tripData || "No trip plan was generated. Go back to create one!";
    console.log("tripPlan in tripData" + location.state.tripData);
    console.log("tripPlan in query" + location.state.query);
    console.log("tripPlan in location" + location.state.location);
    console.log("tripPlan in start_date" + location.state.start_date);
    console.log("tripPlan in endDate" + location.state.endDate);

    const initialAIMessage = location.state?.tripData || "No trip plan was generated. Go back to create one!";

    const [messages, setMessages] = useState([
        { id: 1, sender: 'AI', text: initialAIMessage }
    ]);
    const [newMessage, setNewMessage] = useState('');

    // Social media links and location data
    const [socialLinks] = useState([
        { platform: 'Facebook', url: 'https://facebook.com/srilankatourism', icon: <FacebookIcon /> },
        { platform: 'Twitter', url: 'https://twitter.com/srilankatourism', icon: <TwitterIcon /> },
        { platform: 'Instagram', url: 'https://instagram.com/srilankatourism', icon: <InstagramIcon /> },
        { platform: 'YouTube', url: 'https://youtube.com/srilankatourism', icon: <YouTubeIcon /> }
    ]);

    const [mapLocations] = useState([
        { name: 'Colombo', lat: 6.9271, lng: 79.8612, description: 'Commercial capital of Sri Lanka' },
        { name: 'Kandy', lat: 7.2906, lng: 80.6337, description: 'Cultural capital with Temple of Tooth' },
        { name: 'Galle', lat: 6.0329, lng: 80.2170, description: 'Historic fort city' },
        { name: 'Ella', lat: 6.8667, lng: 81.0500, description: 'Beautiful hill station' }
    ]);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: messages.length + 1,
                sender: 'Human',
                text: newMessage
            };
            setMessages((prev) => [...prev, userMessage]);

            try {
                const sessionId = "demo-session"; // or generate dynamically
                const response = await fetch(`http://127.0.0.1:8000/api/process_preferences/${sessionId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        preferences_text: newMessage,
                        location: location.state.location,
                        start_date: location.state.start_date,
                        end_date: location.state.end_date
                    }),
                });

                const data = await response.json();

                const aiMessage = {
                    id: messages.length + 2,
                    sender: 'AI',
                    text: data.result
                };

                setMessages((prev) => [...prev, aiMessage]);
            } catch (error) {
                console.error("Error fetching AI response:", error);
            }

            setNewMessage('');
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };


    return (
        // <Container maxWidth="xl" sx={{ height: '80vh', paddingY: 4 }}></Container>
        <Container maxWidth="xl" sx={{ height: '100vh', paddingY: 4 }}>
            <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Travel Dashboard
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleGoBack}
                    sx={{
                        backgroundColor: '#3498db',
                        '&:hover': { backgroundColor: '#2980b9' },
                        borderRadius: 2,
                        px: 3
                    }}
                >
                    ← Plan Another Trip
                </Button>
            </Box>

            <Grid container spacing={2}>
                {/* Col 01 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: 3,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Chat Header */}
                        <Box sx={{
                            padding: 2,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderBottom: '1px solid rgba(255,255,255,0.2)',
                            flexShrink: 0
                        }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                AI Travel Assistant
                            </Typography>
                        </Box>

                        {/* Messages Container */}
                        <Box sx={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            minHeight: 0
                        }}>
                            {messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: message.sender === 'AI' ? 'flex-start' : 'flex-end',
                                        mb: 1
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            flexDirection: message.sender === 'AI' ? 'row' : 'row-reverse',
                                            maxWidth: '80%'
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                backgroundColor: message.sender === 'AI' ? '#4CAF50' : '#2196F3',
                                                mx: 1
                                            }}
                                        >
                                            {message.sender === 'AI' ? <SmartToyIcon sx={{ fontSize: 18 }} /> : <PersonIcon sx={{ fontSize: 18 }} />}
                                        </Avatar>
                                        <Paper
                                            sx={{
                                                padding: 1.5,
                                                backgroundColor: message.sender === 'AI'
                                                    ? 'rgba(255,255,255,0.9)'
                                                    : 'rgba(33,150,243,0.9)',
                                                color: message.sender === 'AI' ? '#333' : 'white',
                                                borderRadius: 2,
                                                maxWidth: '100%'
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                                                {message.text}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* Chat Input */}
                        <Box sx={{
                            padding: 2,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderTop: '1px solid rgba(255,255,255,0.2)',
                            flexShrink: 0
                        }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            borderRadius: 2,
                                            '& fieldset': { border: 'none' }
                                        }
                                    }}
                                />
                                <IconButton
                                    onClick={handleSendMessage}
                                    sx={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#45a049' },
                                        borderRadius: 2
                                    }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Col 02 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}>

                        {/* Trip Itinerary */}
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 2,
                                height: '100%',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2, flexShrink: 0 }}>
                                🗺️ Your Itinerary
                            </Typography>
                            <Paper
                                variant="outlined"
                                sx={{
                                    padding: 2,
                                    backgroundColor: 'rgba(255,255,255,0.8)',
                                    borderRadius: 2,
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    flex: 1,
                                    overflow: 'auto',
                                    minHeight: 0
                                }}
                            >
                                <Typography variant="body2">
                                    {tripPlan}
                                </Typography>
                            </Paper>
                        </Paper>

                        {/* Social Media Links */}
                        {/* <Paper
                            elevation={3}
                            sx={{
                                padding: 2,
                                height: 'calc(40% - 16px)',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2, flexShrink: 0 }}>
                                🌐 Connect & Explore
                            </Typography>
                            <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                                <List sx={{ padding: 0 }}>
                                    {socialLinks.map((social, index) => (
                                        <ListItem key={index} sx={{ padding: 1 }}>
                                            <Card sx={{
                                                width: '100%',
                                                backgroundColor: 'rgba(255,255,255,0.8)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    transform: 'translateY(-2px)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }}>
                                                <CardContent sx={{ padding: '12px !important', display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ color: '#3498db', mr: 2 }}>
                                                        {social.icon}
                                                    </Box>
                                                    <Link
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            textDecoration: 'none',
                                                            color: '#2c3e50',
                                                            fontWeight: 'medium',
                                                            '&:hover': { color: '#3498db' }
                                                        }}
                                                    >
                                                        Visit Sri Lanka {social.platform}
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Paper> */}
                    </Box>
                </Grid>

                {/* Col 03 */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            height: '100%',
                            borderRadius: 3,
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Map Header */}
                        <Box sx={{
                            padding: 2,
                            backgroundColor: 'rgba(44,62,80,0.9)',
                            color: 'white',
                            flexShrink: 0
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                📍 Travel Locations
                            </Typography>
                        </Box>

                        {/* Map Container (Placeholder) */}
                        <Box sx={{
                            height: '40%',
                            backgroundColor: '#34495e',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            backgroundImage: `
                            radial-gradient(circle at 25% 25%, #3498db 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, #e74c3c 0%, transparent 50%),
                            radial-gradient(circle at 75% 25%, #f39c12 0%, transparent 50%),
                            radial-gradient(circle at 25% 75%, #27ae60 0%, transparent 50%)
                        `,
                            flexShrink: 0
                        }}>
                            <Box sx={{ textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 3, borderRadius: 2 }}>
                                <LocationOnIcon sx={{ fontSize: 40, mb: 1 }} />
                                <Typography variant="h6">Interactive Map</Typography>
                                <Typography variant="body2">Explore your destinations</Typography>
                            </Box>
                        </Box>

                        {/* Location List */}
                        {/* <Box sx={{
                            flex: 1,
                            padding: 2,
                            overflowY: 'auto',
                            minHeight: 0,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 2, flexShrink: 0 }}>
                                Popular Destinations
                            </Typography>
                            <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                                {mapLocations.map((location, index) => (
                                    <Card
                                        key={index}
                                        sx={{
                                            mb: 2,
                                            backgroundColor: 'rgba(255,255,255,0.9)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,1)',
                                                transform: 'translateX(4px)',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                            }
                                        }}
                                    >
                                        <CardContent sx={{ padding: '16px !important' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                <LocationOnIcon sx={{ color: '#e74c3c', mr: 1, mt: 0.5 }} />
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                        {location.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                                                        {location.description}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#95a5a6' }}>
                                                        Lat: {location.lat}, Lng: {location.lng}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Box> */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
};

export default TripDashboard;