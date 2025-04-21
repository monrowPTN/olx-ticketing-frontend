import confetti from 'canvas-confetti';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    full_name: '',
    department: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://internal-ticketing-system.onrender.com/submit-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status || 'Unknown error');
      }

      const result = await response.json();
      if (result.status === 'success') {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      } else {
        console.error('Error submitting ticket:', result.status);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert(`ERROR: ${error.message}`);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="olx-header">
  <img src="/olx-lebanon-logo.png" alt="OLX Lebanon" className="olx-logo" />
  <h1>Internal Ticketing System</h1>
</header>
  
      {showMessage && (
        <div className="fade-message">Ticket submitted!</div>
      )}
  
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="full_name" onChange={handleChange} required />
  
          <label>Department</label>
          <input name="department" onChange={handleChange} required />
  
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />
  
          <label>Subject</label>
          <input name="subject" onChange={handleChange} />
  
          <label>Message</label>
          <textarea name="message" rows="5" onChange={handleChange} required></textarea>
  
          <button type="submit">Submit Ticket</button>
        </form>
      </div>
  
      <footer className="olx-footer">
        <p>Powered by OLX Lebanon © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;