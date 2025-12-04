import React, { useState, useEffect } from 'react';

function Index(){
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  const [calcDay, setCalcDay] = useState('');
  const [calcMonth, setCalcMonth] = useState('');
  const [calcYear, setCalcYear] = useState('');

  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const currentYear = currentDate.getFullYear().toString();

  // Set default values to current date
  useEffect(() => {
    setCalcDay(currentDay);
    setCalcMonth(currentMonth);
    setCalcYear(currentYear);
  },[currentDay,currentMonth,currentYear]);

  const [result, setResult] = useState('');

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(`${dobYear}-${dobMonth}-${dobDay}`);
    const calcDate = new Date(`${calcYear}-${calcMonth}-${calcDay}`);

    const ageInMilliseconds = today - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
    const ageInWeeks = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
    const ageInMinutes = Math.floor(ageInMilliseconds / (1000 * 60));

    setResult(
      `Age: ${ageInYears} years, ${today.getMonth() - birthDate.getMonth()} months, and  ${today.getDate() - birthDate.getDate()} days\n` 
      // + `or ${ageInMonths} months ${ageInDays % 30} days\n` +
      // `or ${ageInWeeks} weeks ${ageInDays % 7} days\n` +
      // `or ${ageInDays} days\n` +
      // `or ${ageInHours} hours\n` +
      // `or ${ageInMinutes} minutes`
    );
  };

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div>
      <h2>Age Calculator</h2>
      <div>
        <label>Date of Birth:</label>
        <select value={dobDay} onChange={(e) => setDobDay(e.target.value)}>
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)}>
          <option value="">Month</option>
          {monthNames.map((month, index) => (
            <option key={index} value={(index + 1).toString().padStart(2, '0')}>{month}</option>
          ))}
        </select>
        <select value={dobYear} onChange={(e) => setDobYear(e.target.value)}>
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Age to Calculate:</label>
        <select value={calcDay} onChange={(e) => setCalcDay(e.target.value)}>
          <option value="">Day</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select value={calcMonth} onChange={(e) => setCalcMonth(e.target.value)}>
          <option value="">Month</option>
          {monthNames.map((month, index) => (
            <option key={index} value={(index + 1).toString().padStart(2, '0')}>{month}</option>
          ))}
        </select>
        <select value={calcYear} onChange={(e) => setCalcYear(e.target.value)}>
          <option value="">Year</option>
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button className={`button`} onClick={calculateAge}>Calculate</button>
      {result && <p>{result}</p>}
      
      {/* <p>
        <div>
          {ageInYears && 
          <span>{`Age: ${ageInYears} years ${today.getMonth() - birthDate.getMonth()} months ${today.getDate() - birthDate.getDate()} days\n`}</span>
          }
        </div>
      </p> */}
      
    </div>
  );
};

export default Index;
