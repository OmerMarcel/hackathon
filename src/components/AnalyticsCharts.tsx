import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

type PatientStatus = 'stable' | 'critical' | 'monitoring';

type Patient = {
  status: PatientStatus;
  dateNaissance: string;
  // ... autres propriétés du patient
};

type StatusCounts = {
  [K in PatientStatus]: number;
};

type AnalyticsChartsProps = {
  patients: Patient[];
};

export default function AnalyticsCharts({ patients }: AnalyticsChartsProps) {
  const [stats, setStats] = useState({
    statusDistribution: {
      stable: 0,
      critical: 0,
      monitoring: 0,
    } as StatusCounts,
    monthlyPatients: Array(12).fill(0),
    ageDistribution: {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61+': 0,
    },
  });

  useEffect(() => {
    const calculateStats = () => {
      const statusCounts: StatusCounts = {
        stable: 0,
        critical: 0,
        monitoring: 0,
      };
      const monthlyCounts = Array(12).fill(0);
      const ageGroups = {
        '0-20': 0,
        '21-40': 0,
        '41-60': 0,
        '61+': 0,
      };

      patients.forEach(patient => {
        // Distribution des statuts
        statusCounts[patient.status]++;

        // Patients par mois
        const month = new Date(patient.dateNaissance).getMonth();
        monthlyCounts[month]++;

        // Distribution par âge
        const age = new Date().getFullYear() - new Date(patient.dateNaissance).getFullYear();
        if (age <= 20) ageGroups['0-20']++;
        else if (age <= 40) ageGroups['21-40']++;
        else if (age <= 60) ageGroups['41-60']++;
        else ageGroups['61+']++;
      });

      setStats({
        statusDistribution: statusCounts,
        monthlyPatients: monthlyCounts,
        ageDistribution: ageGroups,
      });
    };

    calculateStats();
  }, [patients]);

  const statusData = {
    labels: ['Stable', 'Critique', 'À surveiller'],
    datasets: [
      {
        label: 'Distribution des statuts',
        data: [
          stats.statusDistribution.stable,
          stats.statusDistribution.critical,
          stats.statusDistribution.monitoring,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  const monthlyData = {
    labels: [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
      'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ],
    datasets: [
      {
        label: 'Patients par mois',
        data: stats.monthlyPatients,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const ageData = {
    labels: ['0-20 ans', '21-40 ans', '41-60 ans', '61+ ans'],
    datasets: [
      {
        label: 'Distribution par âge',
        data: [
          stats.ageDistribution['0-20'],
          stats.ageDistribution['21-40'],
          stats.ageDistribution['41-60'],
          stats.ageDistribution['61+'],
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Distribution des statuts</h3>
        <Pie data={statusData} options={options} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Patients par mois</h3>
        <Line data={monthlyData} options={options} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Distribution par âge</h3>
        <Bar data={ageData} options={options} />
      </div>
    </div>
  );
} 