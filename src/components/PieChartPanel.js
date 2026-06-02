import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import './PieChartPanel.css';

const fmtUSD = (n) => '$' + Math.round(n).toLocaleString('en-US');

export default function PieChartPanel({ loanData, computed }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const { loanAmount } = loanData;
  const { totalAmountPaid, totalInterestGenerated } = computed;

  const principalPct = ((loanAmount / totalAmountPaid) * 100).toFixed(1);
  const interestPct = ((totalInterestGenerated / totalAmountPaid) * 100).toFixed(1);

  // Re-render chart when data changes (setState-driven update)
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Total Interest'],
        datasets: [
          {
            data: [loanAmount, totalInterestGenerated],
            backgroundColor: ['#0f2744', '#4a90c4'],
            hoverBackgroundColor: ['#1a3a5c', '#2d6ca4'],
            borderWidth: 3,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${fmtUSD(ctx.raw)}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [loanAmount, totalInterestGenerated]);

  return (
    <div className="panel pie-panel">
      <div className="section-label">Principal vs Interest Breakdown</div>

      <div className="pie-wrap">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Pie chart: Principal ${principalPct}%, Interest ${interestPct}%`}
        >
          Principal {fmtUSD(loanAmount)} ({principalPct}%), Interest {fmtUSD(totalInterestGenerated)} ({interestPct}%)
        </canvas>
      </div>

      {/* Custom legend */}
      <div className="pie-legend">
        <div className="pie-legend__item">
          <span className="pie-legend__dot" style={{ background: '#0f2744' }} />
          <span className="pie-legend__label">Principal</span>
          <span className="pie-legend__val">{fmtUSD(loanAmount)} ({principalPct}%)</span>
        </div>
        <div className="pie-legend__item">
          <span className="pie-legend__dot" style={{ background: '#4a90c4' }} />
          <span className="pie-legend__label">Total Interest</span>
          <span className="pie-legend__val">{fmtUSD(totalInterestGenerated)} ({interestPct}%)</span>
        </div>
      </div>
    </div>
  );
}
