import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "../../CSS/cheat.css";

const StudentPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("cheatingCases")) || [];
    const approvedCases = storedCases.filter(caseItem => caseItem.status === "approved");
    setCases(approvedCases);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Navbar />
        <h2 className="page-title">Student Panel - View Cheating Cases</h2>
        <div className="case-list">
          {cases.map((caseItem, index) => (
            <div key={index} className="case-item">
              <p><strong>Student:</strong> {caseItem.studentName}</p>
              <p><strong>Action Taken:</strong> {caseItem.actionTaken}</p>
            </div>
          ))}
        </div>

        <style jsx={true}>{`
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
        `}</style>
      </div>
    </div>
  );
};

export default StudentPage;
