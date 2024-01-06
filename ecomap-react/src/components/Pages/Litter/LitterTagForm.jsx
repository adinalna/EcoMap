import React, { useState, useEffect, forwardRef } from "react";
import { Table, Typography, Sheet, Checkbox, IconButton, Tooltip } from '@mui/joy';
import { InputLabel, FormControl, Select, MenuItem, FormControlLabel, Switch, Autocomplete, TextField, Paper } from '@mui/material';
import { Button, Stack } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../../axios-client';

export default function LitterTagForm({ litter }) {
    const tags = litter.litterTags;
    const [selected, setSelected] = useState([]);
    const [unusedTag, setUnusedTag] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [count, setCount] = useState(1);
    const [isEditingCount, setIsEditingCount] = useState(false);

    useEffect(() => {
        fetchUnusedTagList();
    }, []);

    const fetchUnusedTagList = async () => {
        try {
            const response = await axiosClient.get(`/tag/unused/${litter.id}`, { timeout: 5000 });
            const list = response.data;
            //   console.log("Unused Tags: ", list);
            setUnusedTag(list);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            // If the header checkbox is checked, select all tags
            setSelected(tags.map((tag, index) => index));
        } else {
            // If the header checkbox is unchecked, clear the selection
            setSelected([]);
        }
    };

    const handleClick = (event, index) => {
        const selectedIndex = selected.indexOf(index);
        let newSelected = [];

        if (selectedIndex === -1) {
            // If the clicked tag is not selected, add it to the selection
            newSelected = [...selected, index];
        } else {
            // If the clicked tag is already selected, remove it from the selection
            newSelected = selected.filter((i) => i !== index);
        }

        // Update the selected state
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleTagsChange = (_, newValue) => {
        setSelectedTags(newValue.slice(0, 6));
    };

    const handleCountChange = (event) => {
        // Validate if the input is within the desired range
        const newCount = Math.min(100, Math.max(1, parseInt(event.target.value, 10) || 1));
        setCount(newCount);
    };

    const handleEditCount = () => {
        // Toggle the editing state
        setIsEditingCount(!isEditingCount);
    };

    const handleConfirmEdit = () => {
        // Implement your logic to confirm the edit
        // You can use the count state for any further processing
        // ...

        // Reset the editing state
        setIsEditingCount(false);
    };

    const handleCancelEdit = () => {
        // Reset the count to its original value
        setCount(1);

        setIsEditingCount(false);
    };


    const handleDelete = () => {
        setCount(1);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission here
        console.log('Selected Tag:', selectedTags);
        alert('Selected Tag:', selectedTags);
        // Add your logic to submit the form data
    };

    return (
        <Sheet color="success" variant="plain"
            sx={{
                p: 4,
                gap: '15px',
                width: "500px",
                height: "670px",
                borderRadius: "5px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start'
            }}>
            <h2>Tag Litter</h2>
            <FormControlLabel control={<Switch color="success" />} label="Litter Picked Up" />
            <Stack direction="horizontal" style={{ height: "20px" }}>
                <div className="p-2">
                    <Typography level="body-lg">{"Current Tags"}</Typography>
                </div>
                <div className="p-2 ms-auto">
                    {selected.length > 0 && (
                        <>
                            {isEditingCount ? (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <TextField
                                        style={{ marginRight: "3px" }}
                                        type="number"
                                        id="countInput"
                                        label="Count"
                                        variant="outlined"
                                        size="small"
                                        InputProps={{ inputProps: { min: 1, max: 100 } }}
                                        value={count}
                                        onChange={handleCountChange}
                                    />
                                    <Tooltip title="Confirm Edit">
                                        <IconButton color="success" onClick={handleConfirmEdit} style={{ marginRight: "2px" }}>
                                            <CheckIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancel Edit">
                                        <IconButton color="danger" onClick={handleCancelEdit}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            ) : (
                                <Button variant="outline-success" onClick={handleEditCount}> Edit Count</Button>
                            )}
                        </>
                    )}
                </div>
                <div className="p-2">
                    {selected.length > 0 && (
                        <Tooltip title="Delete">
                            <IconButton size="sm" color="danger" variant="solid" disabled={isEditingCount} onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </Stack>
            <Sheet color="success" variant="outlined"
                sx={{
                    px: 2,
                    height: 240,
                    overflow: 'auto',
                    borderRadius: "5px",
                }}
            >
                <Table stickyHeader>
                    <thead>
                        <tr>
                            <th style={{ width: "12%" }}>
                                <Checkbox
                                    color='success'
                                    indeterminate={selected.length > 0 && selected.length < tags.length}
                                    checked={tags.length > 0 && selected.length === tags.length}
                                    onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all rows',
                                    }}
                                />
                            </th>
                            <th style={{ width: "70%" }}>Title</th>
                            <th style={{ width: "16%" }}>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag, index) => (
                            <tr key={index} onClick={(event) => handleClick(event, index)}>
                                <td style={{ width: "12%" }}>
                                    <Checkbox
                                        color='success'
                                        checked={isSelected(index)}
                                        inputProps={{
                                            'aria-labelledby': `checkbox-${index}`,
                                        }}
                                    />
                                </td>
                                <td style={{ width: "70%" }}>{tag.titleValue}</td>
                                <td style={{ width: "15%" }}>{tag.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <FormControl fullWidth style={{ gap: "10px" }}>
                <Stack direction="horizontal" style={{ height: "20px", margin: "15px 0px" }}>
                    <div className="p-2">
                        <Typography level="body-lg">{"Add Tags"}</Typography>
                    </div>
                    <div className="p-2 ms-auto">
                        {selectedTags.length > 0 && (
                            <Button variant="success" onClick={handleFormSubmit}>
                                Add Selected
                            </Button>
                        )}
                    </div>
                </Stack>
                <Autocomplete
                    sx={{
                        height: 100,
                        width: '435px',
                        backgroundColor: '#fff',
                    }}
                    multiple
                    id="multiple-limit-tags"
                    size="small"
                    options={unusedTag}
                    groupBy={(option) => option.group}
                    getOptionLabel={(option) => option.titleValue}
                    onChange={handleTagsChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Litter Tag"
                            placeholder="Litter Tag"
                        />
                    )}
                    value={selectedTags}
                />
                <Button variant="outline-danger" style={{ width: "100%" }}>Delete Litter</Button>
            </FormControl>
        </Sheet >
    );
}
