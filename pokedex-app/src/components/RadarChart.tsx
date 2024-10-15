import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  stats: number[];
}

const RadarChart: React.FC<RadarChartProps> = ({ stats }) => {
  const data = {
    labels: [
      `HP: ${stats[0]}`,
      `Attack: ${stats[1]}`,
      `Defense: ${stats[2]}`,
      `Sp. Attack: ${stats[3]}`,
      `Sp. Defense: ${stats[4]}`,
      `Speed: ${stats[5]}`,
    ],
    datasets: [
      {
        label: "Base Stats",
        data: stats,
        backgroundColor: "rgba(10, 10, 10, 0.8)",
        borderColor: "rgba(0,0,0)",
        borderWidth: 4,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 150,
        ticks: {
          display: false,
        },
        pointLabels: {
          font: {
            size: 18,
          },
          color: "#000",
        },
      },
    },
  };

  return <Radar data={data} options={options} height={400} width={400} />;
};

export default RadarChart;
