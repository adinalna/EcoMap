import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Autocomplete, TextField, Select, Stack } from '@mui/material';
import { Button } from 'react-bootstrap';

export default function LitterFilter({ tags, onFilterChange }) {
    const [litterPickedUp, setLitterPickedUp] = useState("All");
    const [sortLitter, setSortLitter] = useState("Latest");
    const [selectedTags, setSelectedTags] = useState([]);

    const handleFilterChange = () => {

        onFilterChange({
            litterPickedUp,
            selectedTags,
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
                gap: '7px',
                border: '1px solid #ebe6e6',
            }}
        >
            <Stack direction="row" spacing={1}>
                <FormControl size="small">
                    <InputLabel>Litter Pickup</InputLabel>
                    <Select
                        sx={{
                            backgroundColor: '#fff',
                            marginRight: '8px',
                            minWidth: '150px',
                        }}
                        label="Litter Pickup"
                        size="small"
                        value={litterPickedUp}
                        onChange={(e) => setLitterPickedUp(e.target.value)}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"pickedUp"}>Picked Up</MenuItem>
                        <MenuItem value={"notPickedUp"}>Not Picked Up</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Autocomplete
                sx={{
                    width: '700px',
                    backgroundColor: '#fff',
                }}
                multiple
                id="multiple-limit-tags"
                size="small"
                options={tags}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.titleValue}
                onChange={(event, newValue) => setSelectedTags(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Litter Tag"
                        placeholder="Litter Tag"
                    />
                )}
            />
            <Button variant="dark" onClick={handleFilterChange} style={{marginLeft: "10px"}}>
                Search
            </Button>
        </div>
    );
}
