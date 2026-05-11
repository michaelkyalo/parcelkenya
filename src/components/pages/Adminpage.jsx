
import { useState, useEffect, useCallback } from "react";

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Mulish:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --ink:      #08090D;
  --ink2:     #0D0F15;
  --ink3:     #12151E;
  --panel:    #0F1219;
  --line:     rgba(255,255,255,0.055);
  --line2:    rgba(255,255,255,0.09);
  --line3:    rgba(255,255,255,0.14);
  --amber:    #D4A843;
  --amber2:   #F0C86A;
  --amber3:   #FBE0A0;
  --amber-bg: rgba(212,168,67,0.08);
  --amber-glow: rgba(212,168,67,0.20);
  --teal:     #3DB38A;
  --teal-bg:  rgba(61,179,138,0.08);
  --coral:    #E06060;
  --coral-bg: rgba(224,96,96,0.08);
  --sky:      #5BA4E6;
  --sky-bg:   rgba(91,164,230,0.08);
  --text:     #DDE0EC;
  --text70:   rgba(221,224,236,0.70);
  --text40:   rgba(221,224,236,0.40);
  --text20:   rgba(221,224,236,0.20);
  --text10:   rgba(221,224,236,0.10);
  --display:  'Playfair Display', Georgia, serif;
  --body:     'Mulish', sans-serif;
  --mono:     'IBM Plex Mono', monospace;
  --smooth:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.adm-root {
  font-family: var(--body);
  background: var(--ink);
  color: var(--text);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  /* Bust out of any light-background wrapper the parent app adds */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Kill any white background that the parent app shell might inject */
.adm-root *,
.adm-root *::before,
.adm-root *::after {
  box-sizing: border-box;
}
.adm-root::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Force parent wrapper (app shell content area) to match dark background */
.adm-root ~ *,
.adm-root + * { background: #08090D !important; }

/* Nav */
.adm-nav {
  position: sticky; top: 0; z-index: 100;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  background: rgba(8,9,13,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--line);
  flex-shrink: 0;
}
.adm-nav-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--display); font-size: 1.05rem; font-weight: 500;
  color: var(--text); letter-spacing: -0.2px;
}
.adm-nav-brand-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 10px var(--amber), 0 0 20px rgba(212,168,67,0.4);
  animation: dotPulse 2.5s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 8px var(--amber), 0 0 16px rgba(212,168,67,0.3); }
  50%      { box-shadow: 0 0 16px var(--amber), 0 0 32px rgba(212,168,67,0.6); }
}
.adm-nav-badge {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 2px;
  text-transform: uppercase; color: var(--coral); background: var(--coral-bg);
  border: 1px solid rgba(224,96,96,0.2); border-radius: 5px;
  padding: 2px 8px; margin-left: 4px;
}
.adm-nav-right { display: flex; align-items: center; gap: 10px; }
.adm-nav-btn {
  font-family: var(--body); font-size: 0.78rem; font-weight: 500;
  padding: 6px 16px; border-radius: 7px; cursor: pointer;
  transition: all 0.2s; border: 1px solid var(--line2);
  background: none; color: var(--text40);
}
.adm-nav-btn:hover { color: var(--text); border-color: var(--line3); }
.adm-nav-btn.primary {
  background: var(--amber); color: #000; border-color: transparent; font-weight: 600;
}
.adm-nav-btn.primary:hover { background: var(--amber2); }

/* Main Layout */
.adm-main { position: relative; z-index: 1; padding: 40px; background: var(--ink); }

/* Page header */
.adm-header { margin-bottom: 36px; }
.adm-eyebrow {
  font-family: var(--mono); font-size: 0.58rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--amber); margin-bottom: 10px;
  display: flex; align-items: center; gap: 8px;
}
.adm-eyebrow::before { content: ''; width: 20px; height: 1px; background: linear-gradient(90deg, var(--amber), transparent); }
.adm-title {
  font-family: var(--display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 400; letter-spacing: -1px; line-height: 1.1; margin-bottom: 6px;
}
.adm-title em { font-style: italic; color: var(--amber2); }
.adm-subtitle { font-size: 0.82rem; color: var(--text40); font-weight: 300; }

/* Stats Row */
.adm-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 32px;
}
.adm-stat {
  background: var(--ink3); border: 1px solid var(--line); border-radius: 14px;
  padding: 20px 22px; position: relative; overflow: hidden;
  animation: fadeUp 0.4s var(--smooth) both;
}
.adm-stat::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
}
.adm-stat.amber::before { background: linear-gradient(90deg, var(--amber), var(--amber2)); }
.adm-stat.teal::before  { background: linear-gradient(90deg, var(--teal), #6fe8be); }
.adm-stat.coral::before { background: linear-gradient(90deg, var(--coral), #f08080); }
.adm-stat.sky::before   { background: linear-gradient(90deg, var(--sky), #90c4f0); }
.adm-stat-label { font-family: var(--mono); font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase; color: var(--text20); margin-bottom: 10px; }
.adm-stat-value { font-family: var(--mono); font-size: 1.8rem; font-weight: 500; letter-spacing: -1px; color: var(--text); line-height: 1; margin-bottom: 4px; }
.adm-stat.amber .adm-stat-value { color: var(--amber2); }
.adm-stat.teal  .adm-stat-value { color: var(--teal); }
.adm-stat.coral .adm-stat-value { color: var(--coral); }
.adm-stat.sky   .adm-stat-value { color: var(--sky); }
.adm-stat-sub { font-size: 0.7rem; color: var(--text20); font-weight: 300; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Toolbar */
.adm-toolbar {
  display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  flex-wrap: wrap;
}
.adm-search-wrap {
  flex: 1; min-width: 240px; position: relative;
}
.adm-search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 0.85rem; pointer-events: none;
}
.adm-search {
  width: 100%; background: var(--ink3); border: 1px solid var(--line2);
  border-radius: 9px; padding: 10px 14px 10px 38px;
  font-family: var(--body); font-size: 0.84rem; color: var(--text);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.adm-search::placeholder { color: var(--text20); }
.adm-search:focus {
  border-color: rgba(212,168,67,0.4);
  box-shadow: 0 0 0 3px rgba(212,168,67,0.07);
}
.adm-filter-group { display: flex; gap: 6px; }
.adm-filter-btn {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 1px;
  text-transform: uppercase; padding: 8px 14px; border-radius: 7px;
  border: 1px solid var(--line2); background: var(--ink3);
  color: var(--text40); cursor: pointer; transition: all 0.2s;
}
.adm-filter-btn:hover { border-color: var(--line3); color: var(--text70); }
.adm-filter-btn.active { border-color: rgba(212,168,67,0.4); background: var(--amber-bg); color: var(--amber2); }
.adm-refresh-btn {
  font-family: var(--body); font-size: 0.78rem; font-weight: 500;
  padding: 9px 18px; border-radius: 8px; cursor: pointer;
  background: none; border: 1px solid var(--line2); color: var(--text40);
  transition: all 0.2s; display: flex; align-items: center; gap: 6px;
}
.adm-refresh-btn:hover { color: var(--text); border-color: var(--line3); }
.adm-refresh-btn.spinning span { display: inline-block; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Table */
.adm-table-wrap {
  background: var(--ink3); border: 1px solid var(--line); border-radius: 16px; overflow: hidden;
}
.adm-table-head {
  display: grid;
  grid-template-columns: 118px 170px 170px 130px 88px 90px 100px;
  padding: 14px 22px; border-bottom: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  min-width: 900px;
}
.adm-th {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 2px;
  text-transform: uppercase; color: var(--text20);
}
.adm-table-body { max-height: 600px; overflow-y: auto; overflow-x: auto; }
.adm-table-body::-webkit-scrollbar { width: 4px; }
.adm-table-body::-webkit-scrollbar-thumb { background: var(--line2); border-radius: 2px; }

.adm-row {
  display: grid;
  grid-template-columns: 118px 170px 170px 130px 88px 90px 100px;
  padding: 16px 22px; border-bottom: 1px solid var(--line);
  align-items: center; transition: background 0.2s; cursor: pointer;
  animation: fadeUp 0.35s var(--smooth) both;
  min-width: 900px;
}
.adm-row:last-child { border-bottom: none; }
.adm-row:hover { background: rgba(255,255,255,0.025); }

.adm-cell { font-size: 0.8rem; }
.adm-cell-id {
  font-family: var(--mono); font-size: 0.72rem; font-weight: 500;
  color: var(--amber2); letter-spacing: 0.5px;
}
.adm-cell-name { font-weight: 600; color: var(--text70); font-size: 0.82rem; }
.adm-cell-sub  { font-size: 0.68rem; color: var(--text20); margin-top: 2px; font-weight: 300; }
.adm-cell-route { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; color: var(--text40); }
.adm-cell-route strong { color: var(--text70); font-weight: 600; }
.adm-cell-route span { color: var(--text20); }
.adm-cell-amount {
  font-family: var(--mono); font-size: 0.78rem; font-weight: 500; color: var(--teal);
}
.adm-cell-date { font-size: 0.74rem; color: var(--text40); }

/* Status badges */
.adm-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--mono); font-size: 0.58rem; letter-spacing: 1px; text-transform: uppercase;
  border-radius: 6px; padding: 4px 9px; font-weight: 500;
}
.adm-badge.pending  { background: var(--amber-bg); color: var(--amber2); border: 1px solid rgba(212,168,67,0.2); }
.adm-badge.transit  { background: var(--sky-bg);   color: var(--sky);    border: 1px solid rgba(91,164,230,0.2); }
.adm-badge.delivered{ background: var(--teal-bg);  color: var(--teal);   border: 1px solid rgba(61,179,138,0.2); }
.adm-badge.cancelled{ background: var(--coral-bg); color: var(--coral);  border: 1px solid rgba(224,96,96,0.2); }
.adm-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

/* Status select in dropdown */
.adm-status-select {
  background: var(--ink2); border: 1px solid var(--line2); border-radius: 7px;
  font-family: var(--mono); font-size: 0.65rem; color: var(--text);
  padding: 5px 10px; outline: none; cursor: pointer;
  appearance: none; -webkit-appearance: none;
}

/* Empty state */
.adm-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 40px; text-align: center;
}
.adm-empty-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.3; }
.adm-empty-title { font-family: var(--display); font-size: 1.4rem; color: var(--text40); margin-bottom: 6px; }
.adm-empty-sub { font-size: 0.78rem; color: var(--text20); font-weight: 300; }

/* Detail drawer */
.adm-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
  animation: overlayIn 0.25s ease both;
}
@keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

.adm-drawer {
  position: fixed; top: 0; right: 0; bottom: 0; z-index: 201;
  width: 480px; background: var(--panel);
  border-left: 1px solid var(--line);
  display: flex; flex-direction: column;
  animation: drawerIn 0.3s var(--smooth) both;
  overflow-y: auto;
}
.adm-drawer::-webkit-scrollbar { width: 4px; }
.adm-drawer::-webkit-scrollbar-thumb { background: var(--line2); border-radius: 2px; }
@keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

.adm-drawer-header {
  padding: 28px 28px 20px; border-bottom: 1px solid var(--line); flex-shrink: 0;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
}
.adm-drawer-close {
  width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--line2);
  background: none; color: var(--text40); cursor: pointer; font-size: 1rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: all 0.2s;
}
.adm-drawer-close:hover { border-color: var(--line3); color: var(--text); }
.adm-drawer-id {
  font-family: var(--mono); font-size: 1rem; font-weight: 500; color: var(--amber2);
  letter-spacing: 2px; margin-bottom: 6px;
}
.adm-drawer-time { font-size: 0.72rem; color: var(--text20); font-weight: 300; }

.adm-drawer-body { padding: 24px 28px; flex: 1; }
.adm-drawer-section { margin-bottom: 28px; }
.adm-drawer-section-title {
  font-family: var(--mono); font-size: 0.55rem; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--amber); margin-bottom: 14px;
  padding-bottom: 8px; border-bottom: 1px solid var(--line);
}
.adm-drawer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.adm-drawer-field { background: var(--ink3); border: 1px solid var(--line); border-radius: 9px; padding: 12px 14px; }
.adm-drawer-field-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text20); margin-bottom: 4px; }
.adm-drawer-field-value { font-size: 0.82rem; color: var(--text70); font-weight: 500; word-break: break-word; }
.adm-drawer-field.full { grid-column: 1 / -1; }
.adm-drawer-field-value.mono { font-family: var(--mono); color: var(--amber2); }
.adm-drawer-field-value.teal { color: var(--teal); font-family: var(--mono); }

.adm-drawer-footer {
  padding: 20px 28px; border-top: 1px solid var(--line); flex-shrink: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.adm-drawer-footer-label { font-size: 0.65rem; color: var(--text20); margin-bottom: 2px; font-weight: 300; }
.adm-status-row { display: flex; gap: 8px; flex-wrap: wrap; }
.adm-status-opt {
  font-family: var(--mono); font-size: 0.6rem; letter-spacing: 1px; text-transform: uppercase;
  padding: 7px 14px; border-radius: 7px; border: 1px solid var(--line2);
  background: var(--ink3); color: var(--text40); cursor: pointer; transition: all 0.2s;
}
.adm-status-opt:hover { border-color: var(--line3); color: var(--text70); }
.adm-status-opt.pending.active   { background: var(--amber-bg); color: var(--amber2); border-color: rgba(212,168,67,0.3); }
.adm-status-opt.transit.active   { background: var(--sky-bg);   color: var(--sky);    border-color: rgba(91,164,230,0.3); }
.adm-status-opt.delivered.active { background: var(--teal-bg);  color: var(--teal);   border-color: rgba(61,179,138,0.3); }
.adm-status-opt.cancelled.active { background: var(--coral-bg); color: var(--coral);  border-color: rgba(224,96,96,0.3); }

/* Toast */
.adm-toast {
  position: fixed; bottom: 28px; right: 28px; z-index: 300;
  background: var(--ink2); border: 1px solid var(--line2);
  border-radius: 10px; padding: 12px 18px;
  font-size: 0.8rem; color: var(--text70); font-weight: 500;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  animation: toastIn 0.3s var(--spring) both;
  display: flex; align-items: center; gap: 8px;
}
@keyframes toastIn {
  from { opacity: 0; transform: translateY(12px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const SVC_MAP = {
  express:  { label: "Express",  eta: "Same day" },
  standard: { label: "Standard", eta: "1–2 days" },
  economy:  { label: "Economy",  eta: "3–5 days" },
};

function fmt(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })
       + " · " + d.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }) {
  const labels = { pending: "Pending", transit: "In Transit", delivered: "Delivered", cancelled: "Cancelled" };
  return (
    <span className={`adm-badge ${status}`}>
      <span className="adm-badge-dot" />
      {labels[status] || status}
    </span>
  );
}

// ── Load all bookings from storage ────────────────────────────────────────────
function loadAllBookings() {
  try {
    const results = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("booking:")) {
        try {
          const val = localStorage.getItem(key);
          if (val) results.push(JSON.parse(val));
        } catch {}
      }
    }
    return results.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (e) {
    console.error("Failed to load bookings:", e);
    return [];
  }
}

function updateBookingStatus(id, status) {
  try {
    const key = `booking:${id}`;
    const val = localStorage.getItem(key);
    if (!val) return false;
    const booking = JSON.parse(val);
    booking.status = status;
    localStorage.setItem(key, JSON.stringify(booking));
    return true;
  } catch (e) {
    console.error("Failed to update status:", e);
    return false;
  }
}

// ── Detail Drawer ─────────────────────────────────────────────────────────────
function DetailDrawer({ booking, onClose, onStatusChange }) {
  const { form, fee, weightCost, total, createdAt, id, status } = booking;
  const svc = SVC_MAP[form?.speed] || SVC_MAP.standard;

  const Field = ({ label, value, mono, teal, full }) => (
    <div className={`adm-drawer-field${full ? " full" : ""}`}>
      <div className="adm-drawer-field-label">{label}</div>
      <div className={`adm-drawer-field-value${mono ? " mono" : ""}${teal ? " teal" : ""}`}>{value || "—"}</div>
    </div>
  );

  return (
    <>
      <div className="adm-overlay" onClick={onClose} />
      <div className="adm-drawer">
        <div className="adm-drawer-header">
          <div>
            <div className="adm-drawer-id">{id}</div>
            <div className="adm-drawer-time">{fmt(createdAt)}</div>
            <div style={{ marginTop: 10 }}><StatusBadge status={status} /></div>
          </div>
          <button className="adm-drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="adm-drawer-body">
          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Sender</div>
            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.senderName} />
              <Field label="Phone" value={form?.senderPhone} mono />
              <Field label="County" value={form?.senderCounty} />
              <Field label="Email" value={form?.senderEmail || "—"} />
              <Field label="Pickup Address" value={form?.senderAddress} full />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Recipient</div>
            <div className="adm-drawer-grid">
              <Field label="Full Name" value={form?.recipientName} />
              <Field label="Phone" value={form?.recipientPhone} mono />
              <Field label="County" value={form?.recipientCounty} />
              <Field label="Delivery Address" value={form?.recipientAddress} full />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Parcel & Service</div>
            <div className="adm-drawer-grid">
              <Field label="Weight" value={form?.weight ? `${form.weight} kg` : "—"} />
              <Field label="Category" value={form?.parcelType} />
              <Field label="Service Tier" value={svc.label} />
              <Field label="ETA" value={svc.eta} />
              <Field label="Pickup Date" value={form?.date} />
              <Field label="Time Slot" value={form?.timeSlot} />
              <Field label="Insurance" value={form?.insurance ? "Yes — KSh 80" : "No"} />
              <Field label="Description" value={form?.description || "—"} full />
            </div>
          </div>

          <div className="adm-drawer-section">
            <div className="adm-drawer-section-title">Payment</div>
            <div className="adm-drawer-grid">
              <Field label="Method" value={form?.payment ? form.payment.charAt(0).toUpperCase() + form.payment.slice(1) : "—"} />
              {form?.mpesaPhone && <Field label="M-Pesa Number" value={form.mpesaPhone} mono />}
              <Field label="Base Fee"    value={`KSh ${(fee || 0).toLocaleString()}`} />
              <Field label="Weight Cost" value={`KSh ${(weightCost || 0).toLocaleString()}`} />
              <Field label="Total Charged" value={`KSh ${(total || 0).toLocaleString()}`} teal />
            </div>
          </div>
        </div>

        <div className="adm-drawer-footer">
          <div className="adm-drawer-footer-label">Update shipment status</div>
          <div className="adm-status-row">
            {["pending", "transit", "delivered", "cancelled"].map(s => (
              <button
                key={s}
                className={`adm-status-opt ${s}${status === s ? " active" : ""}`}
                onClick={() => onStatusChange(id, s)}
              >
                {s === "transit" ? "In Transit" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage({ setPage }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [toast, setToast]       = useState(null);

  // Dark-wash any white wrapper the parent app shell injects
  useEffect(() => {
    const el = document.querySelector(".adm-root");
    const parent = el?.parentElement;
    if (parent) {
      parent._prevBg      = parent.style.background;
      parent._prevPadding = parent.style.padding;
      parent._prevMargin  = parent.style.margin;
      parent.style.background = "#08090D";
      parent.style.padding    = "0";
      parent.style.margin     = "0";
    }
    return () => {
      if (parent) {
        parent.style.background = parent._prevBg      || "";
        parent.style.padding    = parent._prevPadding || "";
        parent.style.margin     = parent._prevMargin  || "";
      }
    };
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const refresh = useCallback((spin = false) => {
    if (spin) setSpinning(true);
    const data = loadAllBookings();
    setBookings(data);
    setLoading(false);
    if (spin) setTimeout(() => setSpinning(false), 500);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleStatusChange = (id, status) => {
    const ok = updateBookingStatus(id, status);
    if (ok) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
      showToast(`✓ Status updated to "${status === "transit" ? "In Transit" : status}"`);
    }
  };

  const filtered = bookings.filter(b => {
    const matchFilter = filter === "all" || b.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || b.id?.toLowerCase().includes(q)
      || b.form?.senderName?.toLowerCase().includes(q)
      || b.form?.recipientName?.toLowerCase().includes(q)
      || b.form?.senderCounty?.toLowerCase().includes(q)
      || b.form?.recipientCounty?.toLowerCase().includes(q)
      || b.form?.senderPhone?.includes(q);
    return matchFilter && matchSearch;
  });

  // Stats
  const totalRevenue  = bookings.reduce((s, b) => s + (b.total || 0), 0);
  const pending       = bookings.filter(b => b.status === "pending").length;
  const inTransit     = bookings.filter(b => b.status === "transit").length;
  const delivered     = bookings.filter(b => b.status === "delivered").length;

  return (
    <div className="adm-root" style={{ background: "#08090D", minHeight: "100vh", width: "100%" }}>
      <style>{CSS}</style>

      <nav className="adm-nav">
        <div className="adm-nav-brand">
          <div className="adm-nav-brand-dot" />
          SpeedPak
          <span className="adm-nav-badge">Admin</span>
        </div>
        <div className="adm-nav-right">
          <button className="adm-nav-btn" onClick={() => setPage && setPage("home")}>← Home</button>
          <button className="adm-nav-btn" onClick={() => setPage && setPage("book")}>+ New Booking</button>
        </div>
      </nav>

      <div className="adm-main">
        <div className="adm-header">
          <div className="adm-eyebrow">Control Panel</div>
          <h1 className="adm-title">Shipment <em>Dashboard</em></h1>
          <p className="adm-subtitle">All bookings submitted via the SpeedPak booking form.</p>
        </div>

        {/* Stats */}
        <div className="adm-stats">
          {[
            { label: "Total Bookings", value: bookings.length, sub: "All time", cls: "amber" },
            { label: "Revenue (KSh)",  value: `${(totalRevenue/1000).toFixed(1)}K`, sub: "Estimated total", cls: "teal" },
            { label: "Pending",        value: pending,    sub: "Awaiting pickup", cls: "coral" },
            { label: "In Transit",     value: inTransit,  sub: `${delivered} delivered`, cls: "sky" },
          ].map((s, i) => (
            <div key={s.label} className={`adm-stat ${s.cls}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="adm-stat-label">{s.label}</div>
              <div className="adm-stat-value">{loading ? "…" : s.value}</div>
              <div className="adm-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="adm-toolbar">
          <div className="adm-search-wrap">
            <span className="adm-search-icon">🔍</span>
            <input
              className="adm-search"
              placeholder="Search by ID, name, phone, county…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-group">
            {["all", "pending", "transit", "delivered", "cancelled"].map(f => (
              <button
                key={f}
                className={`adm-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "transit" ? "Transit" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <button className={`adm-refresh-btn${spinning ? " spinning" : ""}`} onClick={() => refresh(true)}>
            <span>↻</span> Refresh
          </button>
        </div>

        {/* Table */}
        <div className="adm-table-wrap" style={{ overflowX: "auto" }}>
          <div className="adm-table-head">
            <div className="adm-th">Tracking ID</div>
            <div className="adm-th">Sender</div>
            <div className="adm-th">Recipient</div>
            <div className="adm-th">Route</div>
            <div className="adm-th">Service</div>
            <div className="adm-th">Amount</div>
            <div className="adm-th">Status</div>
          </div>
          <div className="adm-table-body">
            {loading ? (
              <div className="adm-empty">
                <div className="adm-empty-icon">⏳</div>
                <div className="adm-empty-title">Loading bookings…</div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="adm-empty">
                <div className="adm-empty-icon">📭</div>
                <div className="adm-empty-title">No bookings found</div>
                <div className="adm-empty-sub">
                  {bookings.length === 0
                    ? "Bookings submitted via the booking form will appear here."
                    : "Try adjusting your search or filter."}
                </div>
              </div>
            ) : (
              filtered.map((b, i) => {
                const svc = SVC_MAP[b.form?.speed] || SVC_MAP.standard;
                return (
                  <div
                    key={b.id}
                    className="adm-row"
                    style={{ animationDelay: `${Math.min(i, 12) * 0.03}s` }}
                    onClick={() => setSelected(b)}
                  >
                    <div className="adm-cell adm-cell-id">{b.id}</div>
                    {/* Sender */}
                    <div className="adm-cell">
                      <div className="adm-cell-name">{b.form?.senderName || "—"}</div>
                      <div className="adm-cell-sub">{b.form?.senderPhone || ""}</div>
                      <div className="adm-cell-sub" style={{ color: "var(--amber)", opacity: 0.8 }}>{b.form?.senderCounty || ""}</div>
                    </div>
                    {/* Recipient */}
                    <div className="adm-cell">
                      <div className="adm-cell-name">{b.form?.recipientName || "—"}</div>
                      <div className="adm-cell-sub">{b.form?.recipientPhone || ""}</div>
                      <div className="adm-cell-sub" style={{ color: "var(--teal)", opacity: 0.85 }}>{b.form?.recipientCounty || ""}</div>
                    </div>
                    {/* Route */}
                    <div className="adm-cell adm-cell-route">
                      <strong>{b.form?.senderCounty || "—"}</strong>
                      <span>→</span>
                      <strong>{b.form?.recipientCounty || "—"}</strong>
                    </div>
                    {/* Service */}
                    <div className="adm-cell">
                      <div style={{ fontSize: "0.78rem", color: "var(--text70)", fontWeight: 600 }}>{svc.label}</div>
                      <div className="adm-cell-sub">{svc.eta}</div>
                    </div>
                    <div className="adm-cell adm-cell-amount">KSh {(b.total || 0).toLocaleString()}</div>
                    <div className="adm-cell"><StatusBadge status={b.status || "pending"} /></div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {filtered.length > 0 && (
          <div style={{ marginTop: 14, fontSize: "0.72rem", color: "var(--text20)", textAlign: "right" }}>
            Showing {filtered.length} of {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selected && (
        <DetailDrawer
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Toast */}
      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}