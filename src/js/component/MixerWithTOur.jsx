import React, { useEffect, useState } from "react";
import { Mixer } from "../views/Mixer.jsx";
import { OffCanvas } from "./OffCanvas.jsx";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router-dom";

export const MixerWithTour = () => {
    const [tourComplete, setTourComplete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        startTour();
    }, []);

    const startTour = () => {
        console.log("startTour function called");
        try {
            console.log("Starting tour...");
            const driverObj = driver({
                showProgress: true,
                steps: [
                    { element: '#metalButton2:first-child', popover: { title: 'Soundscape Selection', description: 'Choose a soundscape track here', side: "bottom", align: 'start' } },
                    { element: '#metalButton2:last-of-type', popover: { title: 'Binaural Track Selection', description: 'Choose a binaural track here', side: "bottom", align: 'start' } },
                    { element: '#metalButton3', popover: { title: 'Load Tracks', description: 'Click here to load your selected tracks', side: "bottom", align: 'start' } },
                    { element: '.metalButtonPlay', popover: { title: 'Play', description: 'Click here to play your loaded tracks', side: "bottom", align: 'start' } },
                    { element: '#favButton', popover: { title: 'Save Mix', description: 'Click here to save your mix', side: "bottom", align: 'start' } },
                    { element: '.sidebar a[href="/mixes"]', popover: { title: 'Mixes', description: 'Find your saved mixes here', side: "left", align: 'start' } },
                    { element: '.sidebar a[href="/soundscape"]', popover: { title: 'Soundscapes', description: 'Learn more about Soundscapes and load tracks from here', side: "left", align: 'start' } },
                    { element: '.sidebar a[href="/binaural"]', popover: { title: 'Binaural Waves', description: 'Learn more about Binaural tracks and load tracks from here', side: "left", align: 'start' } },
                    { element: '.sidebar a[href="/tutorial"]', popover: { title: 'Tutorials', description: 'Learn more about Binaurapp functionality and concepts here', side: "left", align: 'start' } },
                ],
                onHighlightStarted: (element) => {
                    console.log("Highlight started for element:", element);
                },
                onDeselected: (element) => {
                    if (element && element.getAttribute('href') === '/tutorial') {
                        setTourComplete(true);
                    }
                },
                onDestroyed: () => {
                    setTourComplete(true);
                },
            });

            console.log("Driver object created:", driverObj);
            driverObj.drive();
            console.log("Tour started");
        } catch (error) {
            console.error("Error starting tour:", error);
        }
    };

    useEffect(() => {
        if (tourComplete) {
            navigate('/dashboard');
        }
    }, [tourComplete, navigate]);

    return (
        <div style={{ display: 'flex' }}>
            <OffCanvas />
            <Mixer />
        </div>
    );
};
