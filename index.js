
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

const Recharts = dynamic(() => import('@/components/Chart'), { ssr: false });

export default function Home() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('affiliateData');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      fetch('/data.json')
        .then(res => res.json())
        .then(json => {
          setData(json);
          localStorage.setItem('affiliateData', JSON.stringify(json));
        });
    }
  }, []);

  const filtered = data.filter(item => {
    const d = new Date(item.Data);
    return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
  });

  const updateField = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = isNaN(value) ? value : parseFloat(value);
    setData(updated);
    localStorage.setItem('affiliateData', JSON.stringify(updated));
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Painel de Afiliados - Junho</h1>
      <div className="flex gap-4">
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="p-2 rounded" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="p-2 rounded" />
      </div>
      <table className="table-auto w-full text-sm border mt-4 bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {Object.keys(data[0] || {}).map((key, i) => (
              <th key={i} className="border px-2 py-1">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              {Object.entries(row).map(([k, v], j) => (
                <td key={j} className="border px-2 py-1">
                  <input
                    className="bg-transparent w-full"
                    value={v}
                    onChange={e => updateField(data.indexOf(row), k, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Recharts data={filtered} />
    </main>
  );
}
