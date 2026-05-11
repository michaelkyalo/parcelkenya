import React, { useState, useEffect, useCallback } from "react";

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&family=Mulish:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root{
  --ink:#08090D;
  --ink2:#0D0F15;
  --ink3:#12151E;
  --panel:#0F1219;
  --line:rgba(255,255,255,.055);
  --line2:rgba(255,255,255,.09);
  --line3:rgba(255,255,255,.14);

  --amber:#D4A843;
  --amber2:#F0C86A;
  --amber-bg:rgba(212,168,67,.08);

  --teal:#3DB38A;
  --teal-bg:rgba(61,179,138,.08);

  --coral:#E06060;
  --coral-bg:rgba(224,96,96,.08);

  --sky:#5BA4E6;
  --sky-bg:rgba(91,164,230,.08);

  --text:#DDE0EC;
  --text70:rgba(221,224,236,.7);
  --text40:rgba(221,224,236,.4);
  --text20:rgba(221,224,236,.2);

  --display:'Playfair Display',serif;
  --body:'Mulish',sans-serif;
  --mono:'IBM Plex Mono',monospace;
}

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  background:#08090D;
}

.adm-root{
  min-height:100vh;
  width:100%;
  background:var(--ink);
  color:var(--text);
  font-family:var(--body);
}

/* NAV */

.adm-nav{
  position:sticky;
  top:0;
  z-index:100;
  height:60px;
  padding:0 40px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:rgba(8,9,13,.95);
  backdrop-filter:blur(16px);
  border-bottom:1px solid var(--line);
}

.adm-nav-brand{
  display:flex;
  align-items:center;
  gap:10px;
  font-family:var(--display);
  font-size:1rem;
}

.adm-nav-brand-dot{
  width:8px;
  height:8px;
  border-radius:50%;
  background:var(--amber);
}

.adm-nav-badge{
  padding:3px 8px;
  border-radius:6px;
  font-size:.55rem;
  letter-spacing:1px;
  text-transform:uppercase;
  background:var(--coral-bg);
  color:var(--coral);
  border:1px solid rgba(224,96,96,.2);
  font-family:var(--mono);
}

.adm-nav-right{
  display:flex;
  gap:10px;
}

.adm-nav-btn{
  border:none;
  outline:none;
  cursor:pointer;
  padding:8px 14px;
  border-radius:8px;
  background:var(--ink3);
  border:1px solid var(--line2);
  color:var(--text70);
  font-size:.78rem;
}

.adm-nav-btn:hover{
  border-color:var(--line3);
  color:var(--text);
}

/* MAIN */

.adm-main{
  padding:40px;
}

.adm-header{
  margin-bottom:32px;
}

.adm-eyebrow{
  font-size:.6rem;
  letter-spacing:3px;
  color:var(--amber);
  text-transform:uppercase;
  margin-bottom:10px;
  font-family:var(--mono);
}

.adm-title{
  font-family:var(--display);
  font-size:clamp(2rem,4vw,3rem);
  font-weight:400;
}

.adm-title em{
  color:var(--amber2);
}

.adm-subtitle{
  margin-top:10px;
  color:var(--text40);
  font-size:.82rem;
}

/* STATS */

.adm-stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:14px;
  margin-bottom:30px;
}

.adm-stat{
  background:var(--ink3);
  border:1px solid var(--line);
  border-radius:14px;
  padding:22px;
}

.adm-stat-label{
  font-size:.55rem;
  text-transform:uppercase;
  letter-spacing:2px;
  color:var(--text20);
  margin-bottom:12px;
  font-family:var(--mono);
}

.adm-stat-value{
  font-size:1.8rem;
  font-family:var(--mono);
  margin-bottom:6px;
}

.adm-stat-sub{
  font-size:.7rem;
  color:var(--text20);
}

.amber .adm-stat-value{ color:var(--amber2); }
.teal .adm-stat-value{ color:var(--teal); }
.coral .adm-stat-value{ color:var(--coral); }
.sky .adm-stat-value{ color:var(--sky); }

/* TOOLBAR */

.adm-toolbar{
  display:flex;
  gap:12px;
  margin-bottom:20px;
  flex-wrap:wrap;
}

.adm-search-wrap{
  flex:1;
  position:relative;
  min-width:240px;
}

.adm-search-icon{
  position:absolute;
  left:14px;
  top:50%;
  transform:translateY(-50%);
}

.adm-search{
  width:100%;
  height:42px;
  padding:0 14px 0 38px;
  border-radius:10px;
  border:1px solid var(--line2);
  background:var(--ink3);
  color:var(--text);
  outline:none;
}

.adm-filter-group{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.adm-filter-btn,
.adm-refresh-btn{
  height:42px;
  padding:0 14px;
  border-radius:10px;
  border:1px solid var(--line2);
  background:var(--ink3);
  color:var(--text70);
  cursor:pointer;
  font-size:.75rem;
}

.adm-filter-btn.active{
  background:var(--amber-bg);
  border-color:rgba(212,168,67,.35);
  color:var(--amber2);
}

/* TABLE */

.adm-table-wrap{
  overflow-x:auto;
  border-radius:16px;
  border:1px solid var(--line);
  background:var(--ink3);
}

.adm-table-head,
.adm-row{
  min-width:900px;
  display:grid;
  grid-template-columns:
    120px
    180px
    180px
    140px
    100px
    100px
    120px;
  gap:10px;
  align-items:center;
}

.adm-table-head{
  padding:16px 22px;
  border-bottom:1px solid var(--line);
}

.adm-th{
  font-size:.55rem;
  text-transform:uppercase;
  letter-spacing:2px;
  color:var(--text20);
  font-family:var(--mono);
}

.adm-row{
  padding:18px 22px;
  border-bottom:1px solid var(--line);
  cursor:pointer;
}

.adm-row:hover{
  background:rgba(255,255,255,.02);
}

.adm-cell-id{
  color:var(--amber2);
  font-family:var(--mono);
}

.adm-cell-name{
  font-size:.82rem;
  font-weight:600;
}

.adm-cell-sub{
  font-size:.68rem;
  color:var(--text20);
  margin-top:4px;
}

.adm-cell-route{
  display:flex;
  align-items:center;
  gap:6px;
  font-size:.75rem;
}

.adm-cell-route strong{
  color:var(--text70);
}

.adm-cell-amount{
  color:var(--teal);
  font-family:var(--mono);
}

/* BADGE */

.adm-badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:5px 10px;
  border-radius:8px;
  font-size:.58rem;
  letter-spacing:1px;
  text-transform:uppercase;
  font-family:var(--mono);
}

.adm-badge-dot{
  width:5px;
  height:5px;
  border-radius:50%;
  background:currentColor;
}

.pending{
  background:var(--amber-bg);
  color:var(--amber2);
}

.transit{
  background:var(--sky-bg);
  color:var(--sky);
}

.delivered{
  background:var(--teal-bg);
  color:var(--teal);
}

.cancelled{
  background:var(--coral-bg);
  color:var(--coral);
}

/* EMPTY */

.adm-empty{
  padding:80px 20px;
  text-align:center;
}

.adm-empty-title{
  margin-top:12px;
  font-size:1.2rem;
}

.adm-empty-sub{
  margin-top:6px;
  color:var(--text20);
}

/* MOBILE */

@media(max-width:1100px){
  .adm-stats{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:768px){

  .adm-nav{
    padding:12px 16px;
    height:auto;
    flex-wrap:wrap;
    gap:10px;
  }

  .adm-nav-right{
    width:100%;
    justify-content:flex-end;
  }

  .adm-main{
    padding:20px 16px;
  }

  .adm-stats{
    grid-template-columns:1fr;
  }

  .adm-toolbar{
    flex-direction:column;
  }

  .adm-refresh-btn{
    width:100%;
  }

  .adm-filter-group{
    width:100%;
  }

  .adm-filter-btn{
    flex:1;
  }

  .adm-table-head,
  .adm-row{
    min-width:760px;
  }
}
`;

// ── HELPERS ──────────────────────────────────────────────────────────────────

const SVC_MAP = {
  express: {
    label: "Express",
    eta: "Same day",
  },

  standard: {
    label: "Standard",
    eta: "1–2 days",
  },

  economy: {
    label: "Economy",
    eta: "3–5 days",
  },
};

function StatusBadge({ status }) {
  const labels = {
    pending: "Pending",
    transit: "Transit",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span className={`adm-badge ${status}`}>
      <span className="adm-badge-dot" />
      {labels[status]}
    </span>
  );
}

function loadAllBookings() {
  try {
    const results = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith("booking:")) {
        const value = localStorage.getItem(key);

        if (value) {
          results.push(JSON.parse(value));
        }
      }
    }

    return results.sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  } catch (err) {
    console.error(err);
    return [];
  }
}

function updateBookingStatus(id, status) {
  try {
    const key = `booking:${id}`;

    const raw = localStorage.getItem(key);

    if (!raw) return false;

    const booking = JSON.parse(raw);

    booking.status = status;

    localStorage.setItem(key, JSON.stringify(booking));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

export default function AdminPage({ setPage }) {

  const [bookings, setBookings] = useState(() => []);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const refresh = useCallback(() => {
    const data = loadAllBookings();

    setBookings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = bookings.filter((b) => {

    const matchFilter =
      filter === "all" || b.status === filter;

    const q = search.toLowerCase();

    const matchSearch =
      !q ||
      b.id?.toLowerCase().includes(q) ||
      b.form?.senderName?.toLowerCase().includes(q) ||
      b.form?.recipientName?.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.total || 0),
    0
  );

  const pending =
    bookings.filter((b) => b.status === "pending").length;

  const transit =
    bookings.filter((b) => b.status === "transit").length;

  const delivered =
    bookings.filter((b) => b.status === "delivered").length;

  return (
    <div className="adm-root">

      <style>{CSS}</style>

      {/* NAV */}

      <nav className="adm-nav">

        <div className="adm-nav-brand">
          <div className="adm-nav-brand-dot" />
          SpeedPak
          <span className="adm-nav-badge">
            Admin
          </span>
        </div>

        <div className="adm-nav-right">

          <button
            className="adm-nav-btn"
            onClick={() => setPage?.("home")}
          >
            ← Home
          </button>

          <button
            className="adm-nav-btn"
            onClick={() => setPage?.("book")}
          >
            + New Booking
          </button>

        </div>

      </nav>

      {/* MAIN */}

      <div className="adm-main">

        <div className="adm-header">

          <div className="adm-eyebrow">
            Control Panel
          </div>

          <h1 className="adm-title">
            Shipment <em>Dashboard</em>
          </h1>

          <p className="adm-subtitle">
            Manage all parcel bookings here.
          </p>

        </div>

        {/* STATS */}

        <div className="adm-stats">

          <div className="adm-stat amber">
            <div className="adm-stat-label">
              Total Bookings
            </div>

            <div className="adm-stat-value">
              {bookings.length}
            </div>

            <div className="adm-stat-sub">
              All time
            </div>
          </div>

          <div className="adm-stat teal">
            <div className="adm-stat-label">
              Revenue
            </div>

            <div className="adm-stat-value">
              {(totalRevenue / 1000).toFixed(1)}K
            </div>

            <div className="adm-stat-sub">
              Estimated
            </div>
          </div>

          <div className="adm-stat coral">
            <div className="adm-stat-label">
              Pending
            </div>

            <div className="adm-stat-value">
              {pending}
            </div>

            <div className="adm-stat-sub">
              Awaiting pickup
            </div>
          </div>

          <div className="adm-stat sky">
            <div className="adm-stat-label">
              Delivered
            </div>

            <div className="adm-stat-value">
              {delivered}
            </div>

            <div className="adm-stat-sub">
              Completed
            </div>
          </div>

        </div>

        {/* TOOLBAR */}

        <div className="adm-toolbar">

          <div className="adm-search-wrap">

            <span className="adm-search-icon">
              🔍
            </span>

            <input
              className="adm-search"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="adm-filter-group">

            {["all", "pending", "transit", "delivered", "cancelled"]
              .map((f) => (
                <button
                  key={f}
                  className={`adm-filter-btn ${
                    filter === f ? "active" : ""
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}

          </div>

          <button
            className="adm-refresh-btn"
            onClick={refresh}
          >
            ↻ Refresh
          </button>

        </div>

        {/* TABLE */}

        <div className="adm-table-wrap">

          <div className="adm-table-head">

            <div className="adm-th">ID</div>
            <div className="adm-th">Sender</div>
            <div className="adm-th">Recipient</div>
            <div className="adm-th">Route</div>
            <div className="adm-th">Service</div>
            <div className="adm-th">Amount</div>
            <div className="adm-th">Status</div>

          </div>

          {loading ? (

            <div className="adm-empty">
              Loading...
            </div>

          ) : filtered.length === 0 ? (

            <div className="adm-empty">

              <div className="adm-empty-title">
                No bookings found
              </div>

              <div className="adm-empty-sub">
                Bookings will appear here.
              </div>

            </div>

          ) : (

            filtered.map((b) => {

              const svc =
                SVC_MAP[b.form?.speed] ||
                SVC_MAP.standard;

              return (

                <div
                  key={b.id}
                  className="adm-row"
                >

                  <div className="adm-cell adm-cell-id">
                    {b.id}
                  </div>

                  <div className="adm-cell">
                    <div className="adm-cell-name">
                      {b.form?.senderName}
                    </div>

                    <div className="adm-cell-sub">
                      {b.form?.senderPhone}
                    </div>
                  </div>

                  <div className="adm-cell">
                    <div className="adm-cell-name">
                      {b.form?.recipientName}
                    </div>

                    <div className="adm-cell-sub">
                      {b.form?.recipientPhone}
                    </div>
                  </div>

                  <div className="adm-cell adm-cell-route">
                    <strong>
                      {b.form?.senderCounty}
                    </strong>

                    →

                    <strong>
                      {b.form?.recipientCounty}
                    </strong>
                  </div>

                  <div className="adm-cell">
                    {svc.label}
                  </div>

                  <div className="adm-cell adm-cell-amount">
                    KSh {(b.total || 0).toLocaleString()}
                  </div>

                  <div className="adm-cell">
                    <StatusBadge
                      status={b.status || "pending"}
                    />
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

    </div>
  );
}