import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import injectContext from "../src/js/store/appContext.js";
// Custom Component
import ScrollToTop from "../src/js/component/ScrollToTop.jsx";
import { BackendURL } from "../src/js/component/BackendURL.jsx";
import { Navbar } from "../src/js/component/Navbar.jsx";
import { Footer } from "../src/js/component/Footer.jsx";
import { OffCanvas } from "../src/js/component/OffCanvas.jsx";
// Custom Pages
import { Home } from "../src/js/views/Home.jsx";
import { Demo } from "../src/js/views/Demo.jsx";
import { Single } from "../src/js/views/Single.jsx";
import { SignUp } from "../src/js/views/SignUp.jsx";
import { Login } from "../src/js/views/Login.jsx";
import { AboutUs } from "../src/js/views/AboutUs.jsx";
import { Binaural } from "../src/js/views/Binaural.jsx";
import { Profile } from "../src/js/views/Profile.jsx";
import { Playlist } from "../src/js/views/Playlist.jsx";
import { Soundscape } from "../src/js/views/Soundscape.jsx";
import { Tutorial } from "../src/js/views/Tutorial.jsx";
import { Mixes } from "../src/js/views/Mixes.jsx";
import { Alpha } from "../src/js/views/Alpha.jsx";
import { Theta } from "../src/js/views/Theta.jsx";
import { Delta } from "../src/js/views/Delta.jsx";
import { Meditation } from "../src/js/views/Meditation.jsx";
import { Sleep } from "../src/js/views/Sleep.jsx";
import { Focus } from "../src/js/views/Focus.jsx";
import { Dashboard } from "../src/js/views/Dashboard.jsx";
import { Mixer } from "../src/js/views/Mixer.jsx";
import { UploadBinaural } from "../src/js/views/UploadBinaural.jsx";
import { UploadSoundscape } from "../src/js/views/UploadSoundscape.jsx";
import { UploadTutorial } from "../src/js/views/UploadTutorial.jsx";
import { Mail } from "../src/js/views/Mail.jsx";

// Spotify Auth App
import { SpotifyCallback } from '../src/js/component/SpotifyCallback.jsx';
import { EditMixes } from "../src/js/views/EditMixes.jsx";
import { Techologies } from "../src/js/views/Technologies.jsx";
import { TourGuide } from "./js/component/TourGuide.js";
import { MixerWithTour } from "../src/js/component/MixerWithTOur.jsx";


// Componente para manejar la lógica de renderizado condicional
const ConditionalNavbarOrSidebar = () => {
    const location = useLocation();

    // Rutas donde se debe mostrar el Navbar
    const navbarRoutes = ["/", "/dashboard"];

    const showNavbar = navbarRoutes.includes(location.pathname);

    return (
        <>
            {showNavbar ? <Navbar /> : <OffCanvas />}
        </>
    );
};

// Create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <ConditionalNavbarOrSidebar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/binaural" element={<Binaural />} />
                        <Route path="/alpha" element={<Alpha />} />
                        <Route path="/theta" element={<Theta />} />
                        <Route path="/delta" element={<Delta />} />
                        <Route path="/mixes" element={<Mixes />} />
                        <Route path="/editmixes" element={<EditMixes />} />
                        <Route path="/playlist" element={<Playlist />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/soundscape" element={<Soundscape />} />
                        <Route path="/tutorial" element={<Tutorial />} />
                        <Route path="/meditation" element={<Meditation />} />
                        <Route path="/sleep" element={<Sleep />} />
                        <Route path="/focus" element={<Focus />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/mixer" element={<Mixer />} />
                        <Route path="/uploadbinaural" element={<UploadBinaural />} />
                        <Route path="/uploadsoundscape" element={<UploadSoundscape />} />
                        <Route path="/uploadtutorial" element={<UploadTutorial />} />
                        <Route path="/callback" element={<SpotifyCallback />} />
                        <Route path="/mail" element={<Mail />} />
                        <Route path="/technologies" element={<Techologies />} />
                        <Route path="/TourGuide" element={<TourGuide />} />
                        <Route path="/MixerWithTour" element={<MixerWithTour />} />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
