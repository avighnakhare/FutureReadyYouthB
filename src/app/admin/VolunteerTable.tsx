"use client";

import { useState } from "react";
import type { Volunteer } from "@prisma/client";
import { Search, Download, ChevronDown, ChevronUp } from "lucide-react";

export default function VolunteerTable({ data }: { data: Volunteer[] }) {
  const [volunteersList, setVolunteersList] = useState<Volunteer[]>(data);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setVolunteersList(prev => 
          prev.map(v => v.id === id ? { ...v, status: newStatus } : v)
        );
      } else {
        alert("Failed to update status.");
      }
    } catch {
      alert("Network error updating status.");
    }
  };

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter application rows
  const filteredData = volunteersList.filter((v) => {
    const fullName = `${v.firstName} ${v.lastName}`.toLowerCase();
    const searchString = filterText.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchString) ||
      v.email.toLowerCase().includes(searchString) ||
      v.preferredRole.toLowerCase().includes(searchString) ||
      v.city.toLowerCase().includes(searchString);

    const matchesStatus = statusFilter === "All" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    const headers = [
      "ID", "First Name", "Last Name", "Email", "Phone", "DoB", 
      "City", "State", "School/Org", "Grade Level", "Occupation", 
      "Availability", "Monthly Hours", "Preferred Role", "Motivations", 
      "Skills", "Experience", "Status", "Applied Date"
    ];

    const rows = filteredData.map(v => [
      v.id,
      v.firstName,
      v.lastName,
      v.email,
      v.phoneNumber,
      v.dateOfBirth,
      v.city,
      v.state,
      `"${(v.schoolOrOrg || "").replace(/"/g, '""')}"`,
      v.gradeLevel || "N/A",
      v.occupation || "N/A",
      v.availability,
      v.hoursMonthly,
      v.preferredRole,
      `"${(v.reasonToVolunteer || "").replace(/"/g, '""')}"`,
      `"${(v.skillsToContribute || "").replace(/"/g, '""')}"`,
      `"${(v.volunteerExperience || "").replace(/"/g, '""')}"`,
      v.status,
      new Date(v.createdAt).toLocaleDateString()
    ]);

    // Protect CSV cell content by forcing Excel UTF-8 BOM
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const encodedUri = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "future_ready_youth_volunteers.csv");
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(encodedUri);
  };

  return (
    <div className="table-wrapper">
      
      {/* Search & Filter Nav Controls */}
      <div className="table-controls-row">
        {/* Search */}
        <div className="admin-search-wrapper">
          <Search className="search-icon" size={16} />
          <input 
            type="text" 
            placeholder="Search by name, role, city..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Status Category Filter */}
        <div className="admin-filters-wrapper">
          <div className="status-select-wrapper">
            <span className="filter-label">Status Filter:</span>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-select-btn">
              <option value="All">All Applicants</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

          <button onClick={downloadCSV} className="btn btn-secondary btn-small">
            <Download size={14} /> Export CSV (Excel Compliant)
          </button>
        </div>
      </div>

      {/* Responsive Table Data */}
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Contact Coordinates</th>
              <th>Role Preference</th>
              <th>Timing & Hours</th>
              <th>Applied Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? filteredData.map((v) => {
              const isExpanded = expandedId === v.id;
              const statusClass = v.status.toLowerCase().replace(/ /g, "-");
              return (
                <>
                  {/* Row */}
                  <tr key={v.id} onClick={() => toggleRow(v.id)} className={`table-row-item ${isExpanded ? 'expanded-row' : ''}`}>
                    <td>
                      <div className="applicant-name-col">
                        {isExpanded ? <ChevronUp size={16} className="chevron" /> : <ChevronDown size={16} className="chevron" />}
                        <div>
                          <strong>{v.firstName} {v.lastName}</strong>
                          <span className="city-state-text">{v.city}, {v.state}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-details-col">
                        <a href={`mailto:${v.email}`} onClick={e => e.stopPropagation()}>{v.email}</a>
                        <span>{v.phoneNumber}</span>
                      </div>
                    </td>
                    <td>
                      <span className="role-badge">{v.preferredRole}</span>
                    </td>
                    <td>
                      <div className="hours-details-col">
                        <strong>{v.hoursMonthly} monthly</strong>
                        <span>{v.availability}</span>
                      </div>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="status-cell-wrapper">
                        <select 
                          value={v.status} 
                          onChange={(e) => handleStatusChange(v.id, e.target.value)}
                          className={`status-indicator-select ${statusClass}`}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable Details Drawer */}
                  {isExpanded && (
                    <tr className="detail-row-expanded">
                      <td colSpan={5}>
                        <div className="details-drawer-content animate-fade-in">
                          <div className="drawer-grid">
                            
                            {/* Personal & Educational details */}
                            <div className="drawer-col">
                              <h4>Background & Personal</h4>
                              <p><strong>Date of Birth:</strong> {v.dateOfBirth}</p>
                              <p><strong>School or Organization:</strong> {v.schoolOrOrg || "N/A"}</p>
                              <p><strong>Current Grade Level:</strong> {v.gradeLevel || "N/A"}</p>
                              <p><strong>Occupation:</strong> {v.occupation || "N/A"}</p>
                              <p><strong>Consent to terms:</strong> {v.consent ? "Yes, Agreed" : "No"}</p>
                            </div>

                            {/* Motivations & text answers */}
                            <div className="drawer-col flex-double">
                              <h4>Intent & Motivations</h4>
                              <div className="qa-block">
                                <strong>Why do they want to volunteer with Future Ready Youth?</strong>
                                <p>{v.reasonToVolunteer}</p>
                              </div>
                              <div className="qa-block">
                                <strong>What skills can they contribute?</strong>
                                <p>{v.skillsToContribute}</p>
                              </div>
                              <div className="qa-block">
                                <strong>Volunteer or coaching experience:</strong>
                                <p>{v.volunteerExperience || "None provided"}</p>
                              </div>
                              {v.additionalComments && (
                                <div className="qa-block">
                                  <strong>Additional Comments:</strong>
                                  <p>{v.additionalComments}</p>
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            }) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "4rem" }} className="empty-table-cell">
                  No applicants found matching this search or status selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
