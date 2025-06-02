
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Data" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Lucro Líquido" stroke="#8884d8" />
          <Line type="monotone" dataKey="Investido" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Pago" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
