"use client";

import { useState } from "react";
import { Check, Calendar, Clock, Star, HelpCircle, ArrowRight, ArrowLeft } from "lucide-react";
import "./Volunteer.css";

export default function VolunteerPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    city: "",
    state: "",
    schoolOrOrg: "",
    gradeLevel: "",
    occupation: "",
    reasonToVolunteer: "",
    skillsToContribute: "",
    volunteerExperience: "",
    availability: "",
    hoursMonthly: "",
    preferredRole: "",
    additionalComments: "",
    consent: false
  });

  const totalSteps = 3;
  const progressPercentage = ((step - 1) / totalSteps) * 100;

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.firstName.trim() || 
        !formData.lastName.trim() || 
        !formData.email.trim() || 
        !formData.phoneNumber.trim() || 
        !formData.dateOfBirth || 
        !formData.city.trim() || 
        !formData.state.trim()
      ) {
        alert("Please fill in all required personal and contact fields.");
        return false;
      }
      if (!formData.email.includes("@")) {
        alert("Please enter a valid email address.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.availability || !formData.hoursMonthly || !formData.preferredRole) {
        alert("Please complete your availability and role preferences.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.reasonToVolunteer.trim() || !formData.skillsToContribute.trim()) {
        alert("Please describe your motivations and skills.");
        return false;
      }
      if (!formData.consent) {
        alert("You must consent to the terms before submitting.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        if (data.previewUrl) setPreviewUrl(data.previewUrl);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please verify database connection.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="volunteer-page animate-fade-in">
        <div className="container success-outer">
          <div className="success-card text-center">
            <div className="success-badge">✨</div>
            <h1 className="success-headline">Thank You For Applying!</h1>
            <p className="success-paragraph">
              Your application has been successfully received, <strong>{formData.firstName}</strong>.
            </p>
            <p className="success-subtext">
              Our team will review your application and contact you if selected for the next stage. A confirmation email has been dispatched to <strong>{formData.email}</strong>.
            </p>
            {previewUrl && (
              <div className="demo-preview-alert">
                <p><strong>Local SMTP Simulator Alert:</strong> We've created an email simulation! View your applicant confirmation email log here:</p>
                <a href={previewUrl} target="_blank" rel="noreferrer" className="demo-preview-link">
                  {previewUrl}
                </a>
              </div>
            )}
            <div className="success-actions">
              <a href="/" className="btn btn-primary">Return Home</a>
              <a href="/events" className="btn btn-secondary">Explore Summer Events</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="volunteer-page animate-fade-in">
      <div className="container volunteer-grid-layout">
        
        {/* Left Side: Requirements & Benefits Panel */}
        <div className="volunteer-info-panel">
          <div className="info-block">
            <span className="info-badge">Join Us</span>
            <h2>Volunteer With Future Ready Youth</h2>
            <p className="info-intro">
              Shape young minds this summer. By becoming a volunteer, you actively guide underrepresented students toward future success in tech, leadership, and careers.
            </p>
          </div>

          <div className="info-block card">
            <h3>🎁 Volunteer Benefits</h3>
            <ul className="info-list">
              <li>
                <span className="icon-wrap green"><Check size={16} /></span>
                <div>
                  <strong>Community Service Hours</strong>
                  <p>Obtain certified service validation slips for high school or college graduation requirements.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap green"><Check size={16} /></span>
                <div>
                  <strong>Leadership Experience</strong>
                  <p>Gain real team-leading and management hours directing cohort projects.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap green"><Check size={16} /></span>
                <div>
                  <strong>Networking</strong>
                  <p>Connect with professional corporate sponsors, advisors, and like-minded peers.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap green"><Check size={16} /></span>
                <div>
                  <strong>Resume Building</strong>
                  <p>Include robust mentoring, workshop facilitation, and tech leadership skills on your CV.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap green"><Check size={16} /></span>
                <div>
                  <strong>Making a Positive Impact</strong>
                  <p>物理ly witness a child's eyes light up when they construct their very first coding layout.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="info-block card">
            <h3>📋 Volunteer Requirements</h3>
            <ul className="info-list">
              <li>
                <span className="icon-wrap blue"><Star size={16} /></span>
                <div>
                  <strong>Positive Attitude</strong>
                  <p>Willingness to support younger cohorts with a positive, encouraging mindset.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap blue"><Star size={16} /></span>
                <div>
                  <strong>Reliability</strong>
                  <p>Consistency is key. We expect volunteers to adhere to their scheduled hours.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap blue"><Star size={16} /></span>
                <div>
                  <strong>Passion for Helping</strong>
                  <p>A genuine interest in teaching, mentoring, or backing community service projects.</p>
                </div>
              </li>
              <li>
                <span className="icon-wrap blue"><Star size={16} /></span>
                <div>
                  <strong>Strong Communication</strong>
                  <p>Ability to speak respectfully and clearly with students, parents, and program leads.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form Wizard */}
        <div className="volunteer-form-panel">
          <div className="form-wizard-card">
            
            {/* Step Wizard Nav Header */}
            <div className="wizard-progress-bar-container">
              <div className="wizard-progress-line" style={{ width: `${progressPercentage === 0 ? 5 : progressPercentage}%` }}></div>
            </div>
            
            <div className="wizard-step-labels">
              <div className={`step-label ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
              <div className={`step-label ${step >= 2 ? 'active' : ''}`}>2. Preferences</div>
              <div className={`step-label ${step >= 3 ? 'active' : ''}`}>3. Intent</div>
            </div>

            <form onSubmit={handleSubmit} className="wizard-form">
              
              {/* STEP 1: Personal & Contact */}
              {step === 1 && (
                <div className="wizard-step-content animate-fade-in">
                  <h3>Basic Information</h3>
                  <p className="wizard-step-desc">Provide your contact and personal information so our coordinators can reach you.</p>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="firstName">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        placeholder="Jane"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="jane.doe@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth *</label>
                    <input 
                      type="date" 
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="city">City *</label>
                      <input 
                        type="text" 
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="Future City"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state">State *</label>
                      <input 
                        type="text" 
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Background & Availability */}
              {step === 2 && (
                <div className="wizard-step-content animate-fade-in">
                  <h3>Preferences & Background</h3>
                  <p className="wizard-step-desc">Tell us about your educational status, job, and preferred service scheduling.</p>

                  <div className="form-group">
                    <label htmlFor="schoolOrOrg">School or Organization</label>
                    <input 
                      type="text" 
                      id="schoolOrOrg"
                      value={formData.schoolOrOrg}
                      onChange={(e) => setFormData({...formData, schoolOrOrg: e.target.value})}
                      placeholder="e.g. Future High School / State University"
                    />
                  </div>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="gradeLevel">Grade Level (If student)</label>
                      <select 
                        id="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({...formData, gradeLevel: e.target.value})}
                      >
                        <option value="">Select current grade</option>
                        <option value="High School Freshman">High School Freshman</option>
                        <option value="High School Sophomore">High School Sophomore</option>
                        <option value="High School Junior">High School Junior</option>
                        <option value="High School Senior">High School Senior</option>
                        <option value="College Undergraduate">College Undergraduate</option>
                        <option value="Graduate Student">Graduate Student</option>
                        <option value="Not a student">Not a student</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="occupation">Occupation</label>
                      <input 
                        type="text" 
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                        placeholder="e.g. Software Engineer / Retail Lead"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">Availability *</label>
                    <select 
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData({...formData, availability: e.target.value})}
                      required
                    >
                      <option value="">Select standard availability</option>
                      <option value="Weekdays - Mornings">Weekdays - Mornings</option>
                      <option value="Weekdays - Afternoons">Weekdays - Afternoons</option>
                      <option value="Weekends Only">Weekends Only</option>
                      <option value="Full Summer Schedule">Full Summer Schedule</option>
                      <option value="Flexible / Irregular Hours">Flexible / Irregular Hours</option>
                    </select>
                  </div>

                  <div className="form-group row">
                    <div>
                      <label htmlFor="hoursMonthly">Hours Available Monthly *</label>
                      <select 
                        id="hoursMonthly"
                        value={formData.hoursMonthly}
                        onChange={(e) => setFormData({...formData, hoursMonthly: e.target.value})}
                        required
                      >
                        <option value="">Select hours range</option>
                        <option value="5-10 hours">5-10 hours</option>
                        <option value="10-20 hours">10-20 hours</option>
                        <option value="20-40 hours">20-40 hours</option>
                        <option value="40+ hours">40+ hours</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="preferredRole">Preferred Volunteer Role *</label>
                      <select 
                        id="preferredRole"
                        value={formData.preferredRole}
                        onChange={(e) => setFormData({...formData, preferredRole: e.target.value})}
                        required
                      >
                        <option value="">Select preferred role</option>
                        <option value="Leadership Workshop Instructor">Leadership Workshop Instructor</option>
                        <option value="Technology & Coding Lab Facilitator">Technology & Coding Lab Facilitator</option>
                        <option value="Community Service Project Lead">Community Service Project Lead</option>
                        <option value="One-on-One Student Mentor">One-on-One Student Mentor</option>
                        <option value="Event Planning & Logistics Support">Event Planning & Logistics Support</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Motivations & Intent */}
              {step === 3 && (
                <div className="wizard-step-content animate-fade-in">
                  <h3>Motivation & Contribution</h3>
                  <p className="wizard-step-desc">Share why you want to support Future Ready Youth and what you can contribute.</p>

                  <div className="form-group">
                    <label htmlFor="reasonToVolunteer">Why do you want to volunteer with Future Ready Youth? *</label>
                    <textarea 
                      id="reasonToVolunteer"
                      rows={3}
                      value={formData.reasonToVolunteer}
                      onChange={(e) => setFormData({...formData, reasonToVolunteer: e.target.value})}
                      placeholder="Share your goals and passion for helping students..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="skillsToContribute">What skills can you contribute? *</label>
                    <textarea 
                      id="skillsToContribute"
                      rows={3}
                      value={formData.skillsToContribute}
                      onChange={(e) => setFormData({...formData, skillsToContribute: e.target.value})}
                      placeholder="e.g. Python coding, design, curriculum management, public speaking..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="volunteerExperience">Volunteer Experience (Describe briefly)</label>
                    <textarea 
                      id="volunteerExperience"
                      rows={2}
                      value={formData.volunteerExperience}
                      onChange={(e) => setFormData({...formData, volunteerExperience: e.target.value})}
                      placeholder="Describe any past volunteer or academic support roles..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="additionalComments">Additional Comments</label>
                    <textarea 
                      id="additionalComments"
                      rows={2}
                      value={formData.additionalComments}
                      onChange={(e) => setFormData({...formData, additionalComments: e.target.value})}
                      placeholder="Any special accommodations, food preferences, or secondary roles..."
                    ></textarea>
                  </div>

                  <div className="form-group consent-container">
                    <label className="custom-checkbox-wrap">
                      <input 
                        type="checkbox" 
                        checked={formData.consent}
                        onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                        required
                      />
                      <span className="custom-checkbox-box"></span>
                      <span className="consent-text">
                        I hereby consent that the information provided is correct, and I agree to actively participate in volunteer trainings, orientation, and maintain cohort privacy guidelines. *
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="wizard-actions">
                {step > 1 && (
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                
                {step < totalSteps ? (
                  <button type="button" className="btn btn-primary ml-auto" onClick={nextStep} style={{ marginLeft: "auto" }}>
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-accent ml-auto" 
                    disabled={isSubmitting}
                    style={{ marginLeft: "auto" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
