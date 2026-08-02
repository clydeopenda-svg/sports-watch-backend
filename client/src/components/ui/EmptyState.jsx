import "./ui.css";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="ui-empty-state">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
