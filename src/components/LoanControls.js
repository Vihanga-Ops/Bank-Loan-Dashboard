import React from 'react';
import './LoanControls.css';

const fmt = (n) => '$' + Number(n).toLocaleString();

export default function LoanControls({ loanData, onChange }) {
  const { loanAmount, interestRate, loanTerm } = loanData;

  return (
    <div className="panel loan-controls">
      <div className="section-label">Loan Parameters</div>

      {/* Loan Amount */}
      <div className="control-group">
        <div className="control-label">
          <span>Loan Amount</span>
          <span className="control-value">{fmt(loanAmount)}</span>
        </div>
        <input
          type="range"
          min="1000"
          max="500000"
          step="1000"
          value={loanAmount}
          onChange={(e) => onChange('loanAmount', Number(e.target.value))}
          aria-label="Loan amount"
        />
        <div className="control-range-labels">
          <span>$1,000</span>
          <span>$500,000</span>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="control-group">
        <div className="control-label">
          <span>Annual Interest Rate</span>
          <span className="control-value">{interestRate.toFixed(1)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="30"
          step="0.5"
          value={interestRate}
          onChange={(e) => onChange('interestRate', Number(e.target.value))}
          aria-label="Annual interest rate"
        />
        <div className="control-range-labels">
          <span>0.5%</span>
          <span>30%</span>
        </div>
      </div>

      {/* Loan Term */}
      <div className="control-group">
        <div className="control-label">
          <span>Loan Term</span>
          <span className="control-value">{loanTerm} {loanTerm === 1 ? 'year' : 'years'}</span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={loanTerm}
          onChange={(e) => onChange('loanTerm', Number(e.target.value))}
          aria-label="Loan term in years"
        />
        <div className="control-range-labels">
          <span>1 yr</span>
          <span>30 yrs</span>
        </div>
      </div>
    </div>
  );
}
