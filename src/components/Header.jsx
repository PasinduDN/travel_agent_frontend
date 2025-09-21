import React, { useState } from 'react';
import { Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Header = ({ setLanguage }) => {
    const [open, setOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        setLanguage(event.target.value);
        handleClose();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px' }}>
            <Button variant="contained" onClick={handleOpen}>Choose a language</Button>
            <Modal open={open} onClose={handleClose}>
                <div style={{ padding: 20, backgroundColor: 'white', margin: '100px auto', width: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel>Language</InputLabel>
                        <Select value={selectedLanguage} onChange={handleLanguageChange}>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Spanish">Spanish</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                            <MenuItem value="German">German</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Modal>
        </div>
    );
};

export default Header;
