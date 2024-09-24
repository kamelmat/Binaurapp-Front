import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const TourGuide = () => {
    useEffect(() => {
        console.log("TourGuide component mounted");
        startTour();
    }, []);

    const startTour = () => {
        console.log("startTour function called");
        try {
            console.log("Starting tour...");
            const driverObj = driver({
                showProgress: true,
                steps: [
                    { element: '#sidebarIcons[to="/mixes"]', popover: { title: 'Mixes', description: 'Find your saved mixes here', side: "left", align: 'start' } },
                    { element: '#sidebarIcons[to="/soundscape"]', popover: { title: 'Soundscapes', description: 'Learn more about Soundscapes and load tracks from here', side: "left", align: 'start' } },
                    { element: '#sidebarIcons[to="/binaural"]', popover: { title: 'Binaural Waves', description: 'Learn more about Binaural tracks and load tracks from here', side: "left", align: 'start' } },
                    { element: '#sidebarIcons[to="/tutorial"]', popover: { title: 'Tutorials', description: 'Learn more about Binaurapp functionality and concepts here', side: "left", align: 'start' } },
                    // Mixer-specific steps
                    { element: '#metalButton2:first-child', popover: { title: 'Soundscape Selection', description: 'Choose a soundscape track here', side: "bottom", align: 'start' } },
                    { element: '#metalButton2:last-of-type', popover: { title: 'Binaural Track Selection', description: 'Choose a binaural track here', side: "bottom", align: 'start' } },
                    { element: '#metalButton3', popover: { title: 'Load Tracks', description: 'Click here to load your selected tracks', side: "bottom", align: 'start' } },
                    { element: '#metalButton:first-of-type', popover: { title: 'Play', description: 'Click here to play your loaded tracks', side: "bottom", align: 'start' } },
                    { element: '#favButton', popover: { title: 'Save Mix', description: 'Click here to save your mix', side: "bottom", align: 'start' } },
                ],
                onHighlightStarted: (element) => {
                    console.log("Highlight started for element:", element);
                    // You can add any specific logic here if needed
                },
            });

            console.log("Driver object created:", driverObj);
            driverObj.drive();
            console.log("Tour started");
        } catch (error) {
            console.error("Error starting tour:", error);
        }
    };

    return null; // This component doesn't render anything
};

