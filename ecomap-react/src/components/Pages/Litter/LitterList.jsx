import React, { useState } from "react";
import { Grid, Card, CardCover, CardContent, Typography, Modal, IconButton } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'react-bootstrap';

export default function LitterList({ mediaList }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleCardClick = (media) => {
        setModalContent(media);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setModalContent(null);
        setOpenModal(false);
    };

    return (
        <div>
            <Grid
                container
                spacing={2}
            >
                {mediaList.map((media, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Card sx={{ position: 'relative', width: '100%', height: '300px', borderRadius: '5px' }}>
                            <CardCover>
                                {media.type === 'image' && (
                                    <img
                                        src={media.src}
                                        loading="lazy"
                                        alt=""
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                )}
                                {media.type === 'video' && (
                                    <video
                                        ref={(videoRef) => {
                                            if (videoRef) {
                                                if (hoveredIndex === index) {
                                                    videoRef.play();
                                                } else {
                                                    videoRef.pause();
                                                    videoRef.currentTime = 0;
                                                }
                                            }
                                        }}
                                        loop
                                        muted
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                                    >
                                        <source src={media.src} type="video/mp4" />
                                    </video>
                                )}
                            </CardCover>
                            <CardContent
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    padding: 2,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row', 
                                    justifyContent: 'space-between'
                                }}>
                                <Typography
                                    level="body-lg"
                                    fontWeight="lg"
                                    textColor="#fff"
                                >
                                    {media.type === 'image' ? 'Image' : 'Video'}
                                </Typography>
                                <Button variant='light' onClick={() => handleCardClick(media)}>View</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div>
                    {modalContent && (
                        <>
                            {modalContent.type === 'image' && (
                                <img
                                    src={modalContent.src}
                                    alt=""
                                    style={{ maxWidth: '100%', maxHeight: '550px' }}
                                />
                            )}
                            {modalContent.type === 'video' && (
                                <video
                                    controls
                                    style={{ maxWidth: '100%', maxHeight: '550px' }}
                                >
                                    <source src={modalContent.src} type="video/mp4" />
                                </video>
                            )}
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    color: 'white',
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h5" id="modal-title" sx={{ mt: 2, color: 'white' }}>
                                {modalContent.caption}
                            </Typography>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
