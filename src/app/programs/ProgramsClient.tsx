"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Compass, Heart, Shield, Users, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import "./Programs.css";

interface ProgramType {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  objectives: string;
  benefits: string;
  futureGoals: string;
  themeClass: string;
}

function getProgramIcon(name: string) {
  switch (name) {
    case "Award": return <Award size={24} />;
    case "Compass": return <Compass size={24} />;
    case "Heart": return <Heart size={24} />;
    case "Shield": return <Shield size={24} />;
    case "Users": return <Users size={24} />;
    default: return <Lightbulb size={24} />;
  }
}

export default function ProgramsClient({ initialPrograms }: { initialPrograms: ProgramType[] }) {
  const [activeTab, setActiveTab] = useState(0);

  if (initialPrograms.length === 0) {
    return (
      <div className="programs-page" style={{ padding: "8rem 0", textAlign: "center" }}>
        <div className="container">
          <h2>No Cohort Programs Available</h2>
          <p>Please log in as an administrator to add initiatives.</p>
        </div>
      </div>
    );
  }

  const currentProgram = initialPrograms[activeTab] || initialPrograms[0];

  // Parse objectives and benefits from newline separated text
  const objectivesArray = (currentProgram.objectives || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const benefitsArray = (currentProgram.benefits || "")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  return (
    <div className="programs-page animate-fade-in">
      {/* Page Header */}
      <section className="programs-hero-section">
        <div className="container text-center">
          <span className="programs-badge">Our Cohorts</span>
          <h1 className="section-title">Core Initiatives & Programs</h1>
          <p className="subtitle">Explore our six structured initiatives designed to build confident, tech-fluent, and service-minded changemakers.</p>
        </div>
      </section>

      {/* Main Program Interactive Portal */}
      <section className="programs-portal-section">
        <div className="container portal-grid">
          
          {/* Left Sidebar Tab Selector */}
          <div className="portal-sidebar">
            <h3 className="sidebar-title">Select Initiative</h3>
            <div className="sidebar-nav">
              {initialPrograms.map((prog, idx) => (
                <button 
                  key={prog.id} 
                  className={`sidebar-tab-btn ${idx === activeTab ? 'active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className={`tab-icon-box ${prog.themeClass}`}>
                    {getProgramIcon(prog.iconName)}
                  </div>
                  <div className="tab-btn-text">
                    <h4>{prog.title}</h4>
                    <p>{prog.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Active Program Detail Panel */}
          <div className="portal-detail-panel animate-fade-in" key={activeTab}>
            <div className="detail-header">
              <span className={`detail-badge ${currentProgram.themeClass}`}>Active Summer Program</span>
              <h2>{currentProgram.title}</h2>
              <p className="detail-tagline"><em>{currentProgram.subtitle}</em></p>
            </div>

            <div className="detail-body">
              {/* Description */}
              <div className="detail-section">
                <h3>About the Program</h3>
                <p className="detail-desc-text">{currentProgram.description}</p>
              </div>

              <div className="detail-columns">
                {/* Objectives */}
                <div className="detail-col">
                  <h3>Key Objectives</h3>
                  <ul className="objectives-list">
                    {objectivesArray.map((obj, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className="objective-icon" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="detail-col">
                  <h3>Student Benefits</h3>
                  <ul className="benefits-list">
                    {benefitsArray.map((ben, i) => (
                      <li key={i}>
                        <span className="benefit-marker">&bull;</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Future Goals */}
              <div className="detail-section future-goals-box">
                <h4>🚀 Looking Ahead (Future Goals)</h4>
                <p>{currentProgram.futureGoals}</p>
              </div>
            </div>

            {/* Application Prompt CTA */}
            <div className="detail-footer-cta">
              <div>
                <h4>Interested in leading or joining this initiative?</h4>
                <p>We are actively recruiting passionate student leaders, advisors, and mentors.</p>
              </div>
              <Link href="/volunteer" className="btn btn-primary">
                Apply to Volunteer <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Partnerships Banner */}
      <section className="programs-partnerships-section">
        <div className="container text-center partners-box">
          <h2>Support Our Initiatives</h2>
          <p>Are you a school administrator or sponsor interested in bringing these programs to your district?</p>
          <div className="partners-buttons">
            <Link href="/contact" className="btn btn-secondary btn-large">
              Partner With Us
            </Link>
            <Link href="/involved" className="btn btn-outline btn-large" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)' }}>
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
