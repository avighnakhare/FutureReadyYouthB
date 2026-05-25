"use client";

import { useState } from "react";
import { Search, ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import "./FAQ.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FaqClient({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = initialFaqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase()) ||
    faq.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="faq-page animate-fade-in">
      
      {/* Hero Header */}
      <section className="faq-hero-section">
        <div className="container text-center">
          <span className="faq-badge">Got Questions?</span>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="subtitle">Search our comprehensive support base covering general details, student programs, volunteering, and sponsorships.</p>
        </div>
      </section>

      {/* Accordion List Portal */}
      <section className="faq-main-section">
        <div className="container max-width-container">
          
          {/* Search bar */}
          <div className="faq-search-wrapper">
            <Search className="faq-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by topic, keyword, category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="faq-search-input"
            />
          </div>

          {/* Accordion list */}
          <div className="faq-accordion-list">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                  <button className="faq-question-btn" onClick={() => handleToggle(faq.id)}>
                    <div className="question-text-row">
                      <span className="category-marker">{faq.category}</span>
                      <h4>{faq.question}</h4>
                    </div>
                    <ChevronDown size={18} className="chevron-icon" />
                  </button>
                  
                  {isOpen && (
                    <div className="faq-answer-panel animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            }) : (
              <div className="no-faqs-card text-center">
                <HelpCircle size={48} className="no-faq-icon" />
                <h3>No answers found</h3>
                <p>Try refining your search keyword or log in as an administrator to add FAQs.</p>
              </div>
            )}
          </div>

          {/* Unresolved Questions Banner */}
          <div className="faq-unresolved-banner text-center">
            <MessageSquare size={36} className="unresolved-icon" />
            <h3>Still have questions?</h3>
            <p>We are here to support you. Send our administrative desk a direct inquiry and we'll reply within 24 hours.</p>
            <div className="unresolved-btns">
              <Link href="/contact" className="btn btn-secondary">
                Send Direct Message
              </Link>
              <a href="mailto:futurereadyyouth6@gmail.com" className="btn btn-outline" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
                Email Support Team
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
