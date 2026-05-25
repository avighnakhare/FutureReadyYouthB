"use client";

import { Check, Star, ExternalLink, Users, Award, Shield } from "lucide-react";
import "./Volunteer.css";

export default function VolunteerPage() {
  return (
    <div className="volunteer-page animate-fade-in">
      <div className="container volunteer-grid-layout">
        
        {/* Left Side: Requirements & Benefits Panel */}
        <div className="volunteer-info-panel animate-slide-left">
          <div className="info-block">
            <span className="info-badge">Join Us</span>
            <h2>Volunteer With Future Ready Youth</h2>
            <p className="info-intro">
              Shape young minds this summer. By becoming a volunteer or officer, you actively guide underrepresented students toward future success in tech, leadership, and careers.
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
                  <p>Physically witness a child's eyes light up when they construct their very first coding layout.</p>
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

        {/* Right Side: Application Portal */}
        <div className="volunteer-form-panel animate-slide-right">
          <div className="app-portal-card">
            <span className="portal-badge">Application Hub</span>
            <h3 className="portal-title">Join Our Leadership & Support Team</h3>
            <p className="portal-desc">
              We offer two distinct ways to get involved this summer. Choose the path that matches your goals, availability, and leadership aspirations.
            </p>

            <div className="application-options-container">
              
              {/* Option 1: General Volunteer */}
              <div className="app-option-card hover-lift">
                <div className="option-header">
                  <div className="option-icon orange">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4>General Volunteer</h4>
                    <span className="option-duration">Flexible Hours</span>
                  </div>
                </div>
                <p className="option-desc">
                  Ideal for students and professionals looking to mentor students, assist in coding labs, lead workshop sessions, or support event logistics.
                </p>
                <div className="option-highlights">
                  <span className="highlight-tag">No Experience Required</span>
                  <span className="highlight-tag">Certified Service Hours</span>
                </div>
                <a 
                  href="https://forms.gle/YkgCyRWt9Y78JLF77" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-accent btn-full"
                >
                  Apply as Volunteer <ExternalLink size={16} />
                </a>
              </div>

              {/* Option 2: Officer & Leadership */}
              <div className="app-option-card hover-lift featured-option-card">
                <div className="option-header">
                  <div className="option-icon purple">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4>Officer & Lead Positions</h4>
                    <span className="option-duration">Structured Commitment</span>
                  </div>
                </div>
                <p className="option-desc">
                  For experienced individuals looking to assume greater responsibility, coordinate program operations, direct community projects, or manage team logistics.
                </p>
                <div className="option-highlights">
                  <span className="highlight-tag">Leadership Roles</span>
                  <span className="highlight-tag">Resume Builder</span>
                </div>
                <a 
                  href="https://forms.gle/iN2DF15GznXceLva6" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary btn-full"
                >
                  Apply for Officer Role <ExternalLink size={16} />
                </a>
              </div>

            </div>

            {/* Quick Process Info */}
            <div className="process-info-box">
              <div className="process-header">
                <Shield size={16} className="process-icon" />
                <h5>Our Selection Process</h5>
              </div>
              <p>
                Once you submit the Google Form, our core team will review your responses. Selected applicants will be contacted via email within 3–5 business days to coordinate a brief virtual orientation.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
