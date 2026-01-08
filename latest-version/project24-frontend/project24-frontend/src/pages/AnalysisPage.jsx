import Layout from "../components/Layout";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { motion } from "framer-motion";
import { Activity, Clock, ShieldCheck, Server } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function StatCard({ icon, label, value, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay }}
      className="glass-panel"
      style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '140px', justifyContent: 'space-between' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ color: '#888', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        <div style={{ color: '#ff0055', opacity: 0.8 }}>{icon}</div>
      </div>
      <div>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>{value}</div>
      </div>
    </motion.div>
  );
}

export default function AnalysisPage() {
  const lineData = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [{
        label: "Time (ms)",
        data: [1, 5, 25, 120, 600, 3500],
        borderColor: "#ff0055",
        backgroundColor: "rgba(255, 0, 85, 0.1)",
        tension: 0.4,
        fill: true,
    }],
  };

  const doughnutData = {
    labels: ["MD5", "SHA-1", "SHA-256", "bcrypt"],
    datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: ["#ff0055", "#b3003b", "#80002a", "#1a1a1a"],
        borderColor: "#000",
        borderWidth: 0,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom', labels: { color: '#888' } } },
    scales: { x: { display: false }, y: { display: false } }
  };

  return (
    <Layout>
      <div className="page-container">
        
        <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>Analytics Overview</h1>
            <p style={{ color: '#888', margin: 0 }}>Real-time metrics and vulnerability assessments.</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <StatCard icon={<Activity size={20} />} label="Hashes Cracked" value="42,091" delay={0} />
          <StatCard icon={<Clock size={20} />} label="Avg Time/Hash" value="12ms" delay={0.1} />
          <StatCard icon={<ShieldCheck size={20} />} label="Success Rate" value="94.2%" delay={0.2} />
          <StatCard icon={<Server size={20} />} label="Active Nodes" value="04" delay={0.3} />
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="glass-panel" 
            style={{ padding: '24px' }}
          >
            <h3 style={{ fontSize: '14px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>Complexity / Time Analysis</h3>
            <Line data={lineData} options={options} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="glass-panel" 
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <h3 style={{ fontSize: '14px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>Algo Distribution</h3>
            <div style={{ width: '200px', height: '200px' }}>
                <Doughnut data={doughnutData} options={{...options, scales:{}}} />
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
