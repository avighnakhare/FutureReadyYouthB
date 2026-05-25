"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Navigation, Info } from "lucide-react";
import "./Contact.css";

interface ContactClientProps {
  email: string;
  phone: string;
  address: string;
}

export default function ContactClient({ email, phone, address }: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [mapZoom, setMapZoom] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in all form fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        alert("Server failed to receive contact details. Please try again.");
      }
    } catch {
      alert("Network error. Please try again later.");
    }
    setIsSubmitting(false);
  };

  // Helper to extract a cleaner tel string if needed
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  return (
    <div className="contact-page animate-fade-in">
      
      {/* Hero Header */}
      <section className="contact-hero-section">
        <div className="container text-center">
          <span className="contact-badge">Get In Touch</span>
          <h1 className="section-title">Contact Our Team</h1>
          <p className="subtitle">Have questions about student enrollment, sponsor programs, or volunteer guidelines? Reach out today.</p>
        </div>
      </section>

      {/* Main Grid: Form & Info Panel */}
      <section className="contact-main-section">
        <div className="container contact-grid-layout">
          
          {/* LEFT: Form */}
          <div className="contact-form-wrapper">
            {sent ? (
              <div className="contact-success-screen text-center animate-fade-in">
                <CheckCircle className="success-check-icon" size={60} />
                <h2>Message Sent Successfully!</h2>
                <p className="success-desc">
                  Thank you for reaching out to Future Ready Youth, <strong>{formData.name}</strong>.
                </p>
                <p className="success-details">
                  Our administrative desk has successfully received your message regarding <strong>"{formData.subject}"</strong>. A confirmation slip has been sent to <strong>{formData.email}</strong>, and a representative will reply within 24 hours.
                </p>
                <button 
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }} 
                  className="btn btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="contact-form-card">
                <h3>Send Direct Inquiry</h3>
                <p className="form-subtext">Fill out our rapid response form. Required fields are marked with *</p>
                
                <form onSubmit={handleSubmit} className="contact-form-element">
                  <div className="form-group row">
                    <div>
                      <label htmlFor="name">Your Name *</label>
                      <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Jane Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="jane@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input 
                      type="text" 
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="e.g. Corporate Sponsorship / Volunteer Hours Verification"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea 
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How can our program coordinators assist you today..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-accent btn-large submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT: Info Card Details & Map */}
          <div className="contact-info-wrapper">
            
            {/* Direct Details Card */}
            <div className="info-details-card">
              <h3>Office Information</h3>
              <p className="details-card-desc">Reach our administrative coordinators directly via phone, email, or visit our central offices.</p>
              
              <div className="info-links-list">
                <div className="info-link-item">
                  <div className="info-link-icon blue"><Mail size={18} /></div>
                  <div>
                    <strong>Administrative Email</strong>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>

                <div className="info-link-item">
                  <div className="info-link-icon green"><Phone size={18} /></div>
                  <div>
                    <strong>Call Central Desk</strong>
                    <a href={`tel:${cleanPhone}`}>{phone}</a>
                  </div>
                </div>

                <div className="info-link-item">
                  <div className="info-link-icon orange"><MapPin size={18} /></div>
                  <div>
                    <strong>Office Location</strong>
                    <span>{address}</span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="contact-social-row">
                <strong>Connect with us:</strong>
                <div className="social-links-circle">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn facebook" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn twitter" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn linkedin" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                </div>
              </div>
            </div>

            {/* Interactive SVG Map Placeholder */}
            <div className="interactive-map-card">
              <div className="map-card-header">
                <div className="map-title-row">
                  <Navigation size={16} className="map-nav-icon" />
                  <h4>Office Coordinates</h4>
                </div>
                <button className="btn btn-outline btn-small" onClick={() => setMapZoom(!mapZoom)}>
                  {mapZoom ? "Zoom Out" : "Zoom In"}
                </button>
              </div>

              <div className={`map-canvas-container ${mapZoom ? 'zoomed-in' : ''}`}>
                {/* SVG Vector Map Grid */}
                <svg viewBox="0 0 400 200" width="100%" height="100%" fill="none" className="map-svg-grid">
                  <defs>
                    <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  
                  {/* Grid background */}
                  <rect width="400" height="200" fill="url(#gridPattern)" />
                  
                  {/* Vector Streets */}
                  <path d="M 0,50 L 400,50" stroke="#CBD5E1" strokeWidth="6" />
                  <path d="M 0,140 L 400,140" stroke="#CBD5E1" strokeWidth="6" />
                  <path d="M 120,0 L 120,200" stroke="#CBD5E1" strokeWidth="8" />
                  <path d="M 300,0 L 300,200" stroke="#CBD5E1" strokeWidth="8" />

                  {/* Street Labels */}
                  <text x="10" y="44" fill="#94A3B8" fontSize="8" fontWeight="bold">Broadway Ave</text>
                  <text x="10" y="134" fill="#94A3B8" fontSize="8" fontWeight="bold">Leadership Blvd</text>
                  <text x="125" y="15" fill="#94A3B8" fontSize="8" fontWeight="bold" transform="rotate(90 125 15)">4th Street</text>
                  <text x="305" y="15" fill="#94A3B8" fontSize="8" fontWeight="bold" transform="rotate(90 305 15)">Future Avenue</text>

                  {/* Office Pin Indicator */}
                  {/* Pin Circle Pulsar */}
                  <circle cx="120" cy="50" r="16" fill="var(--color-primary-light)" opacity="0.6">
                    <animate attributeName="r" values="8;18;8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="50" r="6" fill="var(--color-accent)" />
                  
                  {/* Pin Hover Overlay Label Card */}
                  <g transform="translate(135, 25)">
                    <rect width="110" height="36" rx="4" fill="#0F172A" opacity="0.95" />
                    <text x="10" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold">Future Ready Youth</text>
                    <text x="10" y="27" fill="#A0AEC0" fontSize="7">{address.split(',')[0] || "123 Leadership Way"}</text>
                  </g>
                </svg>
              </div>
              
              <div className="map-footer-notes">
                <Info size={12} className="info-icon" />
                <span>Pulsing indicator shows central headquarters location. Street access via Leadership Blvd.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
