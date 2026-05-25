"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    // Simulate real newsletter registration
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubscribed(true);
    setEmail("");
    setSubmitting(false);
  };

  return (
    <footer className="footer-container">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link href="/" className="logo-brand">
            <span className="logo-icon">FRY</span>
            <span className="logo-text">Future Ready</span>
          </Link>
          <p className="footer-tagline">Empowering Students. Inspiring Change.</p>
          <p className="footer-description">
            We prepare tomorrow's leaders today through leadership workshops, hands-on technology exposure, community initiatives, and real-world mentorship.
          </p>
          <div className="social-icons-wrapper">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/events">Upcoming Events</Link></li>
            <li><Link href="/impact">Impact Metrics</Link></li>
            <li><Link href="/volunteer">Volunteer Now</Link></li>
          </ul>
        </div>

        {/* More Links Column */}
        <div className="footer-col links-col">
          <h4 className="footer-col-title">Get Involved</h4>
          <ul className="footer-links-list">
            <li><Link href="/involved">How to Help</Link></li>
            <li><Link href="/resources">Resources & Guides</Link></li>
            <li><Link href="/faq">Frequently Asked Questions</Link></li>
            <li><Link href="/contact">Get in Touch</Link></li>
            <li><Link href="/admin">Admin Access</Link></li>
          </ul>
        </div>

        {/* Contact & Newsletter Column */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-col-title">Newsletter Signup</h4>
          <p className="newsletter-text">Stay updated on our events, student stories, and program launches.</p>
          
          {subscribed ? (
            <div className="newsletter-success animate-fade-in">
              🎉 Thanks for subscribing! You're officially on the list.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn" disabled={submitting} aria-label="Subscribe">
                {submitting ? "..." : <Send size={16} />}
              </button>
            </form>
          )}

          <div className="contact-info-list" style={{ marginTop: "1.5rem" }}>
            <div className="contact-info-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:futurereadyyouth6@gmail.com">futurereadyyouth6@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <Phone size={16} className="contact-icon" />
              <a href="tel:+15551234567">(555) 123-4567</a>
            </div>
            <div className="contact-info-item">
              <MapPin size={16} className="contact-icon" />
              <span>123 Leadership Way, Future City</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Future Ready Youth. Empowering Students. Inspiring Change. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link href="/faq">Help Center</Link>
            <span>&bull;</span>
            <Link href="/contact">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="/volunteer">Volunteer Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
