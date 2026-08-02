import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import SectionHeader from "../components/ui/SectionHeader";
import MetricTile from "../components/ui/MetricTile";
import EmptyState from "../components/ui/EmptyState";
import { BoltIcon, FlameIcon, PlusIcon, SettingsIcon, SparklesIcon, TargetIcon, TrophyIcon } from "../components/ui/Icons";
import { dashboardImages } from "../backgroundImages";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch("/workout-logs?page=1&per_page=5");
  const streak = user?.streak;
  const workouts = data?.items ?? [];
  const testimonials = [
    {
      quote: "The dashboard makes every workout feel intentional. I finally have a clear pulse on my momentum.",
      name: "Maya Chen",
      role: "Half-marathoner • 6 weeks"
    },
    {
      quote: "It feels premium, calm, and motivating. The streaks and recovery cues keep me coming back daily.",
      name: "Jordan Alvarez",
      role: "Strength athlete • 3 months"
    },
    {
      quote: "I love how the experience feels like a personal coach, not a spreadsheet. It inspires consistency.",
      name: "Sofia Patel",
      role: "Cyclist • 1 year"
    }
  ];

  return (
    <div className="dashboard-shell">
      <header className="dashboard-hero" aria-labelledby="dashboard-heading">
        <BackgroundRotator images={dashboardImages} />
        <div className="hero-overlay" />
        <div className="dashboard-hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">Performance OS</p>
            <h1 id="dashboard-heading">Welcome back{user ? `, ${user.username}` : ""}</h1>
            <p>Track momentum, recovery, and focus from a single calm command center.</p>
          </div>
          <div className="hero-actions">
            <a className="glass-action" href="/workout-logs">View logbook</a>
            <button className="primary-pill">+ Log workout</button>
          </div>
        </div>
      </header>

      <main className="dashboard-layout">
        <section className="dashboard-main" aria-label="Performance overview">
          <div className="metric-strip">
            <MetricTile icon={<FlameIcon />} label="Current streak" value={`${streak?.current_streak ?? 0} days`} tone="accent" />
            <MetricTile icon={<TrophyIcon />} label="Longest streak" value={`${streak?.longest_streak ?? 0} days`} />
            <MetricTile icon={<BoltIcon />} label="Consistency" value="92%" />
          </div>

          <section className="panel panel-wide" aria-labelledby="recent-sessions-title">
            <SectionHeader
              eyebrow="Training pulse"
              title="Recent sessions"
              description="A compact view of the latest progress"
              action={<a className="text-link" href="/workout-logs">View history</a>}
            />

            <div className="log-card">
              {loading && (
                <div className="loading-state" role="status" aria-live="polite">
                  <div className="spinner" />
                  <p>Analyzing your latest momentum...</p>
                </div>
              )}

              {error && <p className="error-text">⚠️ {error}</p>}

              {!loading && !error && workouts.length === 0 && (
                <EmptyState
                  title="No sessions yet"
                  description="Start your engine and build a new streak."
                />
              )}

              {!loading && !error && workouts.length > 0 && (
                <ul className="log-list">
                  {workouts.map((log) => (
                    <li key={log.id} className="list-item">
                      <div className="item-left">
                        <span className="sport-tag">{log.sport?.name?.substring(0, 2).toUpperCase() ?? "SP"}</span>
                        <div>
                          <p className="sport-name">{log.sport?.name ?? "Training"}</p>
                          <p className="item-meta">{log.log_date}</p>
                        </div>
                      </div>
                      <div className="item-right">
                        <span className="mono duration">{log.duration_minutes} min</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </section>

        <aside className="dashboard-side" aria-label="Quick actions and focus">
          <section className="panel panel-side">
            <SectionHeader eyebrow="Quick move" title="Start now" />
            <div className="action-stack">
              <button className="action-btn primary-btn"><span className="action-icon"><PlusIcon /></span>Log workout</button>
              <button className="action-btn secondary-btn"><span className="action-icon"><SparklesIcon /></span>Review insights</button>
              <button className="action-btn secondary-btn"><span className="action-icon"><TargetIcon /></span>Set goal</button>
              <button className="action-btn secondary-btn"><span className="action-icon"><SettingsIcon /></span>Adjust settings</button>
            </div>
          </section>

          <section className="panel panel-side">
            <div className="section-heading compact">
              <div>
                <p className="section-kicker">Focus</p>
                <h2>Momentum cues</h2>
              </div>
            </div>
            <ul className="focus-list">
              <li>
                <span>Recovery</span>
                <strong>36h</strong>
              </li>
              <li>
                <span>Hydration</span>
                <strong>On track</strong>
              </li>
              <li>
                <span>Sleep</span>
                <strong>7.4h</strong>
              </li>
            </ul>
          </section>
        </aside>
      </main>

      <section className="dashboard-showcase" aria-labelledby="testimonials-title">
        <div className="showcase-header">
          <div>
            <p className="section-kicker">Community</p>
            <h2 id="testimonials-title">Loved by athletes who want their progress to feel effortless</h2>
          </div>
          <a className="text-link" href="/workout-logs">See your growth</a>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p className="testimonial-quote">“{item.quote}”</p>
              <div className="testimonial-meta">
                <div className="avatar-badge" aria-hidden="true">
                  {item.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div>
                  <p className="testimonial-name">{item.name}</p>
                  <p className="testimonial-role">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="dashboard-footer">
        <div className="footer-card">
          <div className="footer-main">
            <div>
              <p className="footer-brand">Forge<span>Fit</span></p>
              <p className="footer-copy">Train with clarity. Recover with intention. Build momentum that lasts.</p>
            </div>
            <div className="footer-pill-row">
              <span className="footer-pill">Premium analytics</span>
              <span className="footer-pill">Daily momentum</span>
              <span className="footer-pill">Recovery focus</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">&copy; {new Date().getFullYear()} ForgeFit. Designed for disciplined progress.</p>
            <div className="footer-links">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
