import React, { useState } from 'react';

function DateTimeConverter() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFromTimeZone, setSelectedFromTimeZone] = useState('');
  const [selectedToTimeZone, setSelectedToTimeZone] = useState('');
  const [convertedDateTime, setConvertedDateTime] = useState('');

  const timeZones = [
    { value: '-12:00', label: '(UTC-12) International Date Line West' },
    { value: '-11:00', label: '(UTC-11) Midway Island, Samoa' },
    { value: '-10:00', label: '(UTC-10) Hawaii' },
    { value: '-09:00', label: '(UTC-09) Alaska' },
    { value: '-08:00', label: '(UTC-08) Pacific Time (US/Canada), Tijuana' },
    { value: '-07:00', label: '(UTC-07) Mountain Time (US/Canada), Chihuahua, Mazatlan' },
    { value: '-06:00', label: '(UTC-06) Central America, Central Time (US/Canada), Mexico City' },
    { value: '-05:00', label: '(UTC-05) Eastern Time (US/Canada), Colombia, Peru, Cuba' },
    { value: '-04:00', label: '(UTC-04) Atlantic Time (Canada), Caracas, La Paz, Santiago' },
    { value: '-03:00', label: '(UTC-03) Newfoundland, Brasilia, Rio, Argentina, Greenland' },
    { value: '-02:00', label: '(UTC-02) Mid-Atlantic' },
    { value: '-01:00', label: '(UTC-01) Azores, Cape Verde Island' },
    { value: '0', label: '(UTC) United Kingdom, Iceland, Ghana, Senegal, Mali' },
    { value: '+01:00', label: '(UTC+01) France, Germany, Central Europe Time, West Africa Time' },
    { value: '+02:00', label: '(UTC+02) Eastern Europe Time, Central Africa Time, Greece, Egypt' },
    { value: '+03:00', label: '(UTC+03) East Africa Time, Moscow, Iraq, Kuwait, Kenya' },
    { value: '+03:30', label: '(UTC+03:30)  Iran' },
    { value: '+04:00', label: '(UTC+04) Armenia, Georgia, Oman, United Arab Emirates' },
    { value: '+04:30', label: '(UTC+04:30) Afghanistan' },
    { value: '+05:00', label: '(UTC+05) Pakistan, Kazakhstan (west), Uzbekistan' },
    { value: '+05:30', label: '(UTC+05:30) India, Sri Lanka' },
    { value: '+05:45', label: '(UTC+05:45) Nepal' },
    { value: '+06:00', label: '(UTC+06) Bangladesh, Bhutan, Kazakhstan (most)' },
    { value: '+06:30', label: '(UTC+06:30) Myanmar' },
    { value: '+07:00', label: '(UTC+07) Cambodia, Jakarta, Thailand, Vietnam' },
    { value: '+08:00', label: '(UTC+08) China, Malaysia, Philippines, Singapore' },
    { value: '+09:00', label: '(UTC+09) Japan, Korea' },
    { value: '+10:00', label: '(UTC+10) Sydney, Guam, Vladivostok, Melbourne' },
    { value: '+11:00', label: '(UTC+11) Solomon Island, Vanuatu' },
    { value: '+12:00', label: '(UTC+12) New Zealand (most), Fiji, Marshall Island' }
  ];

  const handleConvertDateTime = () => {
    if (!selectedDate || !selectedTime || !selectedFromTimeZone || !selectedToTimeZone) {
      alert('Please fill all fields.');
      return;
    }

    // Constructing a Date object from selected date and time
    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

    // Getting day, month, year, and time in hh:mm:ss format
    const day = selectedDateTime.toLocaleString('en-US', { day: 'numeric' });
    const month = selectedDateTime.toLocaleString('en-US', { month: 'long' });
    const year = selectedDateTime.toLocaleString('en-US', { year: 'numeric' });
    const time = selectedDateTime.toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Getting day of the week
    const dayOfWeek = selectedDateTime.toLocaleString('en-US', { weekday: 'long' });

    // Convert time to the "To" time zone
    const fromTime = selectedDateTime.getTime();
    const fromOffset = parseInt(selectedFromTimeZone, 10) * 60 * 60 * 1000;
    const toOffset = parseInt(selectedToTimeZone, 10) * 60 * 60 * 1000;
    const convertedTime = new Date(fromTime + fromOffset - toOffset);

    // Constructing the output string
    const convertedDay = convertedTime.toLocaleString('en-US', { day: 'numeric' });
    const convertedMonth = convertedTime.toLocaleString('en-US', { month: 'long' });
    const convertedYear = convertedTime.toLocaleString('en-US', { year: 'numeric' });
    const convertedTimeStr = convertedTime.toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const output = `${month}, ${day}, ${year} ${time} (${dayOfWeek}) at ${selectedFromTimeZone} is same as ${convertedMonth}, ${convertedDay}, ${convertedYear} ${convertedTimeStr} (${dayOfWeek}) at ${selectedToTimeZone}`;

    setConvertedDateTime(output);
  };

  return (
    <div>
      <h2>Date Time Converter</h2>
      <div>
        <label>
          Date:
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Time:
          <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          From Time Zone:
          <select value={selectedFromTimeZone} onChange={(e) => setSelectedFromTimeZone(e.target.value)}>
            <option value="">Select Time Zone</option>
            {timeZones.map((timeZone) => (
              <option key={timeZone.value} value={timeZone.value}>{timeZone.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          To Time Zone:
          <select value={selectedToTimeZone} onChange={(e) => setSelectedToTimeZone(e.target.value)}>
            <option value="">Select Time Zone</option>
            {timeZones.map((timeZone) => (
              <option key={timeZone.value} value={timeZone.value}>{timeZone.label}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleConvertDateTime}>Convert</button>
      {convertedDateTime && <p>{convertedDateTime}</p>}
    </div>
  );
}

export default DateTimeConverter;
