//// admin panelindeki home componentinin içindeki order status chart kısmı
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../card/Card';
import styles from "./Chart.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {

  const placed = 1
  const processing = 2
  const shipped = 3
  const delivered = 4

 const data = {
    labels: ["Placed Orders","Processing","Shipped","Delivered"],
    datasets: [
      {
        label: 'Order count',
        data: [placed,processing,shipped,delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <div className={styles.charts}>
     <Card cardClass={styles.card}>
      <h3>Order Status Chart</h3>
      <Bar options={options} data={data} />;
     </Card>
    </div>
  )
}

export default Chart