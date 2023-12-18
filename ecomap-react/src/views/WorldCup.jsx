import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function WorldCup() {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(10);

    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <div className='section'>
                <h1 className='title'>Litter World Cup</h1>
                <p className='subtitle'>Our Global Community</p>

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper elevation={1} className='headerBoxes'>
                            <h5>Total Litter</h5>
                            {/* Add the logic or data for the total litter here */}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={1} className='headerBoxes'>
                            <h5>Total Photos</h5>
                            {/* Add the logic or data for the total photos here */}
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={1} className='headerBoxes'>
                            <h5>Total Littercoin</h5>
                            {/* Add the logic or data for the total littercoin here */}
                        </Paper>
                    </Grid>
                </Grid>

                <div>
                    <h4>Litter Goal</h4>
                    <Paper elevation={3} sx={{width: '100%'}}>
                        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} sx={{height: 25}}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
                            </Box>
                        </LinearProgress>
                    </Paper>
                </div>
                <p>Global Leaderboard</p>
            </div>
            <div className='section'>
                <p>#LitterWorldCup</p>
                <div>
                    <p>Rank - Country Name</p>
                </div>
            </div>
        </div>
    );
}
