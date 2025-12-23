
export default function Stats() {
  const total = localStorage.getItem("total") || 0;
  return (
    <div className="card glass">
      <h3>System Status</h3>
      <p>Total Documents: {total}</p>
      <p>Blockchain: Connected</p>
    </div>
  );
}
