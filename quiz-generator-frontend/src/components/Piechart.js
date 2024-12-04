import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);


const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart) {
    const { width, height, ctx } = chart;
    const correctCount = chart.config.data.datasets[0].data[0];
    const incorrectCount = chart.config.data.datasets[0].data[1];
    const total = correctCount + incorrectCount;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;


    ctx.save();
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    ctx.fillText(`${percentage}%`, width / 2, height / 2);
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

const PieChart = ({ correctAnswersCount, incorrectAnswersCount }) => {
  const data = {
    datasets: [
      {
        data: [correctAnswersCount, incorrectAnswersCount],
        backgroundColor: ['#4CAF50', '#FF5252'],
        hoverBackgroundColor: ['#66BB6A', '#FF1744'],
        cutout: '60%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="result-content">
      <div className="result-summary">
        <div className="chart-box">
          <Doughnut data={data} options={options} />
        </div>
        <div className="details-boxes">
          <div className="detail-box">
            <h3>Correct</h3>
            <p>{correctAnswersCount}</p>
          </div>
          <div className="detail-box">
            <h3>Incorrect</h3>
            <p>{incorrectAnswersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default PieChart;
