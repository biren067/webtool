"use client";
import React, { useState } from "react";

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [annualIncrement, setAnnualIncrement] = useState(10);
  const [years, setYears] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const formatINR = (value) => "₹" + Math.round(value).toLocaleString("en-IN");

  const calculateSIP = () => {
    const rate = annualRate / 100;
    let currentMonthly = monthlyInvestment;
    let result = [];
    let totalInvestment = 0;
    let totalValue = 0;
    let prevInvestment = 0

    for (let year = 1; year <= years; year++) {
      const currentInvestment = currentMonthly * 12;
      const interestOn = currentInvestment + totalValue
      const interest = interestOn * ((annualRate /100));
      totalValue = interestOn  + interest ;
      totalInvestment += currentInvestment;
      
      console.log(`${currentInvestment} === ${interest} === ${prevInvestment}`)
       
       result.push({
        id: year,
        currentInvestment,
        totalInvestment,
        interestOn,
        interest,
        totalValue,
      });

      prevInvestment = totalValue;
      currentMonthly = currentMonthly * (1 + (annualIncrement /100));
      
    }
    // console.log(result)
    setTableData(result);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const totalInvestment = tableData.reduce((a, b) => a + b.currentInvestment, 0);
  const totalInterest = tableData.reduce((a, b) => a + b.interest, 0);
  // const netAmount = totalInvestment + totalInterest


  return (
    <div className="p-6 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">
        SIP Growth Calculator
      </h1>

      {/* Input Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
<div>
  <label className="block text-sm font-medium">Monthly Investment</label>
         
          <input
          type="number"
          placeholder="Monthly Investment"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

<div>
  <label className="block text-sm font-medium">Interest</label>
         
          <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

        
        

        <div>
  <label className="block text-sm font-medium">Yeary Increament(%)</label>
         
         <input
          type="number"
          placeholder="Annual Increment (₹)"
          value={annualIncrement}
          onChange={(e) => setAnnualIncrement(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>


 <div>
  <label className="block text-sm font-medium">Years</label>
         
           <input
          type="number"
          placeholder="Number of Years"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>
       
      
      </div>

      <button
        onClick={calculateSIP}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Calculate
      </button>

      {/* Table Section */}
      {tableData.length > 0 && (
        <>
          <table className="w-full border-collapse border text-sm mt-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Year</th>
                <th className="border p-2">Yearly Investment</th>
                <th className="border p-2">Monthly Investment</th>
                <th className="border p-2">Total Investment</th>
                <th className="border p-2">Interest On</th>
                <th className="border p-2">Interest Earned</th>
                <th className="border p-2">Total Value</th>

              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>

                  <td className="border p-2 text-center">{row.id}</td>
                  <td className="border p-2 text-right">{formatINR(row.currentInvestment)}</td>
                  <td className="border p-2 text-right">{formatINR(row.currentInvestment/12)}</td>

                  <td className="border p-2 text-right">{formatINR(row.totalInvestment)}</td>
                  <td className="border p-2 text-right">{formatINR(row.interestOn)}</td>
                  <td className="border p-2 text-right text-green-600">{formatINR(row.interest)}</td>
                  <td className="border p-2 text-right font-semibold">{formatINR(row.totalValue)}</td>
                  {/* <td className="border p-2 text-right font-semibold">{formatINR(row.netAmount)}</td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Totals */}
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">
              Total Investment: {formatINR(totalInvestment)}
            </p>
            <p className="text-lg font-semibold text-green-700">
              Total Interest (Profit): {formatINR(totalInterest)}
            </p>

             <div><strong>Net Amount       </strong>₹ {formatINR(tableData[tableData.length-1].totalValue)}</div>
          </div>
        </>
      )}
    </div>
  );
}
