import "./ui.css";

export default function MetricTile({ icon, label, value, tone = "default" }) {
  return (
    <article className={["ui-metric-tile", tone === "accent" ? "accent" : ""].filter(Boolean).join(" ")}>
      <div className="ui-metric-icon">{icon}</div>
      <div className="ui-metric-copy">
        <p className="ui-metric-label">{label}</p>
        <p className="ui-metric-value">{value}</p>
      </div>
    </article>
  );
}
