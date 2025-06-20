import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import contactImg from '../Assets/contactimg.jpg';


const Contact = () => {
    const [form, setForm] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            form,
            'YOUR_PUBLIC_KEY'
        )
            .then(() => {
                alert('Message sent successfully!');
                setForm({
                    user_name: '',
                    user_email: '',
                    user_phone: '',
                    message: ''
                });
            })
            .catch((err) => {
                console.error('Error:', err);
                alert('Failed to send message. Try again later.');
            });
    };

    return (
        <div className="contact-container">
            <div className="contact-form">
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="user_name" placeholder="Your Name" value={form.user_name} onChange={handleChange} required />
                    <input type="email" name="user_email" placeholder="Your Email" value={form.user_email} onChange={handleChange} required />
                    <input type="text" name="user_phone" placeholder="Phone Number" value={form.user_phone} onChange={handleChange} />
                    <textarea name="message" rows="5" placeholder="Your Message" value={form.message} onChange={handleChange} required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="contact-social">
                <h3>Connect with us</h3>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="social-images">
                    <img className="social-image" src={contactImg} alt="Contact Banner" /> 
                    {/* C:\Wipro_project\QuickHire-A-Job-Board-SPA\client\Assets\contactimg.jpg */}

                </div>
            </div>
        </div>
    );
};

export default Contact;
