import React, { useState } from 'react';
import './AmortizationTable.css';

const fmtUSD = (n) =>
  '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function AmortizationTable({ schedule }) {
  const [showAll, setShowAll] = useState(false);
  const displayRows = showAll ? schedule : schedule.slice(0, 12);

  return (
    <div className="panel amort-panel">
      <div className="amort-header">
        <div className="section-label" style={{ margin: 0 }}>
          Amortization Schedule
        </div>
        <span className="amort-count">{schedule.length} months total</span>
      </div>

      <div className="amort-scroll">
        <table className="amort-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Payment</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row) => (
              <tr key={row.month} className={row.month % 12 === 0 ? 'amort-year-end' : ''}>
                <td className="amort-td--month">{row.month}</td>
                <td>{fmtUSD(row.payment)}</td>
                <td className="amort-td--principal">{fmtUSD(row.principal)}</td>
                <td className="amort-td--interest">{fmtUSD(row.interest)}</td>
                <td>{fmtUSD(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 12 && (
        <button
          className="amort-toggle"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show fewer rows' : `Show all ${schedule.length} months`}
        </button>
      )}
    </div>
  );
}
