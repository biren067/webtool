import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState(''); // Loan amount
  const [rate, setRate] = useState(''); // Annual interest rate
  const [years, setYears] = useState(''); // Loan tenure in years
  const [months, setMonths] = useState('');
  const [tableData, setTableData] = useState([]);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('years'); // Default selected duration is years
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [pageNumbers, setPageNumbers] = useState(1);
  const netPage = [];
  const maxPageButtons = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [emiPerMonth,setEmiPerMonth] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const resetData = () => {
    setTableData([]);
    setCurrentPage(1);
  };

  const formatIndianNumber = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  const handlePrincipalChange = (e) => {
    resetData();
    setTableData([]);
    setCurrentPage(1);
    // Remove non-numeric characters and format with commas
    const formattedValue = formatIndianNumber(e.target.value.replace(/[^0-9]/g, ''));
    setPrincipal(formattedValue);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setCustomRate = (e) => {
    resetData();
    setRate(e.target.value)
  };
  const setCustomYearsOrMonths = (e) => {
    resetData();
    setMonths(e.target.value)
  };

  let lastAmountTitle = '';
  if (tableData.length > 0) {
    lastAmountTitle = tableData[tableData.length - 1].amount;
  }

  const getLoanMonthYear = (month, year) => {
    month = Number(month)
    year = Number(year)
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    return {
        month: String(nextMonth).padStart(2, '0'), // Ensures 2-digit format (e.g., "03", "09")
        year: String(nextYear).padStart(4, '0')    // Ensures 4-digit year format (not really needed, but keeps consistency)
    };
};
  // Function to calculate EMI and payment breakdown
  const calculateEMI = () => {
    resetData();
    // const loan_month = selectedDate.toLocaleString('default', { month: 'long' }); // Example: "February"
    
    const monthlyRate = Number(rate) / 12 / 100;
    // const months = years * 12;
    const nPrincipal = Number(principal.replace(/,/g, '')); 
    const emi = (nPrincipal * Number(monthlyRate) * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    setEmiPerMonth(formatIndianNumber(emi.toFixed(0)))
    let remainingPrincipal = nPrincipal;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let amountPaid = 0;
    let data = [];
    let loanMonth = selectedDate.getMonth() ; // Example: 2 (February)
    let loanYear = selectedDate.getFullYear() ;   
    for (let i = 1; i <= months; i++) {
      const interestPaid = remainingPrincipal * monthlyRate;
      const principalPaid = emi - interestPaid;
      totalInterestPaid += interestPaid;
      totalPrincipalPaid += principalPaid;
      remainingPrincipal -= principalPaid;
      amountPaid = amountPaid + interestPaid + principalPaid;
      ({ month: loanMonth, year: loanYear } = getLoanMonthYear(loanMonth, loanYear));
      const formattedMonth = loanMonth.toString().padStart(2, "0");
      data.push({
        month: i,
        loanMonth:`${formattedMonth}-${loanYear}`,
        emi: emi.toFixed(0),
        principalPaid: formatIndianNumber(principalPaid.toFixed(0)),
        interestPaid: formatIndianNumber(interestPaid.toFixed(0)),
        totalInterestPaid: formatIndianNumber(totalInterestPaid.toFixed(0)),
        totalPrincipalPaid: formatIndianNumber(totalPrincipalPaid.toFixed(0)),
        amountPaid:formatIndianNumber(amountPaid.toFixed(0)),
        remainingPrincipal: formatIndianNumber(remainingPrincipal.toFixed(0)),
        totalEMIRemaining: formatIndianNumber( (emi * (months - i)).toFixed(0)),
      });
    }
    setTableData(data);
    let endPage = data.length/itemsPerPage
    for (let i = 1; i <= endPage; i++) {
      netPage.push(i);
    }

    setPageNumbers(netPage);
    setCurrentPage(1); // Reset pagination to first page after calculating

    // return { emi: emi.toFixed(2), emiSchedule };
  };

  // const { emi, emiSchedule } = calculateEMI();

  return (
    <div className="container-box">
    <div className="input-group">
      <label htmlFor="loan_amount">Load Amount:</label>
      <input
        type="text"
        id="principal"
        value={principal}
        onChange={handlePrincipalChange}
      />
    </div>
    <div className="input-group">
      <label htmlFor="rate">Interest Rate (% per year):</label>
      <input
        type="number"
        id="rate"
        value={rate}
        onChange={setCustomRate}
      />
    </div>
    <div className="input-group">
        <label htmlFor="years">Number of Month:</label>
        <input
          type="number"
          id="month"
          value={months}
          // onChange={(e) => setYears(e.target.value)}
          onChange={setCustomYearsOrMonths}
        />
    </div>
    <div className="input-group">
        <label htmlFor="years">Loan Start Date:</label>
        {/* <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} /> */}
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} 
        showYearDropdown
        showMonthDropdown
        dropdownMode="select" // Enables a dropdown for year and month selection
        dateFormat="dd/MM/yyyy"
        />
    </div>
    <button className={`button`} onClick={calculateEMI}>Calculate</button>

    {/* <div>{loanMonth ? loanMonth : "No date selected"}</div>
    <div>{loanYear ? loanYear : "No date selected"}</div> */}
  {tableData.length > 0 && (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
    <div style={{ fontWeight: "bold", color: "#333" }}>EMI Per Month:</div>
    <div style={{ fontSize: "18px", color: "#007bff" }}>{emiPerMonth}</div>
  </div>
)}


    {tableData.length > 0 && (
      
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Monthly </th>
                
                <th>Principal</th>
                <th>Interest</th>
                <th>Interest Paid</th>
                <th>Principal Paid</th>
                <th>Amount Paid</th>
                <th>Principal Due</th>
              </tr>
            </thead>
            <tbody>
            {tableData.slice(indexOfFirstItem, indexOfLastItem).map((item) => {
              const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
              const currentYear = new Date().getFullYear();
            
              const isCurrentMonthYear = item.loanMonth.split("-")[0] == String(currentMonth).padStart(2, "0") 
                                      && item.loanMonth.split("-")[1] == String(currentYear);

              return (<tr key={item.month} style={isCurrentMonthYear ? { fontWeight: "bold" } : {}}>
                <td>{item.month}</td>
                <td>{item.loanMonth}</td>
                
                <td>{item.principalPaid}</td>
                <td>{item.interestPaid}</td>
                <td>{item.totalInterestPaid}</td>
                <td>{item.totalPrincipalPaid}</td>
                <td>{item.amountPaid}</td>
                <td>{item.remainingPrincipal}</td>
              </tr>)
              })}

            </tbody>
          </table>


{/* Pagination controls */}
<div className="mainPage__pagination">
  <button
    className="mainPage__button"
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* {currentPage > 4 && (
    <button className={` ${styles.mainPage__button_number}`}>{`...`}</button>
  )} */}

  {pageNumbers
    .filter(
      (pageNumber) =>
        pageNumber === currentPage ||
        pageNumber === currentPage - 1 ||
        pageNumber === currentPage + 1 ||
        pageNumber === currentPage + 2
    )
    .map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`mainPage__button_number`}
      >
        {pageNumber}
      </button>
    ))}

  <button
    className="mainPage__button"
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={endIndex >= tableData.length}
  >
    Next
  </button>
</div>
{/* end of pagination */}

</div>
      )}
    </div>
  );
};

export default LoanEMICalculator;
