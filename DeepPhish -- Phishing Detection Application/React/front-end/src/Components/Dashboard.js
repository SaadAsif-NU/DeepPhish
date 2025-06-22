import React, { useState } from "react";
import phishingurlimg from "../Assets/phising.jpg";
import historyimg from "../Assets/history.png";
import emailimg from "../Assets/Free_Phishing_Vector.jpg";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  // URL States
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlResult, setUrlResult] = useState(null);

  // Email States
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);
  const [emailBody, setEmailBody] = useState("");
  const [emailResult, setEmailResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("uId");

  // Modal Handlers for URL
  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  // Modal Handlers for Email
  const handleOpenEmailModal = () => setEmailModalIsOpen(true);
  const handleCloseEmailModal = () => setEmailModalIsOpen(false);

  // Handle URL Input
  const handleUrlChange = (e) => setUrl(e.target.value);

  // Handle Email Input
  const handleEmailChange = (e) => setEmailBody(e.target.value);

  // Check URL Function
  const handleCheckUrl = async () => {
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/test-url", {
        userId,
        url,
      });
      setUrlResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error checking the URL:", error);
      setLoading(false);
      alert("There was an error checking the URL.");
    }
  };

  // Check Email Function
  const handleCheckEmail = async () => {
    if (!emailBody) {
      alert("Please enter the email content.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/check-email", {
        userId,
        emailBody,
      });
      setEmailResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error checking the email:", error);
      setLoading(false);
      alert("There was an error checking the email.");
    }
  };

  const viewHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <Nav />
      <div className="container my-5">
        <div className="row g-4">
          {/* Phishing URL Section */}
          <div className="col-lg-6 col-md-6">
            <div className="custom-card d-flex align-items-center">
              <div className="custom-card-body">
                <Typography variant="h5" component="h2">
                  Check for Phishing URL
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Using the latest AI models we will test whether a URL is
                  phishing or safe.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
                >
                  Check
                </Button>
              </div>
              <img
                src={emailimg}
                alt="Email Phishing"
                style={{ maxWidth: "100px" }}
              />
            </div>
          </div>

          {/* Phishing Email Section */}
          <div className="col-lg-6 col-md-6">
            <div className="custom-card d-flex align-items-center">
              <div className="custom-card-body">
                <Typography variant="h5" component="h2">
                  Check for Phishing Emails
                </Typography>
                <Typography variant="body2" gutterBottom>
                  AI model will analyze the contents of an email to detect
                  whether it is phishing or not.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenEmailModal}
                >
                  Check
                </Button>
              </div>
              <img
                src={phishingurlimg}
                alt="Phishing URL"
                style={{ maxWidth: "100px" }}
              />
            </div>
          </div>

          {/* History Section */}
          <div className="col-lg-12">
            <div className="custom-card d-flex align-items-center">
              <div className="custom-card-body">
                <Typography variant="h5" component="h2">
                  View History
                </Typography>
                <Typography variant="body2" gutterBottom>
                  View your past searches and their verdicts in a managed
                  dashboard to check if you are repeating searches and to see if
                  you have any queries about your past searches.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={viewHistory}
                >
                  Learn More
                </Button>
              </div>
              <img
                src={historyimg}
                alt="History"
                style={{ maxWidth: "150px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal for URL Input */}
      <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Test Phishing URL
          </Typography>
          <TextField
            fullWidth
            label="Enter URL"
            value={url}
            onChange={handleUrlChange}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckUrl}
            disabled={loading}
            sx={{ mt: 2 }}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Check URL"}
          </Button>
          {urlResult !== null && (
            <Box mt={3}>
              <Typography variant="h6">Result:</Typography>
              <Typography>
                Is Phishing: {urlResult ? "Yes" : "No"}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Modal for Email Input */}
      <Modal open={emailModalIsOpen} onClose={handleCloseEmailModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '70%',
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Test Phishing Email
          </Typography>
          <Box display="flex" justifyContent="center">
            <TextField
              multiline
              minRows={6}
              maxRows={8}
              label="Enter Full Email Content"
              value={emailBody}
              onChange={handleEmailChange}
              margin="normal"
              variant="outlined"
              sx={{
                width: {
                  xs: '100%',
                  sm: '100%',
                  md: '100%',
                },
                '& .MuiInputBase-root': {
                  overflowY: 'auto',
                },
              }}
            />
          </Box>



          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckEmail}
            disabled={loading}
            sx={{ mt: 2 }}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Check Email"}
          </Button>
          {emailResult && (
            <Box mt={3}>
              <Typography variant="h6">Result:</Typography>
              <Typography>
                Is Suspicious: {emailResult.isSuspicious ? "Yes" : "No"}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
