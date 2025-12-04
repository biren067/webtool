import React, { useState } from 'react';

import styles from '../styles/stockaverage.module.css'

function StockAverage() {
  const [stockPrice1, setStockPrice1] = useState('');
  const [noOfStock1, setNoOfStock1] = useState('');
  const [stockPrice2, setStockPrice2] = useState('');
  const [noOfStock2, setNoOfStock2] = useState('');
  const [finalNoOfStock, setFinalNoOfStock] = useState('');
  const [totalInvestment, setTotalInvestment] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [newInvestment, setNewInvestment] = useState('');
  const [newAvg, setNewAvg] = useState('');

  const initialInvestedAmount = ()=>{
    const initialInvestment = stockPrice1 * noOfStock1;
    setInitialInvestment(initialInvestment.toFixed(2));
  }

  const NextInvestedAmount = ()=>{
    const newInvestment = stockPrice2 * noOfStock2;
    setNewInvestment(newInvestment.toFixed(2));
  }

  const calculateInvestments = (e) => {
    e.preventDefault();
    console.log("initialInvestment",initialInvestment);
    const totalInvestment = parseFloat(initialInvestment) + parseFloat(newInvestment);
    setTotalInvestment(totalInvestment.toFixed(2));
    const totalNoOfStocks = parseFloat(noOfStock1) + parseFloat(noOfStock2);
    const newAvg = totalInvestment / totalNoOfStocks;
    setNewAvg(newAvg.toFixed(2));
    setFinalNoOfStock(totalNoOfStocks.toFixed(2))
    console.log("TotalNoOfStrock",totalNoOfStocks);
  }

  return (
    <div className='flex-col items-center m-3 px-3 '>
      <form onSubmit={calculateInvestments}>
      <h1 className='text-center'>Investment Calculator</h1>
      
      <h2>For Initial Investment: Stock at which you have already purchased</h2>
      
      <div className="my-2">
        <label >
            Stock Price:
            <input type="number" className={`${styles.input_text}`} value={stockPrice1} required onChange={(e) => setStockPrice1(e.target.value)} />
        </label>
        <label>
            No of Stock:
            <input onKeyUp={initialInvestedAmount} className={`${styles.input_text}`} required type="number" value={noOfStock1} onChange={(e) => setNoOfStock1(e.target.value)} />
        </label>
        {initialInvestment && <div>Initial Invested Amount: {initialInvestment}</div>}
      </div>
      <hr/>
      <div className="my-2">
        <h2>For New Investment:</h2>
        <label>
            Stock Price:
            <input  type="number" value={stockPrice2} className={`${styles.input_text}`} required onChange={(e) => setStockPrice2(e.target.value)} />
        </label>
        <label>
            No of Stock:
            <input onKeyUp={NextInvestedAmount} type="number" className={`${styles.input_text}`} required value={noOfStock2} onChange={(e) => setNoOfStock2(e.target.value)} />
        </label><br />
        {newInvestment && <div>New Invested Amount: {newInvestment}</div>}
        <hr/>
      </div>
          <button type="submit" className={`${styles.button_calculate}`}>Calculate</button>
          {finalNoOfStock && <div>No of Stock: {finalNoOfStock}</div>}
            {totalInvestment && <div>Total Investment: {totalInvestment}</div>}
            {newAvg && <div>New Avg: {newAvg}</div>}
    </form>
    </div>
  );
}

export default StockAverage;
