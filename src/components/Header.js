import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <div className="dash-header">
      <h1 className="dash-header__title">Bank Loan Dashboard</h1>
      <p className="dash-header__sub">Interactive loan calculator & amortization visualizer</p>
    </div>
  );
}