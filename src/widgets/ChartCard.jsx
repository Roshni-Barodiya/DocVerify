
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", docs: 2 },
  { name: "Tue", docs: 5 },
  { name: "Wed", docs: 8 },
  { name: "Thu", docs: 6 },
  { name: "Fri", docs: 10 },
];

export default function ChartCard() {
  return (
    <div className="card glass">
      <h3>Verification Activity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="docs" stroke="#14F1B4" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
