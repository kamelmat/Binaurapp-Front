import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/mixer.css";
import { useNavigate } from "react-router-dom";



export const Mixer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [trackOne, setTrackOne] = useState(null);
    const [trackTwo, setTrackTwo] = useState(null);
    const [userAnalyser, setUserAnalyser] = useState(null);
    const [providedAnalyser, setProvidedAnalyser] = useState(null);
    const [userDataArray, setUserDataArray] = useState(null);
    const [providedDataArray, setProvidedDataArray] = useState(null);
    const [track1name, setTrack1Name] = useState();
    const [track2name, setTrack2Name] = useState();

    const trackOneUrlRef = useRef();
    const trackTwoUrlRef = useRef();
    const trackOneVolumeRef = useRef();
    const trackTwoVolumeRef = useRef();
    const trackOneVuRef = useRef();
    const trackTwoVuRef = useRef();

    const [showInput, setShowInput] = useState(false);
    const [mixTitle, setMixTitle] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [gainNodeOne, setGainNodeOne] = useState(null);
    const [gainNodeTwo, setGainNodeTwo] = useState(null);

    const [audioCtx, setAudioCtx] = useState(null);

    useEffect(() => {
        if (!store.isLogin) {
            alert("Please Log-In or Sign-Up");
        }
    }, [store.isLogin, navigate]);

    useEffect(() => {
        const updateVuMeter = (analyser, dataArray, fillRef) => {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);
            const sum = dataArray.reduce((a, b) => a + b, 0);
            const average = sum / dataArray.length;
            if (fillRef.current) {
                fillRef.current.style.height = `${average / 2}%`;
            }
            requestAnimationFrame(() => updateVuMeter(analyser, dataArray, fillRef));
        };

        if (userAnalyser && userDataArray) {
            updateVuMeter(userAnalyser, userDataArray, trackOneVuRef);
        }

        if (providedAnalyser && providedDataArray) {
            updateVuMeter(providedAnalyser, providedDataArray, trackTwoVuRef);
        }
    }, [userAnalyser, userDataArray, providedAnalyser, providedDataArray]);

    const loadAudio = async () => {
        const trackOneUrl = trackOneUrlRef.current.value;
        const trackTwoUrl = trackTwoUrlRef.current.value;

        if (trackOneUrl && trackTwoUrl) {
            try {
                const newTrackOne = new Audio(trackOneUrl);
                const newTrackTwo = new Audio(trackTwoUrl);

                newTrackOne.crossOrigin = "anonymous";
                newTrackOne.preload = "auto";
                newTrackTwo.crossOrigin = "anonymous";
                newTrackTwo.preload = "auto";

                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                setAudioCtx(ctx); // Store the AudioContext in state

                const userSource = ctx.createMediaElementSource(newTrackOne);
                const newUserAnalyser = ctx.createAnalyser();
                const gainNodeOne = ctx.createGain(); // Create GainNode for track one

                userSource.connect(gainNodeOne); // Connect source to GainNode
                gainNodeOne.connect(newUserAnalyser); // Connect GainNode to Analyser
                newUserAnalyser.connect(ctx.destination); // Connect Analyser to destination
                newUserAnalyser.fftSize = 256;
                const bufferLength = newUserAnalyser.frequencyBinCount;
                const newUserDataArray = new Uint8Array(bufferLength);

                const providedSource = ctx.createMediaElementSource(newTrackTwo);
                const newProvidedAnalyser = ctx.createAnalyser();
                const gainNodeTwo = ctx.createGain(); // Create GainNode for track two

                providedSource.connect(gainNodeTwo); // Connect source to GainNode
                gainNodeTwo.connect(newProvidedAnalyser); // Connect GainNode to Analyser
                newProvidedAnalyser.connect(ctx.destination); // Connect Analyser to destination
                newProvidedAnalyser.fftSize = 256;
                const newProvidedDataArray = new Uint8Array(bufferLength);

                newTrackOne.onended = () => newTrackOne.play();
                newTrackTwo.onended = () => newTrackTwo.play();

                // Store references to the tracks, gain nodes, and analyzers
                setTrackOne(newTrackOne);
                setTrackTwo(newTrackTwo);
                setUserAnalyser(newUserAnalyser);
                setProvidedAnalyser(newProvidedAnalyser);
                setUserDataArray(newUserDataArray);
                setProvidedDataArray(newProvidedDataArray);
                setGainNodeOne(gainNodeOne); // Store GainNode for track one
                setGainNodeTwo(gainNodeTwo); // Store GainNode for track two
            } catch (error) {
                console.error('Error loading audio files:', error);
                alert('There was a problem loading the audio files. Please check the URLs and try again.');
            }
        } else {
            alert('Please enter both audio URLs.');
        }
    };

    const resumeAudioContext = async (audioCtx) => {
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
            console.log('Audio context resumed');
        }
    };


    const playAudio = () => {
        if (store.spotifySelected) {
            // Only play track two if Spotify is selected
            if (trackTwo) {
                trackTwo.play();
            } else {
                alert('Track two must be uploaded first.');
            }
        } else {
            // Play both tracks if Spotify is not selected
            if (trackOne && trackTwo) {
                trackOne.play();
                trackTwo.play();
            } else {
                alert('Tracks must be uploaded first.');
            }
        }
    };

    const pauseAudio = () => {
        if (trackOne && trackTwo) {
            trackOne.pause();
            trackTwo.pause();
        } else {
            alert('Tracks must be uploaded first.');
        }
    };

    const handleTrackOneVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        if (gainNodeOne) {
            gainNodeOne.gain.setValueAtTime(volume, audioCtx.currentTime); // Set volume using GainNode
            console.log(`Track One Volume Set: ${volume}`);
        }
    };

    const handleTrackTwoVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        if (gainNodeTwo) {
            gainNodeTwo.gain.setValueAtTime(volume, audioCtx.currentTime); // Set volume using GainNode
            console.log(`Track Two Volume Set: ${volume}`);
        }
    };



    // Lógica fav mixes
    // habilitar formulario para que el usuario ingreese el título del mix
    // Formulario: Estado del mix para controlar el input
    // Onsubmit que llame la función handleOnSubmitMix


    const handleMix = () => {
        setShowInput(true);
    };

    const handleInputChange = (event) => {
        setMixTitle(event.target.value);
    };

    const handleOnSubmitMix = (event) => {
        event.preventDefault();
        if (mixTitle.trim() === '') {
            setError('Please enter a mix title before submitting.');
            return;
        }
        // Crear el Data to send que incluya el estado del mix_title track_1_url binaural_id
        const dataToSend = {
            mix_title: mixTitle,
            track_1_url: store.track1Url,
            track_1_name: track1name ? track1name : store.trackOneName,
            binaural_id: store.track2Url,
            track_2_name: track2name ? track2name : store.trackTwoName
        };

        actions.addMixes(dataToSend)
            .then(() => {
                setShowModal(true); // Mostrar la ventana modal de éxito
                setTimeout(() => {
                    setShowModal(false); // Ocultar la ventana modal después de 5 segundos
                }, 5000);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // Aquí podrías realizar una llamada al backend para enviar dataToSend
        console.log('Datos enviados al backend:', dataToSend);
        setMixTitle("");
        setShowInput(false);
        setError('');
    };

    //   Lógica para llamar a la librería Binaural
    const handleBinauralClick = (url, name) => {
        actions.setTrack2Url(null);
        actions.setTrack2Url(url);
        actions.setTrackTwoName(null);
        setTrack2Name(name)
    };

    //   Lógica para llamar a la librería Soundscapes
    const handleSoundscapeClick = (url, name) => {
        // Reset track states first
        setTrackOne(null); // Reset track one
        setTrackTwo(null); // Reset track two
        actions.setSpotifySelected(false)
        trackOneUrlRef.current.value = url;
        trackTwoUrlRef.current.value = url;
        actions.setTrack1Url(null);
        actions.setTrack1Url(url);
        actions.setTrackOneName(null);
        setTrack1Name(name)
    };

    //Spotify Selection
    const [trackOneUrl, setTrackOneUrl] = useState('');


    const handleTrackSelect = ({ trackOneUrl, track1name }) => {
        setTrackOneUrl(trackOneUrl);
        setTrack1Name(track1name);
    };


    return (
        <>
            <div id="mainContainer">
                <div id="mixerConatiner" className="d-flex flex-column bd-highlight mb-3">
                    {/* <SpotifySearch onTrackSelect={handleTrackSelect} /> */}
                    <div id="volumeControlers" className="d-flex justify-content-center">
                        <input type="range" id="trackOneVolume" ref={trackOneVolumeRef} onChange={handleTrackOneVolumeChange} min="0" max="1" step="0.01" defaultValue="1" />
                        <div id="trackOneVu"><div id="vuFill" className="card" ref={trackOneVuRef} ></div></div>
                        <div id="trackTwoVu"><div id="vuFill" className="card" ref={trackTwoVuRef}></div></div>
                        <input type="range" id="trackTwoVolume" ref={trackTwoVolumeRef} onChange={handleTrackTwoVolumeChange} min="0" max="1" step="0.01" defaultValue="1" />
                    </div>
                    <div id="playerButtons" className="d-flex justify-content-center">
                        <button id="metalButton2" className="dropdown" type="button" data-bs-toggle="dropdown"/*  onClick={() => handleSpotifyLists(item.url)} */>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        {/* <ul>
                            <li><div className="btn">Spotify Library</div></li>
                            <li><div className="btn">Soundscapes Library</div></li>
                        </ul> */}
                        <ul className="dropdown-menu">
                            {store.soundscapeList.map((item, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleSoundscapeClick(item.url_jamendo, item.name)}>{item.name}</button>
                                </li>
                            ))}
                        </ul>
                        <button id="metalButton" onClick={playAudio}>play</button>
                        <button id="metalButton" onClick={pauseAudio}><b>||</b></button>
                        <button id="metalButton2" className="dropdown" type="button" data-bs-toggle="dropdown">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <ul className="dropdown-menu">
                            {store.binauralList.map((item, index) => (
                                <li key={index}>
                                    <button className="dropdown-item" onClick={() => handleBinauralClick(item.track_url, item.name)}>{item.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Estas 3 líneas se tendrán que reemplazar con la implementación de las librerias */}
                    <div id="musicLoaders" className="d-flex justify-content-center">
                        <label type="text" className="text-center" id="track1Url">
                            {store.spotifySelected ? "SPOTIFY" : (store.trackOneName ? store.trackOneName : track1name)}
                        </label>
                        <button id="metalButton3" onClick={loadAudio}>Load</button>
                        <label type="text" className="text-center" id="track2Url">
                            {store.trackTwoName ? store.trackTwoName : track2name}
                        </label>
                        {/* El icono debería estar oculto hasta que ambas pistas no estén cargadas */}
                        <div className="btn dropdown">
                            <span id="favButton" onClick={handleMix}><i title="Add Mix" style={{ cursor: "pointer" }} className="fa-solid fa-heart-pulse fa-beat-fade" /></span>
                        </div>
                    </div>
                    {showInput && (
                        <div className="d-flex justify-content-center">
                            <input id="mixTitleLabel" type="text" value={mixTitle} onChange={handleInputChange} placeholder="Set Mix Title" />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button id="metalButton4"><span className="material-symbols-outlined" onClick={handleOnSubmitMix}>library_music</span></button>
                        </div>
                    )}
                </div>
                <input type="text" id="secretUrl" ref={trackOneUrlRef} value={store.track1Url} />
                <input type="text" id="secretUrl" ref={trackTwoUrlRef} value={store.track2Url} />

                <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Your Mix was successfully stored! Check your Mixes to find all of them.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};