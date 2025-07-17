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

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setIsSubmitting(true);

  try {
    const response = await fetch('https://internal-ticketing-system.onrender.com/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      setIsSubmitting(false);
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.status || response.statusText || 'Unknown error');
    }

    const result = await response.json();
    if (result.status === 'success') {
      setShowMessage(true);
      setFormData({
        full_name: '',
        department: '',
        email: '',
        subject: '',
        message: ''
      });

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });

      setIsSubmitting(false);

      setTimeout(() => setShowMessage(false), 3000);
    } else {
      console.error('Error submitting ticket:', result.status);
      setIsSubmitting(false);
    }
  } catch (error) {
    setIsSubmitting(false);
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
        <div className="fade-message">✅ Ticket submitted successfully!</div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="full_name" value={formData.full_name} onChange={handleChange} required />

          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">-- Select Department --</option>
            <option value="HR">HR</option>
            <option value="Analytics">Analytics</option>
            <option value="Sales">Sales</option>
            <option value="CS">CS</option>
            <option value="Sales Ops">Sales Ops</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Strategy and Growth">Strategy and Growth</option>
            <option value="Finance">Finance</option>
          </select>

          <label>Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />

          <label>Service Type</label>
          <select name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="">-- Select a Service --</option>

            <optgroup label="Applications">
              <option value="Clickup">Clickup</option>
              <option value="MS Office">MS Office</option>
              <option value="Zendesk">Zendesk</option>
              <option value="Jarvis">Jarvis</option>
              <option value="Slack">Slack</option>
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
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
</button>
        </form>
      </div>

      <footer className="olx-footer">
        <p>Powered by OLX Lebanon © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
