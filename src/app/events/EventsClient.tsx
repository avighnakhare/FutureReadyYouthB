"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Tag, X, User, Mail, Check } from "lucide-react";
import "./Events.css";

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  host: string;
  capacity: number;
  spotsLeft: number;
}

export default function EventsClient({ initialEvents }: { initialEvents: Event[] }) {
  const [eventsList, setEventsList] = useState<Event[]>(initialEvents);
  const [filter, setFilter] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registerEvent, setRegisterEvent] = useState<Event | null>(null);
  
  // Registration state tracking
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredEvents = eventsList.filter(ev => 
    filter === "All" || ev.category === filter
  );

  const handleRegisterClick = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    setRegName("");
    setRegEmail("");
    setRegSuccess(false);
    setRegisterEvent(event);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: registerEvent!.id,
          fullName: regName,
          email: regEmail
        })
      });

      const data = await res.json();
      if (data.success) {
        setRegisteredIds(prev => [...prev, registerEvent!.id]);
        
        // Update local spots left
        setEventsList(prev => 
          prev.map(ev => ev.id === registerEvent!.id ? { ...ev, spotsLeft: ev.spotsLeft - 1 } : ev)
        );
        
        setRegSuccess(true);
        setTimeout(() => {
          setRegisterEvent(null);
          setRegSuccess(false);
        }, 1500);
      } else {
        alert(data.error || "Failed to register.");
      }
    } catch {
      alert("Network error confirming registration.");
    }
    setIsSubmitting(false);
  };

  // Mock Calendar month array (June 2026 starting on Monday)
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
    const dayStr = day.toString().padStart(2, "0");
    const dateStr = `2026-06-${dayStr}`;
    return eventsList.filter(ev => ev.date.endsWith(dayStr) || ev.date === dateStr);
  };

  return (
    <div className="events-page animate-fade-in">
      
      {/* Hero Header */}
      <section className="events-hero-section">
        <div className="container text-center">
          <span className="events-badge">Founding Events</span>
          <h1 className="section-title">Events & Workshops</h1>
          <p className="subtitle">Register for upcoming workshops, community service initiatives, and volunteer planning sessions.</p>
        </div>
      </section>

      {/* Main Grid: Calendar & Filtered Events */}
      <section className="events-main-section">
        <div className="container events-grid-layout">
          
          {/* LEFT: Calendar view */}
          <div className="calendar-container">
            <h3 className="container-title">June 2026 Calendar</h3>
            <div className="calendar-grid-header">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>
            <div className="calendar-days-grid">
              {calendarDays.map((day) => {
                const dayEvents = getEventsForDay(day);
                return (
                  <div key={day} className={`calendar-day-box ${dayEvents.length > 0 ? 'has-event' : ''}`}>
                    <span className="day-number">{day}</span>
                    <div className="day-event-dots">
                      {dayEvents.map((ev, idx) => (
                        <span 
                          key={idx} 
                          className={`event-dot ${ev.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          title={`${ev.category}: ${ev.title}`}
                        ></span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="calendar-legend">
              <span className="legend-item"><span className="dot-key workshop"></span> Workshop</span>
              <span className="legend-item"><span className="dot-key service-project"></span> Service Project</span>
              <span className="legend-item"><span className="dot-key meeting"></span> Meeting</span>
            </div>
          </div>

          {/* RIGHT: List view with filter */}
          <div className="events-list-container">
            <div className="list-header-row">
              <h3 className="container-title">Upcoming Dates</h3>
              
              {/* Category Filter */}
              <div className="filter-nav">
                {["All", "Workshop", "Service Project", "Meeting"].map((cat) => (
                  <button 
                    key={cat} 
                    className={`filter-btn ${filter === cat ? 'active' : ''}`}
                    onClick={() => setFilter(cat)}
                  >
                    {cat}s
                  </button>
                ))}
              </div>
            </div>

            <div className="events-list">
              {filteredEvents.length > 0 ? filteredEvents.map((ev) => {
                const isRegistered = registeredIds.includes(ev.id);
                const isSoldOut = ev.spotsLeft <= 0;
                return (
                  <div 
                    key={ev.id} 
                    className={`event-list-card ${isRegistered ? 'registered-card' : ''}`}
                    onClick={() => setSelectedEvent(ev)}
                  >
                    <div className="event-card-header">
                      <span className={`event-category-badge ${ev.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                        {ev.category}
                      </span>
                      {isRegistered && (
                        <span className="registered-badge">
                          <Check size={14} /> Registered
                        </span>
                      )}
                    </div>
                    
                    <h3>{ev.title}</h3>
                    
                    <div className="event-meta-info">
                      <div className="meta-item">
                        <CalendarIcon size={14} />
                        <span>{ev.date}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{ev.time}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{ev.location}</span>
                      </div>
                    </div>

                    <div className="event-card-footer">
                      <div className="spots-left-text">
                        {isRegistered ? "You are locked in!" : isSoldOut ? "Fully Booked" : `${ev.spotsLeft} spots available`}
                      </div>
                      {isRegistered ? (
                        <button className="btn btn-secondary btn-small" disabled>Confirmed</button>
                      ) : isSoldOut ? (
                        <button className="btn btn-outline btn-small" disabled>Sold Out</button>
                      ) : (
                        <button 
                          onClick={(e) => handleRegisterClick(e, ev)} 
                          className="btn btn-primary btn-small"
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              }) : (
                <div className="no-events-box" style={{ lineHeight: "1.7" }}>
                  <strong>No upcoming events are scheduled at this time.</strong>
                  <br />
                  As Future Ready Youth launches its founding initiatives, our administrator will publish workshops, service drives, and volunteer orientation meetings directly to this portal.
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* EVENT DETAIL OVERLAY MODAL */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <span className={`event-category-badge ${selectedEvent.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                {selectedEvent.category}
              </span>
              <h2>{selectedEvent.title}</h2>
            </div>
            <div className="modal-body">
              <p className="modal-desc">{selectedEvent.description}</p>
              
              <div className="modal-meta-grid">
                <div>
                  <strong>Date:</strong>
                  <p>{selectedEvent.date}</p>
                </div>
                <div>
                  <strong>Time:</strong>
                  <p>{selectedEvent.time}</p>
                </div>
                <div>
                  <strong>Location:</strong>
                  <p>{selectedEvent.location}</p>
                </div>
                <div>
                  <strong>Event Organizer:</strong>
                  <p>{selectedEvent.host}</p>
                </div>
              </div>

              <div className="modal-footer">
                {registeredIds.includes(selectedEvent.id) ? (
                  <div className="registered-success-text">🎉 You are registered for this event!</div>
                ) : selectedEvent.spotsLeft <= 0 ? (
                  <div className="registered-success-text" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)", borderColor: "rgba(30, 64, 175, 0.15)" }}>This event is fully booked.</div>
                ) : (
                  <button 
                    onClick={(e) => {
                      setSelectedEvent(null);
                      handleRegisterClick(e, selectedEvent);
                    }} 
                    className="btn btn-accent btn-large"
                    style={{ width: "100%" }}
                  >
                    Register for Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVENT REGISTRATION OVERLAY MODAL */}
      {registerEvent && (
        <div className="modal-overlay" onClick={() => setRegisterEvent(null)}>
          <div className="modal-card register-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setRegisterEvent(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2>Register for Event</h2>
              <p className="subtitle" style={{ margin: 0, fontSize: "0.95rem", textAlign: "left" }}>
                Sign up for: <strong>{registerEvent.title}</strong>
              </p>
            </div>
            
            <div className="modal-body">
              {regSuccess ? (
                <div className="reg-success-screen text-center animate-fade-in">
                  <div className="success-icon-badge">✅</div>
                  <h3>Registration Confirmed!</h3>
                  <p>Your details have been securely logged. The coordinator will contact you with schedules and directions.</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="register-event-form">
                  <div className="form-group">
                    <label htmlFor="regName">Your Full Name *</label>
                    <input 
                      type="text" 
                      id="regName" 
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="regEmail">Your Email Address *</label>
                    <input 
                      type="email" 
                      id="regEmail" 
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-accent btn-large" style={{ width: "100%", marginTop: "1rem" }} disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Confirm Event Registration"}
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
