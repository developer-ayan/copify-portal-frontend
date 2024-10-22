import React, { useState } from "react";

const DateRangePicker = ({ onClick }) => {
  const date =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

    console.log("date" , date)
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(date);
  const [error, setError] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setError(""); // Clear error when the date changes
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setError(""); // Clear error when the date changes
  };

  const handleSubmit = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date should be earlier than the end date.");
    } else {
      onClick(startDate, endDate);
      // Perform any action with the selected date range
    }
  };

  return (
    <div className="date-range-picker">
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="border px-2 py-1 rounded ml-5"
        />
      </label>
      <label className="ml-5">
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="border px-2 py-1 rounded ml-5"
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded ml-5"
      >
        Submit
      </button>
    </div>
  );
};

export default DateRangePicker;
