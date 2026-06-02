import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import LoanControls from './components/LoanControls';
import MetricCards from './components/MetricCards';
import PieChartPanel from './components/PieChartPanel';
import BalanceLineChart from './components/BalanceLineChart';
import AmortizationTable from './components/AmortizationTable';

// ─── Core loan formulas ──────────────────────────────────────────────────────
function computeLoan(loanAmount, interestRate, loanTerm) {
  const totalLoanMonths = loanTerm * 12;                           // formula 1
  const interestPerMonth = interestRate / 100 / 12;               // formula 2

  let monthlyPayment;
  if (interestPerMonth === 0) {
    monthlyPayment = loanAmount / totalLoanMonths;
  } else {
    monthlyPayment =                                               // formula 3
      (loanAmount * interestPerMonth * Math.pow(1 + interestPerMonth, totalLoanMonths)) /
      (Math.pow(1 + interestPerMonth, totalLoanMonths) - 1);
  }

  const totalInterestGenerated =                                   // formula 4
    monthlyPayment * totalLoanMonths - loanAmount;

  const totalAmountPaid = monthlyPayment * totalLoanMonths;

  return {
    monthlyPayment,
    totalAmountPaid,
    totalInterestGenerated,
    totalLoanMonths,
    interestPerMonth,
  };
}

function buildAmortSchedule(loanAmount, monthlyPayment, interestPerMonth, totalMonths) {
  const schedule = [];
  let balance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPart = balance * interestPerMonth;
    const principalPart = monthlyPayment - interestPart;
    balance = Math.max(0, balance - principalPart);
    schedule.push({ month, payment: monthlyPayment, principal: principalPart, interest: interestPart, balance });
  }
  return schedule;
}

function buildBalanceSeries(loanAmount, schedule) {
  const step = Math.max(1, Math.floor(schedule.length / 12));
  const points = [{ label: 'Start', balance: loanAmount }];

  schedule.forEach((row, idx) => {
    if ((idx + 1) % step === 0 || idx === schedule.length - 1) {
      points.push({ label: `Mo ${row.month}`, balance: row.balance });
    }
  });

  return {
    labels: points.map((p) => p.label),
    data: points.map((p) => p.balance),
  };
}

// ─── Default loan state ───────────────────────────────────────────────────────
const DEFAULT_STATE = {
  loanAmount: 25000,
  interestRate: 6.5,
  loanTerm: 5,
};

export default function App() {
  // Lifting state up — all loan parameters live here
  const [loanData, setLoanData] = useState(DEFAULT_STATE);

  // Update a single field by key
  const handleChange = (field, value) => {
    setLoanData((prev) => ({ ...prev, [field]: value }));
  };

  // Derived computations (memoised for performance)
  const computed = useMemo(() => {
    const { loanAmount, interestRate, loanTerm } = loanData;
    const result = computeLoan(loanAmount, interestRate, loanTerm);
    const schedule = buildAmortSchedule(
      loanAmount,
      result.monthlyPayment,
      result.interestPerMonth,
      result.totalLoanMonths
    );
    const balanceSeries = buildBalanceSeries(loanAmount, schedule);
    return { ...result, schedule, balanceSeries };
  }, [loanData]);

  return (
    <div className="app">
      <div className="container">
        <Header />

        {/* ── Row 1: Controls + Metrics ── */}
        <div className="row-top">
          <LoanControls loanData={loanData} onChange={handleChange} />
          <MetricCards loanData={loanData} computed={computed} />
        </div>

        {/* ── Row 2: Pie + Line chart ── */}
        <div className="row-charts">
          <PieChartPanel loanData={loanData} computed={computed} />
          <BalanceLineChart computed={computed} />
        </div>

        {/* ── Row 3: Amortization table ── */}
        <AmortizationTable schedule={computed.schedule} />
      </div>
    </div>
  );
}
