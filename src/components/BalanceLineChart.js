import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import './BalanceLineChart.css';

export default function BalanceLineChart({ computed }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const { balanceSeries } = computed;

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: balanceSeries.labels,
        datasets: [
          {
            label: 'Remaining Balance',
            data: balanceSeries.data,
            borderColor: '#1a3a5c',
            backgroundColor: 'rgba(26,58,92,0.08)',
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#1a3a5c',
            pointBorderColor: '#fff',
            pointBorderWidth: 1.5,
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
              label: (ctx) =>
                ' $' + Math.round(ctx.raw).toLocaleString('en-US'),
            },
          },
        },
        scales: {
          y: {
            ticks: {
              font: { size: 11, family: 'DM Mono' },
              callback: (v) => '$' + (v / 1000).toFixed(0) + 'k',
              maxTicksLimit: 5,
            },
            grid: { color: 'rgba(0,40,80,0.06)' },
            border: { display: false },
          },
          x: {
            ticks: { font: { size: 11 }, maxRotation: 30 },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [balanceSeries]);

  return (
    <div className="panel line-panel">
      <div className="section-label">Remaining Balance Over Time</div>
      <div className="line-wrap">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Line chart showing how the remaining loan balance decreases over time"
        >
          Remaining loan balance decreases from start to end of loan term.
        </canvas>
      </div>
    </div>
  );
}
