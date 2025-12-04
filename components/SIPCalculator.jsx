
import React, { useState } from 'react';

function SIPCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [investmentTenure, setInvestmentTenure] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [estimatedReturns, setEstimatedReturns] = useState('');
  const [totalReturns, setTotalReturns] = useState('');

  const calculateSIP = () => {
    const monthlyInterestRate = interestRate / (12 * 100);
    const totalMonths = investmentTenure * 12;
    const futureValue = investmentAmount * ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);
    const investedAmount = investmentAmount * totalMonths;
    const estimatedReturns = futureValue - investedAmount;
    setInvestedAmount(Math.round(investmentAmount * totalMonths));
    setEstimatedReturns(Math.round(estimatedReturns));
    setTotalReturns(Math.round(futureValue));
  }

  return (
    <div>
      <h1>SIP Calculator</h1>
      <label>
        Monthly Investment Amount:
        <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
      </label><br />
      <label>
        Expected Annual Return (%):
        <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
      </label><br />
      <label>
        Investment Tenure (Years):
        <input type="number" value={investmentTenure} onChange={(e) => setInvestmentTenure(e.target.value)} />
      </label><br />
      <button onClick={calculateSIP}>Calculate SIP</button><br />
      {investedAmount && <div>Invested Amount: {investedAmount.toLocaleString()}</div>}
      {estimatedReturns && <div>Estimated Returns: {estimatedReturns.toLocaleString()}</div>}
      {totalReturns && <div>Total Returns: {totalReturns.toLocaleString()}</div>}
    </div>
  );
}

export default SIPCalculator;
