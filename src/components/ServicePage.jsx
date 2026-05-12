import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  .sp-services * { box-sizing: border-box; margin: 0; padding: 0; }

  .sp-services {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #0e0e0e;
    color: #F0F2F8;
    min-height: 100vh;
    padding: 60px 40px 80px;
  }

  /* ── HEADER ── */
  .sp-srv-header {
    margin-bottom: 56px;
    max-width: 600px;
  }
  .sp-srv-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #f59e0b;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sp-srv-eyebrow::before {
    content: '';
    display: inline-block;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #f59e0b;
    box-shadow: 0 0 8px #f59e0b;
  }
  .sp-srv-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.05;
    color: #F0F2F8;
    margin-bottom: 14px;
  }
  .sp-srv-title em {
    font-style: normal;
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .sp-srv-subtitle {
    font-size: 0.92rem;
    font-weight: 300;
    color: rgba(240,242,248,0.45);
    line-height: 1.8;
  }

  /* ── SERVICES GRID ── */
  .sp-srv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 48px;
  }

  .sp-srv-card {
    background: #111318;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 32px 28px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .sp-srv-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(245,158,11,0.06), transparent 60%);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .sp-srv-card:hover {
    background: #161a24;
    border-color: rgba(245,158,11,0.30);
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  }
  .sp-srv-card:hover::before { opacity: 1; }
  .sp-srv-card:hover .sp-srv-card-arrow { transform: translateX(4px); opacity: 1; }
  .sp-srv-card:hover .sp-srv-card-icon { transform: scale(1.12) rotate(-4deg); }

  .sp-srv-card-icon {
    font-size: 2.2rem;
    margin-bottom: 20px;
    display: block;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
    position: relative;
    z-index: 1;
  }

  .sp-srv-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }
  .sp-srv-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #F0F2F8;
  }
  .sp-srv-card-arrow {
    font-size: 1rem;
    color: #f59e0b;
    opacity: 0;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .sp-srv-card-desc {
    font-size: 0.83rem;
    color: rgba(240,242,248,0.42);
    line-height: 1.75;
    font-weight: 300;
    margin-bottom: 22px;
    position: relative;
    z-index: 1;
    flex: 1;
  }

  .sp-srv-card-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(240,242,248,0.50);
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    padding: 9px 16px;
    border-radius: 8px;
    transition: all 0.2s;
    position: relative;
    z-index: 1;
    width: fit-content;
  }
  .sp-srv-card:hover .sp-srv-card-cta {
    color: #F0F2F8;
    border-color: rgba(245,158,11,0.35);
    background: rgba(245,158,11,0.08);
  }

  /* Featured card */
  .sp-srv-card.featured {
    border-color: rgba(245,158,11,0.25);
    background: linear-gradient(160deg, #161a24 0%, #12151e 100%);
  }
  .sp-srv-card.featured .sp-srv-card-cta {
    background: #f59e0b;
    color: #000;
    border-color: transparent;
    font-weight: 700;
    box-shadow: 0 4px 18px rgba(245,158,11,0.28);
  }
  .sp-srv-card.featured:hover .sp-srv-card-cta {
    background: #fbbf24;
    box-shadow: 0 8px 28px rgba(245,158,11,0.40);
    color: #000;
  }

  /* ── BOTTOM BANNER ── */
  .sp-srv-banner {
    background: #111318;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 32px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .sp-srv-banner-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #F0F2F8;
    margin-bottom: 5px;
  }
  .sp-srv-banner-sub {
    font-size: 0.82rem;
    color: rgba(240,242,248,0.40);
    font-weight: 300;
  }
  .sp-srv-banner-actions {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }
  .btn-gold {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    color: #000;
    background: #f59e0b;
    border: none;
    padding: 11px 24px;
    border-radius: 9px;
    transition: all 0.2s;
    box-shadow: 0 4px 18px rgba(245,158,11,0.28);
    white-space: nowrap;
  }
  .btn-gold:hover {
    background: #fbbf24;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(245,158,11,0.40);
  }
  .btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    color: rgba(240,242,248,0.60);
    background: rgba(240,242,248,0.05);
    border: 1px solid rgba(255,255,255,0.11);
    padding: 11px 24px;
    border-radius: 9px;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-ghost:hover {
    color: #F0F2F8;
    background: rgba(255,255,255,0.10);
    border-color: rgba(255,255,255,0.22);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sp-srv-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .sp-services { padding: 32px 18px 60px; }
    .sp-srv-grid { grid-template-columns: 1fr; }
    .sp-srv-banner { flex-direction: column; align-items: flex-start; }
    .sp-srv-banner-actions { width: 100%; }
    .sp-srv-banner-actions button { flex: 1; }
  }
`;
const SERVICES = [
  { title: "Book a Parcel", desc: "Schedule a pickup and send parcels easily." },
  { title: "Track a Parcel", desc: "Track your parcel in real time using your ID." },
  { title: "Admin Dashboard", desc: "Manage orders and update shipment status." },
];

export default function ServicesPage({ setPage }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Services</h1>

      <div style={styles.list}>
        {SERVICES.map((service) => (
          <div
            key={service.title}
            style={styles.item}
            onClick={() => setPage?.(service.title.toLowerCase().includes("book") ? "book"
              : service.title.toLowerCase().includes("track") ? "track"
              : "admin"
            )}
          >
            <h3 style={styles.itemTitle}>{service.title}</h3>
            <p style={styles.itemDesc}>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    background: "#0e0e0e",
    color: "#fff",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  item: {
    background: "#1a1a1a",
    padding: "16px",
    borderRadius: "10px",
    cursor: "pointer",
    border: "1px solid #333",
  },
  itemTitle: {
    margin: 0,
    fontSize: "18px",
  },
  itemDesc: {
    margin: "6px 0 0",
    fontSize: "14px",
    color: "#aaa",
  },
};