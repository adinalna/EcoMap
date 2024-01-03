import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Card, CardContent, CardHeader, CardMedia } from "@mui/material";


import "../About.css"; 
import NicotineIcon from '/nicotine.png';
import BioIcon from '/plant.png';
import EarthIcon from '/earth.png';


export default function About() {
    const { t } = useTranslation();
    const [localization, setLocalization] = useState({});
    const [language, setLanguage] = useState("English");

    const image = {
        // thumbnail: require('./nicotine.png')
    }

    useEffect(() => {
        const fetchLocalization = async () => {
            if(language === "English"){
                try {
                    const response = await fetch('http://localhost:8080/api/i8n/localisation');
                    const data = await response.json();
                    setLocalization(data);
                } catch (error) {
                    console.error('Error fetching localization:', error);
                }
            } else if (language === "Malay") {
                try {
                    const response = await fetch('http://localhost:8080/api/i8n/localisation?lang=ms_MY');
                    const data = await response.json();
                    setLocalization(data);
                } catch (error) {
                    console.error('Error fetching localization:', error);
                }
            }
            
        };

        fetchLocalization();
    }, [language]);

    return (
        <div className="about-container">
            <div className="about-content">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="English">English</option>
                            <option value="Malay">Malay</option>
                </select>
                <div className="about-p1">
                    <Typography variant="h5" className="about-heading" style={{ marginTop: '10px' }}>
                        {localization.p1}
                    </Typography>
                </div>
                
                {/* <Typography variant="h3" className="about-subheading">
                    {t('about.p2')}
                </Typography> */}
                <div className="card-container">
                    {/* Card 1 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 15px 2px rgba(128, 128, 128, 0.5)', }} >
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={NicotineIcon} alt="nicotine"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent style={{ color: 'whitesmoke' }}>
                            {localization.p3}
                        </CardContent>
                    </Card>


                    {/* Card 2 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 15px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={BioIcon} alt="bio"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent style={{ color: 'whitesmoke' }}>
                            {localization.p4}
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300,  boxShadow: '5px 5px 15px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                        <CardMedia style={{ padding: 16, boxSizing: 'border-box' }}>
                            <img src={EarthIcon} alt="earth"  style={{ width: '80%', height: '80%', objectFit: 'cover' }} />
                        </CardMedia>
                        <CardContent style={{ color: 'whitesmoke' }}>
                            {localization.p5}
                        </CardContent>
                    </Card>
                </div>
                <Typography variant="body1" className="about-paragraph">
                    {localization.p6}
                </Typography>
                <Typography variant="body1" className="about-paragraph">
                    {localization.p7}
                </Typography>
                <Typography variant="body1" className="about-paragraph">
                    {localization.p8}
                </Typography>
                <ul className="about-list">
                    <li>{localization.li1}</li>
                    <li>{localization.li2}</li>
                    <li>{localization.li3}</li>
                </ul>
            </div>
            {/* <div className="about-content">
                Another container
            </div> */}
        </div>

    );
}
