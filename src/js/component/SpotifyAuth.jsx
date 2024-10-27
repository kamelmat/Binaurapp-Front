import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap

const client_id = `${process.env.CLIENT_ID}`; // your clientId
// const client_secret = `${process.env.CLIENT_SECRET}`; // Your secret
const redirect_uri = `${process.env.REDIRECT_URI}`; // Your redirect uri
const spotify_auth_uri = `${process.env.SPOTIFY_AUTH_URL}`; // Your redirect uri
const scopes = ["user-read-private", "user-read-email", "playlist-read-private",
  'playlist-modify-public', 'playlist-read-private', 'playlist-modify-private',
  'user-library-modify', 'user-library-read', 'user-top-read',];

export const SpotifyAuth = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleSpotifyLogin = () => {
    setShowModal(true); // Show the modal when the button is clicked
  };

  return (
    <>
      <button type="button" className="button1 text-success mb-3" onClick={handleSpotifyLogin}>
        Spotify
      </button>

      {/* Modal for Spotify login information */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        backdrop="static" 
        keyboard={false}
        dialogClassName="modal-gray" // Use a custom class for gray background
      >
        <Modal.Header closeButton>
          <Modal.Title>Spotify Login Unavailable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        🌟 We're working on the Spotify sign-up feature! 🌟

In the meantime, feel free to enjoy Binaurapp as usual! 🎧 You can adjust the soundscape volume down and play your favorite Spotify tunes 🎶 in the background.
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
