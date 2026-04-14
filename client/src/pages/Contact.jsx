import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './Contact.css';

const subjects = [
  { value: 'bug', label: 'Bug Report' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'enquiry', label: 'Enquiry' },
  { value: 'other', label: 'Other' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 bg-light d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <div className="card border-0 shadow-sm p-5">
                  <i className="bi bi-check-circle text-success fs-1 d-block mb-3"></i>
                  <h4>Message Sent!</h4>
                  <p className="text-muted">We'll get back to you within 24 hours.</p>
                  <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-5">
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h4 className="mb-0">Send us a Message</h4>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Subject</label>
                        <select
                          name="subject"
                          className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                          value={formData.subject}
                          onChange={handleChange}
                        >
                          <option value="">Select a subject</option>
                          {subjects.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label">Message</label>
                        <textarea
                          name="message"
                          className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-send me-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Contact Information</h5>
                </div>
                <div className="card-body">
                  <div className="contact-info-item">
                    <i className="bi bi-geo-alt"></i>
                    <div>
                      <div className="fw-medium">Location</div>
                      <div className="text-muted">Computer Science Department</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="bi bi-envelope"></i>
                    <div>
                      <div className="fw-medium">Email</div>
                      <div className="text-muted">admin@feedback.com</div>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <i className="bi bi-clock"></i>
                    <div>
                      <div className="fw-medium">Response Time</div>
                      <div className="text-muted">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0">Common Issues</h5>
                </div>
                <div className="card-body">
                  <div className="common-issue">
                    <i className="bi bi-question-circle text-primary"></i>
                    <span>Forgot password - Contact admin</span>
                  </div>
                  <div className="common-issue">
                    <i className="bi bi-question-circle text-primary"></i>
                    <span>Account deleted - Re-register</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;