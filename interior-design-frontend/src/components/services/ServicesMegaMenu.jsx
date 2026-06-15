import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import mainServices from "../../data/servicesData";

const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

const ServicesMegaMenu = ({ isOpen, onClose, onSelectSubservice }) => {
  const [activeService, setActiveService] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const active = mainServices.find((s) => s.id === activeService);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveService(null);
      onClose();
    }, 150);
  };

  if (!isOpen) return null;

  // ── MOBILE ──
  if (isMobile) {
    return (
      <div style={{
        position: "absolute", top: "100%", left: "-100px", right: 0,
        zIndex: 50, background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)", width: "260px",
        maxHeight: "70vh", overflowY: "auto",
      }}>
        {mainServices.map((service) => (
          <div key={service.id}>
            <div
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", cursor: "pointer",
                borderBottom: "1px solid #f1f1f1",
                background: activeService === service.id ? "#fff8f0" : "#fff",
                borderLeft: activeService === service.id ? "3px solid #f97316" : "3px solid transparent",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: activeService === service.id ? 600 : 400, color: activeService === service.id ? "#f97316" : "#374151" }}>
                {service.name}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af", display: "inline-block", transition: "transform 0.2s", transform: activeService === service.id ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
            </div>

            {activeService === service.id && (
              <div style={{ background: "#fafafa", borderBottom: "1px solid #f1f1f1" }}>
                {/* Grouped subservices (renovation) */}
                {service.subGroups ? (
                  service.subGroups.map((group) => (
                    <div key={group.groupName}>
                      <div style={{ padding: "8px 16px 4px 28px", fontSize: "11px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {group.groupName}
                      </div>
                      {group.items.map((sub, i) => (
                        <Link
                          key={i}
                          to={`/services/${service.id}/${slugify(sub)}`}
                          onClick={() => { onSelectSubservice && onSelectSubservice(service.id, sub); setActiveService(null); onClose(); }}
                          style={{ display: "block", padding: "10px 16px 10px 36px", fontSize: "13px", color: "#555", textDecoration: "none", borderBottom: "1px solid #f1f1f1" }}
                        >
                          › {sub}
                        </Link>
                      ))}
                    </div>
                  ))
                ) : (
                  service.subservices.map((sub, i) => (
                    <Link
                      key={i}
                      to={`/services/${service.id}/${slugify(sub)}`}
                      onClick={() => { onSelectSubservice && onSelectSubservice(service.id, sub); setActiveService(null); onClose(); }}
                      style={{ display: "block", padding: "11px 16px 11px 28px", fontSize: "13px", color: "#555", textDecoration: "none", borderBottom: i < service.subservices.length - 1 ? "1px solid #f1f1f1" : "none" }}
                    >
                      › {sub}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ── DESKTOP ──
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "absolute", top: "100%", right: 0, left: "auto", zIndex: 50, display: "flex", flexDirection: "row" }}
    >
      {/* Subservices — left panel */}
      {active && (
        <div style={{
          background: "#fff", minWidth: "240px",
          borderTop: "1px solid #e5e7eb", borderLeft: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb", borderRight: "none",
          boxShadow: "-4px 8px 30px rgba(0,0,0,0.08)",
          maxHeight: "420px", overflowY: "auto",
        }}>
          <div style={{ padding: "10px 16px", background: "#fff8f0", borderBottom: "1px solid #f0e8e0" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              {active.name}
            </p>
          </div>

          {/* Grouped (renovation) */}
          {active.subGroups ? (
            active.subGroups.map((group) => (
              <div key={group.groupName}>
                <div style={{ padding: "10px 16px 6px", fontSize: "11px", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em", background: "#fffaf5", borderBottom: "1px solid #f5ece0" }}>
                  {group.groupName}
                </div>
                {group.items.map((sub, i) => (
                  <Link
                    key={i}
                    to={`/services/${active.id}/${slugify(sub)}`}
                    onClick={() => { onSelectSubservice && onSelectSubservice(active.id, sub); setActiveService(null); onClose(); }}
                    style={{ display: "block", padding: "11px 24px 11px 28px", fontSize: "13px", color: "#374151", textDecoration: "none", borderBottom: "1px solid #f5f5f5", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f97316"; e.currentTarget.style.background = "#fff7ed"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "#fff"; }}
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            ))
          ) : (
            active.subservices.map((sub, i) => (
              <Link
                key={i}
                to={`/services/${active.id}/${slugify(sub)}`}
                onClick={() => { onSelectSubservice && onSelectSubservice(active.id, sub); setActiveService(null); onClose(); }}
                style={{ display: "block", padding: "12px 24px", fontSize: "13px", color: "#374151", textDecoration: "none", borderBottom: "1px solid #f5f5f5", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f97316"; e.currentTarget.style.background = "#fff7ed"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "#fff"; }}
              >
                {sub}
              </Link>
            ))
          )}
        </div>
      )}

      {/* Main services — right panel */}
      <div style={{
        background: "#fff", minWidth: "240px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        maxHeight: "420px", overflowY: "auto",
      }}>
        {mainServices.map((service) => (
          <div
            key={service.id}
            onMouseEnter={() => setActiveService(service.id)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 20px", cursor: "pointer", fontSize: "14px",
              color: activeService === service.id ? "#c9922a" : "#374151",
              fontWeight: activeService === service.id ? 600 : 400,
              background: activeService === service.id ? "#fff8f0" : "#fff",
              borderLeft: activeService === service.id ? "3px solid #c9922a" : "3px solid transparent",
              transition: "all 0.15s", borderBottom: "1px solid #f5f5f5",
            }}
          >
            <span>{service.name}</span>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesMegaMenu;