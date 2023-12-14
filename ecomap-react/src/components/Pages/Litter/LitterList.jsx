import React, { useState } from "react";
import { Grid, Card, CardCover, CardContent, Typography, Modal, IconButton } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from 'react-bootstrap';

export default function LitterList({ litterList }) {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCardClick = (litter, index) => {
        setModalContent(litter);
        setCurrentIndex(index);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setModalContent(null);
        setCurrentIndex(0);
        setOpenModal(false);
    };

    return (
        <div>
            <Grid container spacing={2}>
                {litterList.map((litter, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                    >
                        <Card
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '300px',
                                borderRadius: '5px',
                                cursor: 'default',
                            }}
                        >
                            <CardCover>
                                {litter.medias.map((media, mediaIndex) => (
                                    <div
                                        key={mediaIndex}
                                        style={{
                                            display: mediaIndex === currentIndex ? 'block' : 'none',
                                        }}
                                    >
                                        {media.type === 'image' && (
                                            <img
                                                src={media.src}
                                                loading="lazy"
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '5px',
                                                }}
                                            />
                                        )}
                                        {media.type === 'video' && (
                                            <video
                                                ref={(videoRef) => {
                                                    if (videoRef) {
                                                        if (mediaIndex === currentIndex) {
                                                            videoRef.play();
                                                        } else {
                                                            videoRef.pause();
                                                            videoRef.currentTime = 0;
                                                        }
                                                    }
                                                }}
                                                loop
                                                muted
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                <source src={media.src} type="video/mp4" />
                                            </video>
                                        )}
                                    </div>
                                ))}
                            </CardCover>
                            <CardContent
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'right',
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <p
                                    style={{color: "#fff"}}
                                >
                                    {`1/${litter.medias.length}`}
                                </p>
                                <div
                                    style={{
                                        width: '100%',
                                        display:"flex", 
                                        justifyContent:"space-between",
                                        bottom: 0
                                    }}
                                >
                                    <Typography
                                        level="body-lg"
                                        fontWeight="lg"
                                        textColor="#fff"
                                    >
                                        {litter.title}
                                    </Typography>
                                    <Button
                                        variant='light'
                                        onClick={() => handleCardClick(litter, index)}
                                    >
                                        View
                                    </Button>
                                </div>
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
                            {modalContent.medias.map((media, mediaIndex) => (
                                <div
                                    key={mediaIndex}
                                    style={{
                                        display: mediaIndex === currentIndex ? 'block' : 'none',
                                    }}
                                >
                                    {media.type === 'image' && (
                                        <img
                                            src={media.src}
                                            alt=""
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '550px',
                                            }}
                                        />
                                    )}
                                    {media.type === 'video' && (
                                        <video
                                            controls
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '550px',
                                            }}
                                        >
                                            <source src={media.src} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                            ))}
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
                                {modalContent.title}
                            </Typography>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}
