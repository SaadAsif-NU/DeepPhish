import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import UrlHistory from "./UrlHistory";
import axios from "axios";

export default function History() {
  const [emailHistory, setEmailHistory] = useState([]);
  const userIdx = localStorage.getItem("uId");

  // Fetch Email History on Component Mount
  useEffect(() => {
    const fetchEmailHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/get-email-history/${userIdx}`
        );
        setEmailHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching email history:", error);
        alert("Failed to load email history. Please try again later.");
      }
    };

    if (userIdx) fetchEmailHistory();
  }, [userIdx]);

  return (
    <>
      <Nav></Nav>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="row g-4">
          <UrlHistory></UrlHistory>

          {/* Email History Section */}
          <div className="col-md-6">
            <div className="card history-card shadow-lg">
              <div className="card-header history-card-header">
                <h4 className="history-card-title">Tested Content</h4>
              </div>
              <div className="card-body history-card-body">
                <div className="history-content">
                  {/* Render Email History */}
                  {emailHistory.length > 0 ? (
                    emailHistory.map((item) => (
                      <div className="history-content-item" key={item.id}>
                        <p>
                          <strong>Content:</strong> {item.emailBody}
                        </p>
                        <p>
                          <strong>Date:</strong> {item.date}
                        </p>
                        <p>
                          <strong>Verdict:</strong>{" "}
                          {item.isSuspicious ? "Malicious" : "Safe"}
                        </p>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>No email history found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
