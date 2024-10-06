import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import emailjs from '@emailjs/browser'; // Import EmailJS SDK
import "../../styles/profile.css";

export const Mail = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [comments, setComments] = useState("");

    useEffect(() => {
        if (store.user) {
            setName(store.user.first_name || '');
        }
    }, [store.user]);

    // Initialize EmailJS with your public key from .env
    useEffect(() => {
        
        emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY); // Use the public key from .env
    }, []);

    const handleSubject = (event) => {
        setSubject(event.target.value);
    };

    const handleComments = (event) => {
        setComments(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const templateParams = {
            from_name: name,
            subject: subject,
            message: comments,
            to_name: 'Binaurapp',
            user_email: store.user.email 
        };

        
        try {
            const result = await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID, // Use the service ID from .env
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Use the template ID from .env
                templateParams
            );
            alert('Email sent successfully!');
            setSubject('');
            setComments('');
        } catch (error) {
            console.error('EmailJS error:', error); // Log the error to the console
            alert('Failed to send email, please try again.');
        }
    };

    const handleReset = () => {
        setSubject('');
        setComments('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <form className="form" onSubmit={handleSubmit}>
                <h3 id="heading">Send us your Feedback</h3>
                <div className="field text-end">
                    <label htmlFor="name" className="form-label2">Name</label>
                    <input type="text" id="textResized" className="form-control" value={name} readOnly />
                </div>
                <div className="field text-end">
                    <label htmlFor="subject" className="form-label2">Subject</label>
                    <input type="text" id="textResized" className="form-control" value={subject} onChange={handleSubject} required />
                </div>
                <div className="field row-2 text-end">
                    <label htmlFor="comments" className="form-label2">Comments</label>
                    <textarea
                        id="textResized"
                        className="form-control"
                        value={comments}
                        onChange={handleComments}
                        required
                    ></textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="button1">Send</button>
                    <button type="reset" className="button1" onClick={handleReset}>Cancel</button>
                </div>
            </form>
        </div>
    );
};