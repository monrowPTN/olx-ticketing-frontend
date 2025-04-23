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

          <label>Service Type</label>
          <select name="subject" onChange={handleChange} required>
            <option value="">-- Select a Service --</option>

            <optgroup label="Applications">
              <option value="Clickup">Clickup</option>
              <option value="MS Office">MS Office</option>
              <option value="Zendesk">Zendesk</option>
              <option value="Jarvis">Jarvis</option>
              <option value="Periscope">Periscope</option>
              <option value="Tube Screamer Admin Panel">Tube Screamer Admin Panel</option>
              <option value="MoEngage">MoEngage</option>
              <option value="Tube Screamer">Tube Screamer</option>
              <option value="Figma">Figma</option>
              <option value="BambooHR">BambooHR</option>
              <option value="SEED">SEED</option>
            </optgroup>

            <optgroup label="Access & Group Emails">
              <option value="Sheets Ownership Transfer">Sheets Ownership Transfer</option>
              <option value="Add to Sales group Email">Add to Sales group Email</option>
              <option value="Add to Sales Ops Group Email">Add to Sales Ops Group Email</option>
              <option value="Add to Finance Group Email">Add to Finance Group Email</option>
              <option value="Add to OLX Group Email">Add to OLX Group Email</option>
            </optgroup>

            <option value="Other">Other</option>
          </select>

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