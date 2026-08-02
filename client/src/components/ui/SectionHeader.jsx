import "./ui.css";

export default function SectionHeader({ eyebrow, title, description, action, className }) {
  return (
    <div className={["ui-section-header", className].filter(Boolean).join(" ")}>
      <div>
        {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
        {title ? <h2 className="ui-section-title">{title}</h2> : null}
        {description ? <p className="ui-section-description">{description}</p> : null}
      </div>
      {action ? <div className="ui-section-action">{action}</div> : null}
    </div>
  );
}
