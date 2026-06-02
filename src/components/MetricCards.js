import React from 'react';
import './MetricCards.css';

const fmtUSD = (n) =>
  '$' + Math.round(n).toLocaleString('en-US');

const fmtUSDPrecise = (n) =>
  '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function MetricCards({ loanData, computed }) {
  const { loanAmount } = loanData;
  const { monthlyPayment, totalAmountPaid, totalInterestGenerated, totalLoanMonths } = computed;

  const effRate = ((totalInterestGenerated / loanAmount) * 100).toFixed(1);

  const cards = [
    { label: 'Monthly Payment', value: fmtUSDPrecise(monthlyPayment), accent: true },
    { label: 'Total Amount Paid', value: fmtUSD(totalAmountPaid) },
    { label: 'Total Interest', value: fmtUSD(totalInterestGenerated) },
    { label: 'Total Months', value: totalLoanMonths },
    { label: 'Effective Rate', value: effRate + '%' },
    { label: 'Interest / Principal', value: ((totalInterestGenerated / loanAmount) * 100).toFixed(1) + '%' },
  ];

  return (
    <div className="panel metrics-panel">
      <div className="section-label">Summary</div>
      <div className="metrics-grid">
        {cards.map((c) => (
          <div key={c.label} className={`metric-card${c.accent ? ' metric-card--accent' : ''}`}>
            <div className="metric-card__label">{c.label}</div>
            <div className="metric-card__value">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
