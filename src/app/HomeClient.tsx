"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Heart, Award, Shield, Users, Clock, Compass } from "lucide-react";
import "./Home.css";

interface MetricsType {
  studentsReached: number;
  volunteersEngaged: number;
  serviceHours: number;
  communityProjects: number;
  eventsHosted: number;
  mentors: number;
  donationsReceived: number;
  resourcesDistributed: number;
}

interface HomeClientProps {
  metrics: MetricsType;
  contentMap: Record<string, string>;
}

// Dynamic Stats Counter Component inside the page
function Counter({ end, suffix = "", duration = 1200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span className="counter-number">{count.toLocaleString()}{suffix}</span>;
}

export default function HomeClient({ metrics, contentMap }: HomeClientProps) {
  return (
    <div className="home-page animate-fade-in">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content-side animate-slide-left">
            <span className="badge">Startup Phase</span>
            <h1 className="hero-headline">
              <span className="gradient-text">
                {contentMap.home_headline || "Building Tomorrow's Leaders Today"}
              </span>
            </h1>
            <p className="hero-subheadline">
              Empowering youth through leadership training, technology exposure, hands-on community service, and real-world career readiness. Join us as a founding member!
            </p>
            <div className="hero-actions-container">
              <Link href="/volunteer" className="btn btn-accent btn-large">
                Become a Volunteer <ArrowRight size={18} />
              </Link>
              <Link href="/involved" className="btn btn-outline btn-large">
                Join Our Mission
              </Link>
              <Link href="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="hero-image-side animate-slide-right">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
                alt="Empowered students in classroom" 
                className="hero-real-image"
              />
              <div className="hero-floating-card top-left animate-float">
                <div className="floating-card-icon blue">🌟</div>
                <div>
                  <h4>Leadership</h4>
                  <p>Cohort Seeding</p>
                </div>
              </div>
              <div className="hero-floating-card bottom-right animate-float-delayed">
                <div className="floating-card-icon green">💻</div>
                <div>
                  <h4>100% Free</h4>
                  <p>For Students</p>
                </div>
              </div>
              <div className="hero-stats-card">
                <span className="pulse-dot"></span>
                <span>Founding Phase - Launching 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STARTUP STATUS SECTION */}
      <section className="startup-status-section" style={{ background: "rgba(17, 24, 39, 0.5)", backdropFilter: "blur(12px)", padding: "5rem 0", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
          <span className="badge" style={{ background: "var(--color-accent-light)", color: "var(--color-accent)" }}>Our Launch</span>
          <h2 style={{ fontSize: "2.25rem", marginTop: "0.5rem", marginBottom: "1.5rem", color: "var(--color-text)" }}>
            Building the Future From Day One
          </h2>
          <p style={{ fontSize: "1.15rem", color: "var(--color-text-muted)", lineHeight: "1.8" }}>
            "Future Ready Youth is currently in its founding stage. We are actively building our volunteer network, developing programs, and preparing our first initiatives. Every volunteer, supporter, and community member who joins now becomes part of our founding story."
          </p>
        </div>
      </section>

      {/* Impact Counters (Real zero stats or custom inputs) */}
      <section className="impact-stats-section">
        <div className="container stats-grid">
          <div className="stat-item-box">
            <Counter end={metrics.studentsReached} />
            <p className="stat-label">Students Reached</p>
          </div>
          <div className="stat-item-box">
            <Counter end={metrics.volunteersEngaged} />
            <p className="stat-label">Volunteers Engaged</p>
          </div>
          <div className="stat-item-box">
            <Counter end={metrics.serviceHours} />
            <p className="stat-label">Service Hours</p>
          </div>
          <div className="stat-item-box">
            <Counter end={metrics.communityProjects} />
            <p className="stat-label">Community Projects</p>
          </div>
        </div>
      </section>

      {/* Why Future Ready Youth */}
      <section className="why-us-section">
        <div className="container">
          <header className="text-center">
            <h2 className="section-title">Why Future Ready Youth</h2>
            <p className="subtitle">We go beyond textbook learning to provide comprehensive skill development that lasts a lifetime.</p>
          </header>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-box blue">
                <Award size={32} />
              </div>
              <h3>Leadership Development</h3>
              <p>We unlock student potential through active workshops, public speaking opportunities, team challenges, and peer-led coordination roles.</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon-box green">
                <Compass size={32} />
              </div>
              <h3>Technology Literacy</h3>
              <p>Practical introduction to modern digital tools, coding principles, logical thinking, and website construction for our tech-driven world.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box orange">
                <Heart size={32} />
              </div>
              <h3>Community Service</h3>
              <p>Fostering empathy and civic duty by engaging students directly in neighborhood cleanup, reading buddy, and elderly assistance drives.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box purple">
                <Shield size={32} />
              </div>
              <h3>Career Readiness</h3>
              <p>Equipping students with resume building tips, professional etiquette, simulated mock interviews, and interactions with real guest speakers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="featured-programs-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title left-aligned">Our Programs</h2>
              <p className="section-desc">Designed to educate, inspire, and prepare students for whatever comes next.</p>
            </div>
            <Link href="/programs" className="btn btn-outline">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="programs-grid">
            <div className="program-preview-card">
              <div className="program-card-badge blue">Workshop</div>
              <div className="program-card-body">
                <h3>Leadership Academy</h3>
                <p>Developing team skills, conflict resolution, and self-confidence. Students create their own action blueprints.</p>
                <Link href="/programs" className="program-card-link">
                  Learn Details & Objectives <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="program-preview-card">
              <div className="program-card-badge green">Tech</div>
              <div className="program-card-body">
                <h3>Technology For Tomorrow</h3>
                <p>Introducing hands-on coding games, hardware, and design workflows. Fostering future innovators.</p>
                <Link href="/programs" className="program-card-link">
                  Learn Details & Objectives <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="program-preview-card">
              <div className="program-card-badge orange">Community</div>
              <div className="program-card-body">
                <h3>Community Impact Projects</h3>
                <p>Planning and executing service events that make a physical, positive difference in local neighborhoods.</p>
                <Link href="/programs" className="program-card-link">
                  Learn Details & Objectives <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Replaced Fictional Testimonials with Spotlight) */}
      <section className="testimonials-section">
        <div className="container">
          <header className="text-center">
            <h2 className="section-title">Future Volunteer Spotlight</h2>
            <p className="subtitle">Learn how you can play an active, vital role in shaping our cohort's founding story.</p>
          </header>

          <div className="testimonial-slider-container" style={{ padding: "3rem", maxWidth: "700px" }}>
            <div className="star-rating" style={{ justifyContent: "center" }}>
              <Heart size={24} fill="var(--color-accent)" color="var(--color-accent)" />
            </div>
            <p className="testimonial-quote" style={{ fontSize: "1.2rem", fontWeight: 500, fontStyle: "normal" }}>
              "Your story could be featured here as we grow our organization."
            </p>
            <p className="testimonial-role" style={{ textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px" }}>
              Founding Cohorts Support
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta-section">
        <div className="container cta-box-container">
          <div className="cta-content">
            <h2>Ready to Shape the Future?</h2>
            <p>Your passion and skills can change a child's summer. Whether you lead a tech lab, teach leadership values, or support operations, you belong here.</p>
            <div className="cta-buttons">
              <Link href="/volunteer" className="btn btn-accent btn-large">
                Become a Volunteer Now <ArrowRight size={16} />
              </Link>
              <Link href="/involved" className="btn btn-outline btn-large" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
                Explore Other Roles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
