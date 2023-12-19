import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LitterFilter({ tags, onFilterChange }) {
    const [litterPickedUp, setLitterPickedUp] = useState(null);

    const handleFilterChange = () => {
        // Call the callback function with the selected filters
        onFilterChange({
            litterPickedUp,
            selectedTags: [], // Replace with the actual selected tags logic
        });
    };

    return (
        <div
            style={{
                margin: '15px 0px',
                padding: '15px',
                borderRadius: '5px',
                backgroundColor: '#f0faf0',
                display: 'flex',
                justifyContent: 'center',
                gap: '5px',
                border: '1px solid #ebe6e6',
            }}
        >
            <ToggleButtonGroup
                sx={{
                    backgroundColor: '#fff',
                    marginRight: '8px',
                }}
                value={litterPickedUp}
                exclusive
                onChange={(e, litterPickedUp) => setLitterPickedUp(litterPickedUp)}
                aria-label="text alignment"
                size="small"
            >
                <ToggleButton value={null} aria-label="centered">
                    All
                </ToggleButton>
                <ToggleButton value={true} aria-label="centered">
                    Picked Up
                </ToggleButton>
                <ToggleButton value={false} aria-label="centered">
                    Not Picked Up
                </ToggleButton>
            </ToggleButtonGroup>

            <Autocomplete
                sx={{
                    width: '770px',
                    backgroundColor: '#fff',
                }}
                multiple
                limitTags={10}
                id="multiple-limit-tags"
                size="small"
                options={tags}
                getOptionLabel={(option) => option.tag}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Litter Tag"
                        placeholder="Litter Tag"
                    />
                )}
            />

            <Button variant="dark" onClick={handleFilterChange}>
                Search
            </Button>
        </div>
    );
};