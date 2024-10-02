import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import Binaural_Logo from "../../img/binaural_logos/Logo_binaurapp.png"

export const OffCanvas = () => {
    return (
        <aside className="sidebar d-flex flex-column vh-100 text-white overflow-hidden">
            <div className="header d-flex align-items-center p-3">
                <img id="BinaurappLogo" src={Binaural_Logo} alt="Binaural_logo" className="d-inline-block" />
                <p id="binaurapp" className="mb-0 ms-2">Binaurapp</p>
            </div>
            
            <nav className="flex-grow-1 d-flex flex-column justify-content-center">
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/">
                    <span className="material-symbols-outlined me-2">home</span>
                    <span>Home</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/dashboard">
                    <span className="material-symbols-outlined me-2">music_video</span>
                    <span>Dashboard</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/mixes">
                    <span className="material-symbols-outlined me-2">instant_mix</span>
                    <span>Mixes</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/tutorial">
                    <span className="material-symbols-outlined me-2">movie_info</span>
                    <span>Tutorials</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/binaural">
                    <span className="material-symbols-outlined me-2">waves</span>
                    <span>Binaural Waves</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/soundscape">
                    <span className="material-symbols-outlined me-2">stock_media</span>
                    <span>Soundscapes</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/playlist">
                    <span className="material-symbols-outlined me-2">library_music</span>
                    <span>Playlist</span>
                </Link>
            </nav>
            
            <div className="mt-auto p-3">
                <hr className="my-3" />
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/profile">
                    <img id="profileImg" src={Binaural_Logo} alt="Profile" className="me-2" />
                    <span>Profile</span>
                </Link>
                <Link className="d-flex align-items-center text-decoration-none text-white py-2" to="/">
                    <span id="logoutIcon" className="material-symbols-outlined me-2">logout</span>
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
};