"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Heart, HelpCircle, Users, Sparkles, CreditCard, DollarSign, X, CheckCircle2 } from "lucide-react";
import "./Involved.css";

export default function InvolvedPage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickAmount = (amount: string) => {
    setDonateAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonateAmount("");
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = donateAmount || customAmount;
    if (!finalAmount || parseFloat(finalAmount) <= 0 || !donorName.trim() || !cardNumber.trim()) {
      alert("Please enter a valid amount and secure card information.");
      return;
    }

    setIsProcessing(true);
    // Simulate payment gateway delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setDonationSuccess(true);
  };

  return (
    <div className="involved-page animate-fade-in">
      
      {/* Hero Header */}
      <section className="involved-hero-section">
        <div className="container text-center">
          <span className="involved-badge">Make an Impact</span>
          <h1 className="section-title">Get Involved Today</h1>
          <p className="subtitle">Join our collaborative network. Whether you contribute hours, funds, mentorship, or local business venues, you belong here.</p>
        </div>
      </section>

      {/* 5 Core Subsections Cards Grid */}
      <section className="involved-options-section">
        <div className="container involved-options-grid">
          
          {/* 1. VOLUNTEER */}
          <div className="involved-option-card hover-lift">
            <div className="option-icon-badge blue">
              <Users size={28} />
            </div>
            <h3>Become a Volunteer</h3>
            <p>Directly lead cohort workshops, coordinate reading buddy circles, or assist in tech labs. Certified service hours are fully signed off.</p>
            <Link href="/volunteer" className="btn btn-primary btn-small">
              Apply to Volunteer
            </Link>
          </div>

          {/* 2. BECOME A MENTOR */}
          <div className="involved-option-card hover-lift">
            <div className="option-icon-badge green">
              <Award size={28} />
            </div>
            <h3>Become a Mentor</h3>
            <p>Establish consistent peer-to-peer relationships with younger middle school students, providing academic tutoring and life guidance.</p>
            <Link href="/volunteer?role=mentor" className="btn btn-secondary btn-small">
              Sign Up as Mentor
            </Link>
          </div>

          {/* 3. DONATE FUNDS */}
          <div className="involved-option-card hover-lift highlighted-card">
            <div className="option-icon-badge orange">
              <Heart size={28} fill="currentColor" />
            </div>
            <span className="card-featured-tag">High Priority</span>
            <h3>Donate & Support</h3>
            <p>Fund essential physical hardware kits, snacks, cohort shirts, and innovation prize awards. Every single dollar goes directly to students.</p>
            <button onClick={() => {
              setDonationSuccess(false);
              setDonateAmount("50");
              setCustomAmount("");
              setDonorName("");
              setCardNumber("");
              setDonateModalOpen(true);
            }} className="btn btn-accent btn-small">
              Donate Now
            </button>
          </div>

          {/* 4. SPONSOR PROGRAMS */}
          <div className="involved-option-card hover-lift">
            <div className="option-icon-badge purple">
              <Sparkles size={28} />
            </div>
            <h3>Sponsor Programs</h3>
            <p>Are you a corporate business? Fund entire regional cohort classes, sponsor annual pitch sumits, or coordinate employee days.</p>
            <Link href="/contact?subject=Corporate%20Program%20Sponsorship" className="btn btn-outline btn-small">
              Partner & Sponsor
            </Link>
          </div>

          {/* 5. COMMUNITY PARTNERSHIPS */}
          <div className="involved-option-card hover-lift">
            <div className="option-icon-badge yellow">
              <HelpCircle size={28} />
            </div>
            <h3>Community Partnerships</h3>
            <p>Are you a school administrator or municipal library lead? Partner with us to bring our summer cohorts directly to your neighborhood.</p>
            <Link href="/contact?subject=Municipal%20School%20Partnership" className="btn btn-outline btn-small">
              Establish Partnership
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ shortcut CTA */}
      <section className="involved-footer-banner">
        <div className="container text-center banner-box">
          <h2>Have Questions About Helping?</h2>
          <p>Read our extensive guide answers regarding volunteer hours, background screenings, and donation tax receipts.</p>
          <Link href="/faq" className="btn btn-primary">
            Visit FAQ Help Center
          </Link>
        </div>
      </section>

      {/* DYNAMIC simulated DONATION MODAL */}
      {donateModalOpen && (
        <div className="modal-overlay" onClick={() => setDonateModalOpen(false)}>
          <div className="modal-card donation-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setDonateModalOpen(false)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <h2>Secure Donation Portal</h2>
              <p className="subtitle" style={{ margin: 0, fontSize: "0.9rem", textAlign: "left" }}>
                100% of your contributions go directly toward student supplies and tech equipment.
              </p>
            </div>

            <div className="modal-body">
              {donationSuccess ? (
                <div className="donation-success-panel text-center animate-fade-in">
                  <CheckCircle2 size={60} className="success-check-mark" />
                  <h3>Donation Confirmed!</h3>
                  <div className="receipt-box text-left">
                    <p><strong>Donor Name:</strong> {donorName || "Generous Supporter"}</p>
                    <p><strong>Amount Funded:</strong> ${donateAmount || customAmount}.00 USD</p>
                    <p><strong>Transaction ID:</strong> FRY-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    <p><strong>Status:</strong> Tax-Deductible Receipt Dispatched</p>
                  </div>
                  <p className="success-note">A tax-exempt PDF invoice has been sent to your email. Thank you for your generosity! ✨</p>
                </div>
              ) : (
                <form onSubmit={handleDonateSubmit} className="donation-wizard-form">
                  {/* Amount Grid */}
                  <div className="form-group">
                    <label>Select Amount (USD)</label>
                    <div className="donation-amount-grid">
                      {["25", "50", "100", "250"].map((amt) => (
                        <button 
                          key={amt} 
                          type="button"
                          className={`amt-btn ${donateAmount === amt ? 'selected' : ''}`}
                          onClick={() => handleQuickAmount(amt)}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom input */}
                  <div className="form-group custom-amount-group">
                    <label htmlFor="customAmt">Or Enter Custom Amount ($)</label>
                    <div className="custom-input-wrapper">
                      <DollarSign className="dollar-icon" size={16} />
                      <input 
                        type="number" 
                        id="customAmt"
                        placeholder="Other amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min="5"
                      />
                    </div>
                  </div>

                  {/* Card Info details */}
                  <div className="form-group">
                    <label htmlFor="donorName">Cardholder Full Name *</label>
                    <input 
                      type="text" 
                      id="donorName"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardNum">Simulated Card Number *</label>
                    <div className="card-input-wrapper">
                      <CreditCard className="card-icon" size={16} />
                      <input 
                        type="text" 
                        id="cardNum"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="expiry">Expiry Date *</label>
                      <input type="text" id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <label htmlFor="cvv">CVV *</label>
                      <input type="text" id="cvv" placeholder="123" required />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-accent btn-large submit-btn" disabled={isProcessing} style={{ width: "100%", marginTop: "1rem" }}>
                    {isProcessing ? "Processing Security Transaction..." : `Fund $${donateAmount || customAmount || '0'}.00 Now`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
