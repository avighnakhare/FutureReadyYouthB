import { Award, Compass, Heart, Shield, Users, BookOpen, User, Mail } from "lucide-react";
import { prisma } from "@/lib/db";
import { initializeDatabase } from "@/lib/init";
import "./About.css";

export const dynamic = "force-dynamic";

export default async function About() {
  // Guarantee DB initialized
  await initializeDatabase();

  // Load CMS Content keys
  const contents = await prisma.content.findMany({
    where: {
      key: { in: ["about_story", "about_mission", "about_vision"] }
    }
  });

  const contentMap = contents.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const coreValues = [
    {
      title: "Leadership",
      desc: "Guiding students to take initiative, inspire others, and lead with empathy, confidence, and purpose.",
      icon: <Award size={24} />,
      colorClass: "blue"
    },
    {
      title: "Innovation",
      desc: "Encouraging creativity, experimental thinking, and hands-on exposure to modern technologies.",
      icon: <Compass size={24} />,
      colorClass: "green"
    },
    {
      title: "Service",
      desc: "Instilling a deep sense of civic duty, community empathy, and active participation in local service.",
      icon: <Heart size={24} />,
      colorClass: "orange"
    },
    {
      title: "Integrity",
      desc: "Fostering absolute honesty, ethical choices, transparency, and responsibility in every endeavor.",
      icon: <Shield size={24} />,
      colorClass: "purple"
    },
    {
      title: "Inclusion",
      desc: "Ensuring every single young person, regardless of background, enjoys supportive learning access.",
      icon: <Users size={24} />,
      colorClass: "pink"
    },
    {
      title: "Lifelong Learning",
      desc: "Cultivating a perpetual curiosity, self-development drive, and constructive problem-solving skills.",
      icon: <BookOpen size={24} />,
      colorClass: "yellow"
    }
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Page Header */}
      <section className="about-hero-section">
        <div className="container text-center">
          <span className="about-badge">Who We Are</span>
          <h1 className="section-title">About Future Ready Youth</h1>
          <p className="subtitle">Learn about our story, foundational values, and our commitment to the next generation.</p>
        </div>
      </section>

      {/* Story, Vision, Mission */}
      <section className="story-vision-mission-section">
        <div className="container grid-container">
          <div className="about-main-card story-card">
            <span className="card-tag">Our Story</span>
            <h2>How We Started</h2>
            <p>
              {contentMap.about_story || "Future Ready Youth was created to help students gain practical, real-world skills often not taught in traditional classrooms."}
            </p>
          </div>

          <div className="mv-cards-wrapper">
            <div className="sub-mv-card mission">
              <h3>Our Mission</h3>
              <p>
                {contentMap.about_mission || "Future Ready Youth empowers students with leadership skills, technology exposure, community service opportunities, and real-world experiences that prepare them to become future leaders, innovators, and changemakers."}
              </p>
            </div>

            <div className="sub-mv-card vision">
              <h3>Our Vision</h3>
              <p>
                {contentMap.about_vision || "To create a generation of confident, skilled, and service-minded leaders."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values-section">
        <div className="container">
          <header className="text-center">
            <h2 className="section-title">Our Core Values</h2>
            <p className="subtitle">These pillars anchor every program, workshop, and community interaction we coordinate.</p>
          </header>

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className={`value-icon-box ${val.colorClass}`}>
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder (Seeded Founder Biography Area) */}
      <section className="founder-section">
        <div className="container founder-grid">
          <div className="founder-photo-side">
            <div className="founder-photo-card">
              <div className="founder-photo-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                  alt="Alex Johnson - Founder & Director" 
                  className="founder-real-img"
                />
              </div>
              <div className="founder-photo-details">
                <h3>Alex Johnson</h3>
                <p className="founder-title">Founder & Director</p>
                <div className="founder-socials">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="founder-social-link" aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> LinkedIn
                  </a>
                  <a href="mailto:futurereadyyouth6@gmail.com" className="founder-social-link" aria-label="Email">
                    <Mail size={16} style={{marginRight: '4px'}} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="founder-info-side">
            <span className="card-tag">Meet Our Founder</span>
            <h2>A Vision for Change</h2>
            <p className="founder-quote">
              "Every young person carries a spark of genius. Our job is to give them the tools, the tech, the mentors, and the space to let that spark burn bright."
            </p>
            <p>
              Alex Johnson founded Future Ready Youth after spending years tutoring and mentoring young students in underserved neighborhoods. He noticed a persistent issue: traditional curricula rarely had the room to cover essential modern life tools like software coding, team leadership mechanics, and structural community collaboration.
            </p>
            <p>
              Under his guidance, Future Ready Youth has evolved from a small neighborhood summer circle into an accredited regional nonprofit, connecting college mentors with eager student cohorts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
