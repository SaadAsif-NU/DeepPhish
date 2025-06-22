import React, { useState, useEffect } from "react";
import axios from "axios";
// Custom styles for the history card

export default function UrlHistory() {
  const [history, setHistory] = useState([]); // State to hold the user's history
  const userIdx = localStorage.getItem("uId"); // Replace with the actual user ID

  useEffect(() => {
    // Fetch the history data when the component mounts
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/history/${userIdx}`
        );
        setHistory(response.data.history); // Set the history data from the API
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory(); // Call the function to fetch data
  }, []); // Re-run if userId changes

  return (
    <>
      <div className="col-md-6">
        <div className="card history-card shadow-lg">
          <div className="card-header history-card-header">
            <h4 className="history-card-title">Tested URLs</h4>
          </div>
          <div className="card-body history-card-body">
            <div className="table-responsive history-table">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>URL</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.url}</td>
                        <td>{entry.isPhishing ? "Malicious" : "Safe"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
