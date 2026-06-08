import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

*{ box-sizing:border-box; margin:0; padding:0; }

.srv-root{
  font-family:'DM Sans', system-ui, sans-serif;
  background:#09090B;
  color:#E8EAF2;
  min-height:100vh;
  padding:64px 48px 96px;
}

/* ── HEADER ── */
.srv-header{
  max-width:640px;
  margin-bottom:72px;
}

.srv-eyebrow{
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-family:'JetBrains Mono', monospace;
  font-size:.6rem;
  letter-spacing:3px;
  text-transform:uppercase;
  color:#D4A843;
  margin-bottom:18px;
}

.srv-eyebrow-line{
  width:24px;
  height:1px;
  background:#D4A843;
  opacity:.7;
}

.srv-title{
  font-family:'Syne', sans-serif;
  font-size:clamp(2.2rem,4.5vw,3.6rem);
  font-weight:800;
  letter-spacing:-2px;
  line-height:1.02;
  color:#F0F2F8;
  margin-bottom:16px;
}

.srv-title em{
  font-style:italic;
  color:#D4A843;
}

.srv-subtitle{
  font-size:.92rem;
  font-weight:300;
  color:rgba(232,234,242,0.42);
  line-height:1.85;
  max-width:480px;
}

/* ── SERVICES LIST ── */
.srv-list{
  display:flex;
  flex-direction:column;
  gap:2px;
  margin-bottom:72px;
  border:1px solid rgba(255,255,255,0.06);
  border-radius:20px;
  overflow:hidden;
}

.srv-item{
  display:flex;
  align-items:center;
  gap:28px;
  padding:28px 32px;
  background:#111318;
  cursor:pointer;
  transition:background .2s, padding .2s;
  border-bottom:1px solid rgba(255,255,255,0.05);
  position:relative;
  overflow:hidden;
}

.srv-item:last-child{
  border-bottom:none;
}

.srv-item::before{
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:#D4A843;
  transform:scaleY(0);
  transform-origin:center;
  transition:transform .2s cubic-bezier(.22,1,.36,1);
}

.srv-item:hover{
  background:#161a24;
  padding-left:38px;
}

.srv-item:hover::before{
  transform:scaleY(1);
}

.srv-item:hover .srv-item-arrow{
  transform:translateX(5px);
  opacity:1;
  color:#D4A843;
}

.srv-item:hover .srv-item-number{
  color:#D4A843;
}

.srv-item-number{
  font-family:'JetBrains Mono', monospace;
  font-size:.7rem;
  color:rgba(232,234,242,0.18);
  width:24px;
  flex-shrink:0;
  transition:color .2s;
  padding-top:2px;
}

.srv-item-icon-wrap{
  width:52px;
  height:52px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
  font-size:1.45rem;
  border:1px solid rgba(255,255,255,0.07);
  transition:border-color .2s, background .2s;
}

.srv-item:hover .srv-item-icon-wrap{
  border-color:rgba(212,168,67,0.25);
  background:rgba(212,168,67,0.06);
}

.srv-item-body{
  flex:1;
}

.srv-item-title{
  font-family:'Syne', sans-serif;
  font-size:1.05rem;
  font-weight:700;
  letter-spacing:-.3px;
  color:#F0F2F8;
  margin-bottom:5px;
}

.srv-item-desc{
  font-size:.82rem;
  font-weight:300;
  color:rgba(232,234,242,0.38);
  line-height:1.7;
}

.srv-item-meta{
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  gap:8px;
  flex-shrink:0;
}

.srv-item-tag{
  font-family:'JetBrains Mono', monospace;
  font-size:.56rem;
  letter-spacing:1.5px;
  text-transform:uppercase;
  padding:4px 10px;
  border-radius:999px;
  border:1px solid rgba(255,255,255,0.08);
  color:rgba(232,234,242,0.32);
}

.srv-item-tag.gold{
  color:#D4A843;
  border-color:rgba(212,168,67,0.28);
  background:rgba(212,168,67,0.07);
}

.srv-item-arrow{
  font-size:1.1rem;
  color:rgba(232,234,242,0.18);
  opacity:.5;
  transition:transform .2s, opacity .2s, color .2s;
}

/* ── BOTTOM CTA ── */
.srv-cta{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  padding:32px 36px;
  background:#111318;
  border:1px solid rgba(255,255,255,0.07);
  border-radius:18px;
  flex-wrap:wrap;
}

.srv-cta-left{}

.srv-cta-title{
  font-family:'Syne', sans-serif;
  font-size:1.05rem;
  font-weight:800;
  letter-spacing:-.3px;
  color:#F0F2F8;
  margin-bottom:5px;
}

.srv-cta-sub{
  font-size:.82rem;
  color:rgba(232,234,242,0.38);
  font-weight:300;
}

.srv-cta-btns{
  display:flex;
  gap:10px;
  flex-shrink:0;
  flex-wrap:wrap;
}

.btn-primary{
  font-family:'DM Sans', sans-serif;
  font-size:.85rem;
  font-weight:700;
  cursor:pointer;
  color:#000;
  background:#D4A843;
  border:none;
  padding:12px 26px;
  border-radius:10px;
  transition:background .2s, transform .15s;
  white-space:nowrap;
  letter-spacing:.2px;
}

.btn-primary:hover{
  background:#E8C060;
  transform:translateY(-1px);
}

.btn-secondary{
  font-family:'DM Sans', sans-serif;
  font-size:.85rem;
  font-weight:500;
  cursor:pointer;
  color:rgba(232,234,242,0.55);
  background:rgba(232,234,242,0.04);
  border:1px solid rgba(255,255,255,0.1);
  padding:12px 26px;
  border-radius:10px;
  transition:.2s;
  white-space:nowrap;
}

.btn-secondary:hover{
  color:#F0F2F8;
  background:rgba(255,255,255,0.08);
  border-color:rgba(255,255,255,0.18);
}

/* ── RESPONSIVE ── */
@media(max-width:700px){
  .srv-root{ padding:36px 20px 60px; }
  .srv-item{ padding:22px 20px; gap:16px; }
  .srv-item:hover{ padding-left:26px; }
  .srv-item-meta{ display:none; }
  .srv-cta{ flex-direction:column; align-items:flex-start; }
  .srv-cta-btns{ width:100%; }
  .srv-cta-btns button{ flex:1; }
}
`;

const SERVICES = [
  {
    number: "01",
    icon: "📦",
    title: "Book a Parcel",
    desc: "Schedule a pickup at your door. Choose your service tier, time slot, and pay via M-Pesa or cash on delivery.",
    tag: "Popular",
    tagGold: true,
    page: "book",
  },
  {
    number: "02",
    icon: "🔍",
    title: "Track a Parcel",
    desc: "Get real-time updates on your shipment using your booking ID. Know exactly where your parcel is at all times.",
    tag: "Live",
    tagGold: false,
    page: "track",
  },
  {
    number: "03",
    icon: "🛡️",
    title: "Admin Dashboard",
    desc: "Manage all shipments, update order statuses, and monitor revenue from a unified operations console.",
    tag: "Admin",
    tagGold: false,
    page: "admin",
  },
];

export default function ServicesPage({ setPage }) {
  return (
    <div className="srv-root">
      <style>{CSS}</style>

      <div className="srv-header">
        <div className="srv-eyebrow">
          <span className="srv-eyebrow-line" />
          What we offer
        </div>
        <h1 className="srv-title">
          Everything you need<br />to ship <em>with confidence</em>
        </h1>
        <p className="srv-subtitle">
          From booking to delivery, SpeedPak covers every step of your parcel's journey across Kenya — fast, trackable, and reliable.
        </p>
      </div>

      <div className="srv-list">
        {SERVICES.map((s) => (
          <div
            key={s.number}
            className="srv-item"
            onClick={() => setPage?.(s.page)}
          >
            <div className="srv-item-number">{s.number}</div>

            <div className="srv-item-icon-wrap">{s.icon}</div>

            <div className="srv-item-body">
              <div className="srv-item-title">{s.title}</div>
              <div className="srv-item-desc">{s.desc}</div>
            </div>

            <div className="srv-item-meta">
              <span className={`srv-item-tag${s.tagGold ? " gold" : ""}`}>{s.tag}</span>
            </div>

            <div className="srv-item-arrow">→</div>
          </div>
        ))}
      </div>

      <div className="srv-cta">
        <div className="srv-cta-left">
          <div className="srv-cta-title">Ready to send your first parcel?</div>
          <div className="srv-cta-sub">Book a pickup in under 2 minutes. No account required.</div>
        </div>
        <div className="srv-cta-btns">
          <button className="btn-primary" onClick={() => setPage?.("book")}>
            Book a Parcel →
          </button>
          <button className="btn-secondary" onClick={() => setPage?.("track")}>
            Track Shipment
          </button>
        </div>
      </div>
    </div>
  );
}
