import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../CSS/cheat.css";

const AuthorityPage = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("cheatingCases")) || [];
    setCases(storedCases);
  }, []);

  const handleApprove = (index) => {
    const updatedCases = [...cases];
    updatedCases[index].status = "approved";
    setCases(updatedCases);
    localStorage.setItem("cheatingCases", JSON.stringify(updatedCases));

    alert("Case approved successfully!");

    // Navigate to Student login page
    navigate("/student/cheatcase");
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Navbar />
        <h2 className="page-title">Authority Panel - Review Cheating Cases</h2>
        <div className="case-list">
          {cases.map((caseItem, index) => (
            <div key={index} className="case-item">
              <p><strong>Invigilator:</strong> {caseItem.invigilatorName}</p>
              <p><strong>Student:</strong> {caseItem.studentName}</p>
              <p><strong>Description:</strong> {caseItem.description}</p>
              <p><strong>Proof:</strong> <a href={caseItem.proof} target="_blank" rel="noopener noreferrer">View Proof</a></p>
              <p><strong>Status:</strong> {caseItem.status}</p>
              {caseItem.status === "pending" && (
                <button onClick={() => handleApprove(index)}>Approve</button>
              )}
            </div>
          ))}
        </div>

        <style jsx>{`
          .page-title {
            font-size: 24px;
            margin-bottom: 20px;
          }

          .case-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .case-item {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .case-item button {
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            padding: 10px;
            margin-top: 10px;
          }

          .case-item button:hover {
            background-color: #218838;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthorityPage;
