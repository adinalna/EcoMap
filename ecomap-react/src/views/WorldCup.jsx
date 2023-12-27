import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {TypeAnimation} from "react-type-animation";
import {LinearProgress, Stack} from "@mui/material";

export default function WorldCup() {

    //Litter Overall Totals Logic
    const totals = [
        { title: 'Total Litter', number: '752456' },
        { title: 'Total Photos', number: '478456' },
        { title: 'Total LitterCoin', number: '5456' }
    ];

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Litter Target Logic
    const targetValue = 1000000; // Example target
    const currentData = 752456;  // Example current data

    // Calculate the percentage of current data towards the target
    const progressPercentage = parseFloat((currentData / targetValue * 100).toFixed(2));


    return (
        <div>
            <div className='section'>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className='headerBoxes' variant="outlined">
                            <Stack spacing={2}>
                                <h1 className='title'>Litter World Cup</h1>
                                <TypeAnimation
                                    sequence={[
                                        'Our Global Community',
                                        3500,
                                        'Our Global Impact',
                                        3500,
                                        'Our Global Progress',
                                        3500,
                                    ]}
                                    wrapper="span"
                                    speed={25}
                                    className='subtitle'
                                    repeat={Infinity}
                                />
                                <Grid container >
                                    {totals.map((item) => (
                                        <Grid item xs={4} key={item.title}>
                                            <Paper variant="outlined" className="totalOverall">
                                                <h4>{item.title}</h4>
                                                <p>{numberWithCommas(item.number)}</p>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={1} className='headerBoxes' variant="outlined">
                            <h5>Litter Target</h5>
                            <p>1,000,000</p>
                            <p>Previous Target</p>
                            <p>500,000</p>
                            <LinearProgress variant="determinate" value={progressPercentage} />
                            <p>{progressPercentage}%</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={1} className='headerBoxes' variant="outlined">
                            <h5>Leaderboards</h5>
                            {/* Add the logic or data for the total photos here */}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
