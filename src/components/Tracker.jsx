import React from "react";
import "./css/tracker.css";
import AppBar from "./AppBar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Tracker = () => {
  return (
    <>
      <div className="appbar">
        <AppBar />
      </div>

      <div className="table"></div>

      <div className="plead-button">
        {/* Add Link component to navigate to the Req page */}
        <Link to="/req">
          <button type="submit">PLEAD A FAVOUR</button>
        </Link>
      </div>
    </>
  );
};

export default Tracker;

/*import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import "./css/tracker.css";
import AppBar from './AppBar';

const Tracker = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase database
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('your-table-path').once('value');
        const data = snapshot.val();
        if (data) {
          // Convert Firebase object to an array of objects
          const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          setTableData(dataArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Subscribe to real-time updates
    const databaseRef = firebase.database().ref('your-table-path');
    databaseRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTableData(dataArray);
      } else {
        setTableData([]);
      }
    });

    // Unsubscribe from real-time updates when the component unmounts
    return () => {
      databaseRef.off();
    };
  }, []);

  const handleDeleteRow = (id) => {
    // Delete row from Firebase
    firebase.database().ref(`your-table-path/${id}`).remove();
  };

  return (
    <>
      <div className="appbar">
        <AppBar />
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              {/* Add more column headers as needed }
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(row => (
              <tr key={row.id}>
                <td>{row.column1}</td>
                <td>{row.column2}</td>
                {/* Render more columns as needed }
                <td>
                  <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="plead-button">
        <button type="submit">PLEAD A FAVOUR</button>
      </div>
    </>
  );
};

export default Tracker;
*/
