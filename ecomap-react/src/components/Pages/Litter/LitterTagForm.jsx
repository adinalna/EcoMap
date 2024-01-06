import React, { useState, useEffect, forwardRef } from "react";
import { Table, Typography, Sheet, Checkbox, IconButton, Tooltip } from '@mui/joy';
import { InputLabel, FormControl, Select, MenuItem, FormControlLabel, Switch, Autocomplete, TextField, Paper } from '@mui/material';
import { Button, Stack } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../../axios-client';

export default function LitterTagForm({ litter }) {
    const [tags, setTags] = useState(litter.litterTags);
    const [selected, setSelected] = useState([]);
    const [unusedTag, setUnusedTag] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [count, setCount] = useState(1);
    const [isEditingCount, setIsEditingCount] = useState(false);

    useEffect(() => {
        fetchUnusedTagList();
        console.log("Litter", litter)
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

    const handleSwitchChange = (isChecked) => {
        const payload = {
            pickedUp: isChecked
        };

        axiosClient.put(`/litter/${litter.id}/pickup`, null, {
            params: payload
        })
            .then(({ data }) => {
            })
            .catch((err) => {
                console.error("Error in litter pickup update:", err);
            });
    };

    const handleSelectAllTag = (event) => {
        if (event.target.checked) {
            setSelected([...tags]);
        } else {
            setSelected([]);
        }
    };

    const isSelectedTag = (tag) => selected.some((selectedTag) => selectedTag.id === tag.id);

    const handleSelectTag = (event, index) => {
        const clickedTag = tags[index];
        const isCurrentlySelected = isSelectedTag(clickedTag);

        let newSelected = [];

        if (!isCurrentlySelected) {
            newSelected = [...selected, clickedTag];
        } else {
            newSelected = selected.filter((selectedTag) => selectedTag.id !== clickedTag.id);
        }

        setSelected(newSelected);
    };

    const handleTagsChange = (_, newValue) => {
        setSelectedTags(newValue.slice(0, 6));
    };

    const handleCountChange = (event) => {
        const newCount = Math.min(100, Math.max(1, parseInt(event.target.value, 10) || 1));
        setCount(newCount);
    };

    const handleEditCount = () => {
        // Toggle the editing state
        setIsEditingCount(!isEditingCount);
    };

    const handleConfirmEdit = () => {
        const updatedTags = selected.map(tag => ({ ...tag, count: count }));

        axiosClient.post(`/tag/count/update/batch`, updatedTags)
            .then(({ data }) => {
                const newTags = tags.map(tag => {
                    const updatedTag = data.find(t => t.id === tag.id);
                    return updatedTag ? updatedTag : tag;
                });
                setTags(newTags);
                setSelected([]);
            })
            .catch((err) => {
                console.error("Error in litter pickup update:", err);
            });

        setIsEditingCount(false);
    };

    const handleCancelEdit = () => {
        setIsEditingCount(false);
    };


    const handleDeleteTag = () => {
        // console.log('Selected Tags for delete:', selected);

        // Map the selected array to get only the ids
        const selectedIds = selected.map(tag => tag.id);

        axiosClient.post(`/tag/delete/batch`, selectedIds)
            .then(({ data }) => {
                const updatedTags = tags.filter(tag => !selectedIds.includes(tag.id));
                setTags(updatedTags);
                setSelected([]);

            })
            .catch((err) => {
                console.error("Error in litter pickup update:", err);
            });
    };


    const handleAddNewTags = (event) => {
        event.preventDefault();
        // console.log('Selected Tag:', selectedTags);
        axiosClient.post(`/tag/litter-tag/create/batch/${litter.id}`, selectedTags)
            .then(({ data }) => {
                // console.log("Added: ", data);
                const updatedTags = [...tags, ...data];
                setTags(updatedTags);
                setSelected([]);
            })
            .catch((err) => {
                console.error("Error in litter pickup update:", err);
            });
    };

    const handleDeleteLitter = () => {
        const litterIdToDelete = litter.id;
        console.log('Tag to delete:', litterIdToDelete);
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
            <FormControlLabel
                control={
                    <Switch
                        color="success"
                        defaultChecked={litter.pickedUp}
                        onChange={(event) => handleSwitchChange(event.target.checked)}
                    />
                }
                label="Litter Picked Up"
            />
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
                            <IconButton size="sm" color="danger" variant="solid" disabled={isEditingCount} onClick={handleDeleteTag}>
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
                                    onChange={handleSelectAllTag}
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
                            <tr key={index} onClick={(event) => handleSelectTag(event, index)}>
                                <td style={{ width: "12%" }}>
                                    <Checkbox
                                        color='success'
                                        checked={isSelectedTag(tag)}
                                        inputProps={{
                                            'aria-labelledby': `checkbox-${index}`,
                                        }}
                                    />
                                </td>
                                <td style={{ width: "70%" }}>{tag.titleValue}</td>
                                <td style={{ width: "15%" }}>
                                    {selected.find(s => s.id === tag.id)?.count || tag.count}
                                </td>
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
                            <Button variant="success" onClick={handleAddNewTags}>
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
                <Button variant="outline-danger" style={{ width: "100%" }} onClick={handleDeleteLitter}>
                    Delete Litter
                </Button>
            </FormControl>
        </Sheet >
    );
}
