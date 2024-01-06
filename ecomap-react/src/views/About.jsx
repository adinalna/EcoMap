import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Card, CardContent, CardHeader, CardMedia, Avatar } from "@mui/material";

import "../About.css"; 

import CigaretteStock from '/cigarette_stock.jpg';
import FoodStock from '/food_stock.jpg';
import EnvironmentStock from '/environment_stock.jpg';
import Earth from '/earth.png';
import Plant from '/plant.png';

export default function About() {
    // const { t } = useTranslation();
    const [localization, setLocalization] = useState({});
    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const fetchLocalization = async () => {
            const headers = new Headers()
            // headers.set('X-Test-Header', 'example-value');
            // headers.set('Accept-Language', 'ms-MY');
            if(language === "English"){
                headers.delete('Accept-Language');
                headers.append('Accept-Language', 'en');
                // headers.set('Accept-Language', 'en');
            } else if (language === "Malay") {
                headers.delete('Accept-Language');
                headers.append('Accept-Language', 'ms_MY');
                // headers.set('Accept-Language', 'ms-MY');
            } else if (language === "French") {
                headers.delete('Accept-Language');
                headers.append('Accept-Language', 'fr');
            }

            try {
                const response = await fetch('http://localhost:8080/api/i8n/localisation', {
                    method: 'GET',
                    headers: headers,
                });
                const data = await response.json();
                setLocalization(data);
            } catch (error) {
                console.error('Error fetching localization:', error);
            }
            
        };

        fetchLocalization();
    }, [language]);

    return (
        <div className="about-container">
            <div className="about-content">
                <select value={language} onChange={(e) => { setLanguage(e.target.value); }}>
                            <option value="English">English</option>
                            <option value="Malay">Malay</option>
                            <option value="French">French</option>
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
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={FoodStock}
                            alt="Card Image"
                            style={{ objectFit: 'cover', width: '100%' }}
                        />
                        <CardContent style={{ color: 'whitesmoke', paddingTop: '20%', fontSize:'20px' }}>
                            {localization.p4}
                        </CardContent>
                    </Card>


                    {/* Card 2 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)', }} >
                        
                        <CardMedia
                            component="img"
                            height="140"
                            image={CigaretteStock}
                            alt="Card Image"
                            style={{ objectFit: 'cover', width: '100%' }}
                        />
                        <CardContent style={{ color: 'whitesmoke', paddingTop: '20%', fontSize:'20px' }}>
                        {localization.p3}
                        </CardContent>
                    </Card>
                    

                    {/* Card 3 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300,  boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                        <CardMedia
                            component="img"
                            height="140"
                            image={EnvironmentStock}
                            alt="Card Image"
                            style={{ objectFit: 'cover', width: '100%' }}
                        />
                        <CardContent style={{ color: 'whitesmoke', paddingTop: '20%', fontSize:'20px' }}>
                            {localization.p5}
                        </CardContent>
                    </Card>
                </div>
                <div className='ab-p-div'>
                    <Typography variant="body1" className="about-paragraph">
                        {localization.p6}
                    </Typography>
                    <Typography variant="body1" className="about-paragraph">
                        {localization.p7}
                    </Typography>
                    <Typography variant="body1" className="about-paragraph">
                        {localization.p8}
                    </Typography>
                </div>
                
                {/* <ul className="about-list">
                    <li>{localization.li1}</li>
                    <li>{localization.li2}</li>
                    <li>{localization.li3}</li>
                </ul> */}

                {/* Cards */}
                <div className='stepsCard' style={{  width: 900, minHeight: 'none'}}>
                    <div className='imageDiv'>
                        {/* <Avatar src={Plant}></Avatar> */}
                        <Card className='fade-in-card'>
                            <CardContent className="fade-in-text">{localization.li1}</CardContent>
                        </Card>
                    </div>
                    <div className='imageDiv'>
                        {/* <Avatar src={Plant}></Avatar> */}
                        <Card className='fade-in-card'>
                            <CardContent className="fade-in-text">{localization.li2}</CardContent>
                        </Card>
                    </div>
                    <div className='imageDiv'>
                        {/* <Avatar src={Plant}></Avatar> */}
                        <Card className='fade-in-card'>
                            <CardContent className="fade-in-text">{localization.li3}</CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            {/* <div className="about-content">
                Another container
            </div> */}
        </div>

    );
}
