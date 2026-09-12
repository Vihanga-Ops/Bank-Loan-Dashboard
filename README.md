# 🏦 Bank Loan Dashboard

A responsive, interactive loan calculator and visualizer built with **React** and **Chart.js**. Adjust loan parameters in real time and instantly see a breakdown of payments, interest, and amortization schedule.

---
## 📬 Submission Links

| | Link |
|---|---|
| 🌐 **Hosted Link** | [Click here](https://joyful-dusk-219f3b.netlify.app/) |
| 🐙 **GitHub Repository** | [Click here](https://github.com/Vihanga-Ops/Bank-Loan-Dashboard) |

---

## 📸 Preview

> Pie chart showing principal vs interest · Line chart of remaining balance · Full amortization table

---

## ✨ Features

- 🎚️ **Live sliders** — adjust loan amount, interest rate, and term instantly
- 🥧 **Pie chart** — visual breakdown of principal vs total interest (Chart.js)
- 📈 **Line chart** — remaining balance plotted over the loan term
- 📋 **Amortization table** — full month-by-month payment schedule
- 🔁 **Lifting state up** — all loan state managed in `App.js` and passed as props
- ⚡ **React setState** — dynamic re-renders on every input change

---

## 🧮 Formulas Used

| Variable | Formula |
|---|---|
| Total Loan Months | `loanTerm × 12` |
| Interest Per Month | `interestRate / 100 / 12` |
| Monthly Payment | `(loanAmount × ipm × (1 + ipm)^n) / ((1 + ipm)^n − 1)` |
| Total Interest Generated | `monthlyPayment × totalLoanMonths − loanAmount` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm v8+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bank-dashboard.git

# 2. Navigate into the project
cd bank-dashboard

# 3. Install dependencies
npm install

# 4. Install Chart.js (if not already installed)
npm install chart.js react-chartjs-2

# 5. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 📁 File Structure

```
bank-dashboard/
├── public/
│   └── index.html                    # HTML entry point + Google Fonts
├── src/
│   ├── components/
│   │   ├── Header.js                 # Page title
│   │   ├── Header.css
│   │   ├── LoanControls.js           # Range slider inputs
│   │   ├── LoanControls.css
│   │   ├── MetricCards.js            # Summary metrics grid
│   │   ├── MetricCards.css
│   │   ├── PieChartPanel.js          # Chart.js pie chart
│   │   ├── PieChartPanel.css
│   │   ├── BalanceLineChart.js       # Chart.js line chart
│   │   ├── BalanceLineChart.css
│   │   ├── AmortizationTable.js      # Expandable payment table
│   │   └── AmortizationTable.css
│   ├── App.js                        # Root component — state management
│   ├── App.css                       # Layout styles
│   ├── index.js                      # React entry point
│   └── index.css                     # Global styles + CSS variables
├── package.json
└── README.md
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI components, useState, useMemo |
| Chart.js 4 | Pie and line chart rendering |
| react-chartjs-2 | React wrapper for Chart.js |
| DM Sans / DM Mono | Typography (Google Fonts) |
| CSS Variables | Theming and design tokens |

---

## 💡 React Concepts Demonstrated

- **Lifting State Up** — loan parameters live in `App.js` and flow down to all child components via props
- **useState** — manages `loanAmount`, `interestRate`, and `loanTerm`
- **useMemo** — memoizes expensive loan calculations so they only rerun when inputs change
- **useRef + useEffect** — used in chart components to imperatively create and destroy Chart.js instances
- **Controlled Components** — all sliders are controlled via React state

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
