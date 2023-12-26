import React from "react";
import { useTranslation } from 'react-i18next';
import { Typography, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import "../About.css"; 
import NicotineIcon from '/nicotine.png';
import BioIcon from '/plant.svg';
import EarthIcon from '/earth.svg';


export default function About() {
    const { t } = useTranslation();

    const image = {
        // thumbnail: require('./nicotine.png')
    }

    return (
        <div className="about-container">
            <div className="about-content">
                <Typography variant="h5" className="about-heading">
                    {t('about.p1')}
                </Typography>
                {/* <Typography variant="h3" className="about-subheading">
                    {t('about.p2')}
                </Typography> */}
                <div className="card-container">
                    {/* Card 1 */}
                    <Card className="about-card" style={{ backgroundColor: '#f2f7f2', width: 200 }}>
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={NicotineIcon} alt="nicotine"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent>
                            {t('about.p3')}
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="about-card" style={{ backgroundColor: '#f2f7f2', width: 200 }}>
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={BioIcon} alt="bio"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent>
                            {t('about.p4')}
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="about-card" style={{ backgroundColor: '#f2f7f2', width: 200 }}>
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={EarthIcon} alt="earth"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent>
                            {t('about.p5')}
                        </CardContent>
                    </Card>
                </div>
                <Typography variant="body1" className="about-paragraph">
                    {t('about.p6')}
                </Typography>
                <Typography variant="body1" className="about-paragraph">
                    {t('about.p7')}
                </Typography>
                <Typography variant="body1" className="about-paragraph">
                    {t('about.p8')}
                </Typography>
                <ul className="about-list">
                    <li>{t('about.li1')}</li>
                    <li>{t('about.li2')}</li>
                    <li>{t('about.li3')}</li>
                </ul>
            </div>
            {/* <div className="about-content">
                Another container
            </div> */}
        </div>
    );
}
