"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight, Library, Search } from "lucide-react";
import "./Resources.css";

interface ResourceType {
  id: string;
  title: string;
  category: string;
  type: string;
  size: string;
  filename: string;
  description: string;
  content: string;
}

export default function ResourcesClient({ initialResources }: { initialResources: ResourceType[] }) {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");

  const handleDownload = (resource: ResourceType) => {
    // Create blob containing database guide content
    const blob = new Blob([resource.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = resource.filename;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredResources = initialResources.filter(res => {
    const matchesCategory = filter === "All" || res.category === filter;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) || 
                          res.description.toLowerCase().includes(search.toLowerCase()) ||
                          res.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="resources-page animate-fade-in">
      
      {/* Page Header */}
      <section className="resources-hero-section">
        <div className="container text-center">
          <span className="resources-badge">Learning Hub</span>
          <h1 className="section-title">Resource Library & Guides</h1>
          <p className="subtitle">Download official curriculum guides, instructor manuals, resume templates, and service templates.</p>
        </div>
      </section>

      {/* Main portal layout */}
      <section className="resources-main-section">
        <div className="container">
          
          {/* Filter and Search Bar Row */}
          <div className="resources-controls-row">
            {/* Search Input */}
            <div className="search-bar-box">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search resources by keyword or program..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="resources-search-input"
              />
            </div>

            {/* Category Navigation toggles */}
            <div className="resources-filters">
              {["All", "Leadership", "Technology", "Career Readiness", "Community Service"].map((cat) => (
                <button 
                  key={cat} 
                  className={`resource-filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Cards Grid */}
          <div className="resources-grid">
            {filteredResources.length > 0 ? filteredResources.map((res) => (
              <div key={res.id} className="resource-card animate-fade-in">
                <div className="resource-card-top">
                  <div className="file-icon-box">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="resource-category-tag">{res.category}</span>
                    <h3>{res.title}</h3>
                    <p className="resource-type-meta">{res.type} &bull; {res.size}</p>
                  </div>
                </div>

                <div className="resource-card-body">
                  <p>{res.description}</p>
                </div>

                <div className="resource-card-footer">
                  <button 
                    onClick={() => handleDownload(res)} 
                    className="btn btn-accent btn-small"
                    style={{ width: "100%" }}
                  >
                    <Download size={14} /> Download Resource (TXT)
                  </button>
                </div>
              </div>
            )) : (
              <div className="no-results-card text-center" style={{ width: "100%", gridColumn: "1 / -1" }}>
                <Library size={48} className="no-res-icon" />
                <h3>No learning resources available</h3>
                <p>Try clearing your search query or login as an administrator to upload syllabus guides.</p>
              </div>
            )}
          </div>

          {/* Teacher / Advisor CTA Banner */}
          <div className="resources-cta-banner">
            <div>
              <h3>Need Custom Curriculums or Custom Materials?</h3>
              <p>Our program coordinators collaborate directly with schools and community hubs to prepare tailored learning syllabi.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Contact Curriculum Lead <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
