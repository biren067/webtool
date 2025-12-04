import React, { useState, useEffect } from 'react';

function Index() {
  const [data, setData] = useState([]);
  const bounce_amount = 3600;

  useEffect(() => {
    const generateTableData = () => {
      const tableData = [];
      let lastAmount = 0;
      let interest = 12000;

      for (let i = 1; i <= 32; i++) {
        if (i === 25) {
          interest = 24000;
        }
        const amount = lastAmount + interest;
        tableData.push({ no: i, interestAmount: interest, amount });
        lastAmount = amount;
      }

      setData(tableData);
    };

    generateTableData();
  }, []);

  return (
    <>
      <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>No</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Interest Amount</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.no}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.no}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.interestAmount}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <strong>Total Amount with Bounce:</strong> {data[data.length - 1].amount + bounce_amount}
        </div>
      )}
    </>
  );
}

export default Index;
