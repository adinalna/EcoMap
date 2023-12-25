import React, { useState, useEffect } from "react";
import { Modal, IconButton, Typography, Chip, Sheet, Table } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { InputLabel, FormControl, Select, MenuItem, Box, Tabs, Tab } from '@mui/material';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';

export default function LitterTagModal({
    open,
    handleClose,
    currentIndex,
    litter,
    bucketUrl
}) {

    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    const [selectedTag, setSelectedTag] = useState('');

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission here
        console.log('Selected Tag:', selectedTag);
        alert("SUBMIT");
        // Add your logic to submit the form data
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                m: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    m: '20px',
                    gap: "40px"
                }}>
                {litter && (
                    <>
                        <Sheet color="neutral" variant="plain"
                            sx={{
                                width: "500px",
                                height: "670px",
                                p: 4,
                                borderRadius: "5px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'start',
                                gap: '15px'
                            }}>
                            <h2>Tag Litter</h2>
                            <Tabs
                                value={tab}
                                onChange={handleTabChange}
                                centered
                                variant="fullWidth"
                                TabIndicatorProps={{
                                    style: { backgroundColor: '#198754' } // Set the background color of the active tab indicator line
                                }}

                                sx={{ width: "100%", minHeight: 0, flex: "0 0 auto", color: '#198754' }}
                            >
                                <Tab label="Add Tag" sx={{ color: '#198754', "&.Mui-selected": { color: '#198754' } }} />
                                <Tab label="Delete Tag" sx={{ color: '#198754', "&.Mui-selected": { color: '#198754' } }} />
                            </Tabs>

                            {tab === 0 && (
                                <Sheet color="success" variant="outlined"
                                    sx={{
                                        width: "400px",
                                        height: "670px",
                                        p: 4,
                                        borderRadius: "5px",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        gap: '15px'
                                    }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="tag-select-label">Select Tag</InputLabel>
                                        <Select
                                            labelId="tag-select-label"
                                            id="tag-select"
                                            value={selectedTag}
                                            label="Select Tag"
                                            onChange={handleTagChange}
                                        >
                                            {/* Replace the following MenuItem components with your actual tag data */}
                                            <MenuItem value="tag1">Tag 1</MenuItem>
                                            <MenuItem value="tag2">Tag 2</MenuItem>
                                            <MenuItem value="tag3">Tag 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="success" onClick={handleFormSubmit}>
                                        Add Tag
                                    </Button>
                                </Sheet>
                            )}

                            {tab === 1 && (
                                <Sheet color="success" variant="outlined"
                                    sx={{
                                        width: "400px",
                                        height: "670px",
                                        p: 4,
                                        borderRadius: "5px",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'start',
                                        gap: '15px'
                                    }}>
                                    <Typography variant="h6">Delete Tags</Typography>
                                    {/* Add your UI for deleting tags */}
                                    {/* You can use similar components as the "Add Tags" tab */}
                                </Sheet>
                            )}
                            <Button variant="danger" style={{ width: "400px"}}>Delete Litter</Button>

                        </Sheet>
                        <Sheet color="neutral" variant="plain"
                            sx={{
                                maxwidth: "700px",
                                p: 4,
                                borderRadius: "5px",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '15px'
                            }}>
                            <div
                                style={{
                                    display: 'block',
                                }}
                            >
                                {litter.media[currentIndex].mediaType === 'image' && (
                                    <img
                                        src={`${bucketUrl}/${litter.media[currentIndex].path}`}
                                        alt=""
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '415px',
                                        }}
                                    />
                                )}
                                {litter.media[currentIndex].mediaType === 'video' && (
                                    <video
                                        controls
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '550px',
                                        }}
                                    >
                                        <source
                                            src={`${bucketUrl}/${litter.media[currentIndex].path}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>

                            {/* <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '15%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                top: '50%',
                right: '15%',
                transform: 'translateY(-50%)',
                color: 'white',
              }}
              >
              <ArrowForwardIosIcon />
            </IconButton> */}

                            <Table color="success" variant="outlined" sx={{ width: "700px" }}>
                                <tbody>
                                    <tr>
                                        <th style={{ width: "15%" }}>Country:</th>
                                        <td>{litter.country}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "15%" }}>Address:</th>
                                        <td style={{ width: "15%", maxheight: "65px", overflowX: "hidden", overflowY: "auto" }}>{litter.address}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "15%" }}>Picked Up:</th>
                                        <td>{litter.pickedUp ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: "15%" }}>Date Created</th>
                                        <td style={{ width: "15%" }}>{format(new Date(litter.dateCreated), 'MMMM d, yyyy h:mm a')}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Sheet>
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                color: 'white',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </Modal>
    );
}
