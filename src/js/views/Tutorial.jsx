import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/tutorials.css";
import { useNavigate } from "react-router-dom";
import back1 from "../../img/headphones.png"


export const Tutorial = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate();

    const start = useRef(null);
    const mixer = useRef(null);
    const playlist = useRef(null);
    const what = useRef(null);

    // useEffect(() => {
    //     if (!store.isLogin) {
    //         alert("Please Log-In or Sign-Up");
    //         navigate("/login");
    //     }
    // }, [store.isLogin, navigate]);

    useEffect(() => {
        const scrollToRef = (ref) => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        switch (store.tutorialtSection) {
            case "start-section":
                scrollToRef(start);
                break;
            case "mixer-section":
                scrollToRef(mixer);
                break;
            case "playlist-section":
                scrollToRef(playlist);
            case "what-section":
                scrollToRef(what);
                break;
            default:
                break;
        }
    }, [store.tutorialSection]);
    console.log("current Section", store.tutorialSection);

    const [isVisibleFirst, setIsVisibleFirst] = useState(false);

    const handleDisplayInfoFirst = () => {
        setIsVisibleFirst(prev => !prev);
    };

    const [isVisibleSecond, setIsVisibleSecond] = useState(false);

    const handleDisplayInfoSecond = () => {
        setIsVisibleSecond(prev => !prev);
    };

    const [isVisibleThird, setIsVisibleThird] = useState(false);

    const handleDisplayInfoThird = () => {
        setIsVisibleThird(prev => !prev);
    };

    const [isVisibleFourth, setIsVisibleFourth] = useState(false);

    const handleDisplayInfoFourth = () => {
        setIsVisibleFourth(prev => !prev);
    };

    const openYouTubeVideo = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <div className="tutorial-welcome-section" style={{ backgroundImage: `url(${back1})` }}>
                <div className="container text-center tm-welcome-container">
                    <div className="tm-welcome">
                        <i className="fas tm-fa-big fa-music tm-fa-mb-big"></i>
                        <h1 className="text-uppercase mb-3 tm-site-name">Tutorials</h1>
                        <p className="tm-site-description">All you need to know</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row tm-albums-container grid">
                    {/* Card 1: Getting Started */}
                    <div id="binaurappCard" /* className="card" */>
                        <div id="start-section" className="row">
                            <div className="col-12 col-lg-3">
                                <figure className="effect-sadie">
                                    <img id="imageCard" className="rounded" src={"https://t4.ftcdn.net/jpg/08/17/40/67/240_F_817406710_lQakfpC6ZYSlsumK4CdhFCbDk3kcHdnr.jpg"} alt="Image" />
                                    <figcaption onClick={handleDisplayInfoFirst} >
                                        <h2>More info</h2>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-8 custom-text"> {/* Responsive text alignment */}
                                <h5 id="textHeader">Getting Started</h5>
                                <p id="textBody">PUT ON YOUR HEADPHONES! Sorry for the shout out! but yeah, you don´t get any of the fun without them. Why? basically all the "magic" happens thanks to ambisonics technology which you can appreciate in this case only by using headphones.
                                    So that´s the first thing you need to do. Right after that, we recommend getting familiar with the use of the mixer, and the different options you get for backing tracks (not karaoke kind, the actual track that backs the binaural waves up) and of course the uses of the Moving Binaural Waves.
                                </p>
                                <div id="buttonContainer">
                                    <button type="button" id="greenButtonAlone" onClick={() => openYouTubeVideo("https://youtu.be/8xeGxvje4ts")}>Tutorial Video</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isVisibleFirst && (
                        <div id="infoText">
                            <h5>Typical Questions</h5>
                            <p>-	Will any kind of headphones do? yes, any kind will do. Just like most things, the experience improves with better gear. In fact, we recommend you use closed type headphones (covering you ears) but any kind will work.
                            </p>
                        </div>
                    )}

                    {/* Card 2: The Mixer */}
                    <div id="binaurappCard" className="card">
                        <div id="mixer-section" className="row">
                            <div className="col-12 col-lg-3">
                                <figure className="effect-sadie">
                                    <img id="imageCard" className="rounded" src={"https://t4.ftcdn.net/jpg/07/50/49/35/240_F_750493557_N6hSYv6tcZhUhK5SShxrWn9bENnKESAX.jpg"} alt="Image" />
                                    <figcaption onClick={handleDisplayInfoSecond} >
                                        <h2>More info</h2>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-8 "> {/* Responsive text alignment */}
                                <h5 id="textHeader">The Mixer</h5>
                                <p id="textBody">One of the key differentiators in Binaurapp is that you get to choose the level of exposure to the entrainment agent. You get two tracks, one for the background and one for the entrainer, each with its own volume control.
                                    In the video you will see a basic explanation of the mixer, but it´s not rocket science. You can choose to upload the tracks from the very mixer or you can navigate to the playlist pages and binaural pages respectively for a more detailed explanation of each track.
                                </p>
                                <div id="buttonContainer">
                                    <button type="button" id="greenButtonAlone" onClick={() => openYouTubeVideo("https://youtu.be/Jemx6oVleI4")}>Tutorial Video</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isVisibleSecond && (
                        <div id="infoText">
                            <h5>Typical Questions:</h5>
                            <p>-	Do I need to use a background or I can go for just the Binaural Track? You can of course choose to either turn Track 1´s volume completelly down, or not include a Track 1.</p>
                            <p>-	In some cases, the background may help induce desired states, especially those with rythm since they will help entrain through heart-beat synch, but the main thing is always Track 2.</p>
                        </div>
                    )}

                    {/* Card 3: The Playlist */}
                    <div id="binaurappCard" className="card">
                        <div id="playlist-section" className="row">
                            <div className="col-12 col-lg-3">
                                <figure className="effect-sadie">
                                    <img id="imageCard" className="rounded" src={"https://t3.ftcdn.net/jpg/08/12/94/64/240_F_812946424_rGuEESUckxezrXv1oMy7zHUVtIk8TtPX.jpg"} alt="Image" />
                                    <figcaption onClick={handleDisplayInfoThird} >
                                        <h2>More info</h2>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-8 "> {/* Responsive text alignment */}
                                <h5 id="textHeader">The Playlist</h5>
                                <p id="textBody">What can be cooler than applying binaural entrainment to the music of your choice? Well, that´s one of Binaurapp´s main features and what makes us different.
                                    In the playlist section you will find our very own soundscapes, which include more nature sounds or organic sounds and some more musical soundscapes, but also if you choose to sign up with your Spotify account
                                    You will have access to your playlists.
                                </p>
                                <div id="buttonContainer">
                                    <button type="button" id="greenButtonAlone" onClick={() => handleLoadTrack("https://cdn.pixabay.com/download/audio/2024/07/02/audio_b8229380b3.mp3", "2Hz")}>Tutorial Video</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isVisibleThird && (
                        <div id="infoText">
                            <h5>Typical Questions</h5>
                            <p>Do I need a Spotify account to use Binaurapp? You don´t, you can choose to use the inner-app content, but if you wish to choose your music you do need to sign up with a premium spotify account.</p>
                        </div>
                    )}

                    {/* Card 4: What is Binaurapp? */}
                    <div id="binaurappCard" className="card">
                        <div id="what-section" className="row align-items-center"> {/* Align items vertically centered */}
                            <div className="col-12 col-lg-3">
                                <figure className="effect-sadie">
                                    <img id="imageCard" className="rounded" src={"https://t3.ftcdn.net/jpg/06/96/32/52/240_F_696325264_lODIXcco4tGRdjJzZAlXFC87wOoR398u.jpg"} alt="Image" />
                                    <figcaption onClick={handleDisplayInfoFourth} >
                                        <h2>More info</h2>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="col-lg-7"> {/* Adjusted column size for text */}
                                <h5 id="textHeader">What is Binaurapp?</h5>
                                <p id="textBody">In this section you will find interesting content to tell you a little more about what is Binaurapp. The idea is to give you a better understanding of what is Binaural to begin with, and the different uses that word has (and lots of miss-uses too).
                                    There is also an explanation on Matias Kamelman´s theory of entrainment through moving binaural waves and how this method is completely different to what has been used so far.
                                </p>
                            </div>
                            <div id="buttonContainer" className="col-lg-2 "> {/* Responsive text alignment */}
                                <button type="button" id="greenButton" onClick={() => openYouTubeVideo("https://youtu.be/V8SikUqVPaU")}>What is Binaural?</button>
                                <button type="button" id="greenButton" onClick={() => window.open('https://www.instagram.com/reel/C0R4sS5IdLR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', '_blank', 'noopener,noreferrer')}>What is Entrainment?</button>
                                <button type="button" id="greenButton" onClick={() => window.open('https://www.instagram.com/reel/C1bXltjoElL/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', '_blank', 'noopener,noreferrer')}>Moving Binaural Waves</button>
                            </div>
                        </div>
                    </div>

                    {isVisibleFourth && (
                        <div id="infoText">
                            <h5>Typical Questions:</h5>
                            <p>Well there are several questions in these subjects, we hope to clear some of them with the videos but, nevertheless you may feel you need more info.</p>
                            <p>One of the biggest challenges of our times is filtering information, especially from one´s self cause we are inclined to look for corroboration of what we already believe in.
                                The Theory of Moving Binaural Waves came from many years of researching on what was taken to the lab by researchers of all kinds, and the need to find something new.
                                If you need more info, browse the net, read a lot and of course wirte to us if you feel you have questions.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};