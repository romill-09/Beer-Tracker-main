import React from "react";
import "./css/tracker.css";
import AppBar from "./AppBar";
import { Link } from "react-router-dom";

const Tracker = () => {

  var heading = ["Date", "Point of favour", "Peasant", "Patron", "Beers owned"];
  var body = [
    ["Joe", "Austin", "Texas", "cw", "cw"],
    ["Bob", "Miami", "Florida", "cw", "ecw"],
    ["Bill", "Los Angeles", "California", "cwe", "cwe"],
    ["John", "Lansing", "Michigan", "cwe", "cew"],
  ];

  return (
    <>
      <div className="appbar">
        <AppBar />
      </div>

      <div className="table"></div>

      <div className="plead-button">
        <Link to="/req">
          <button type="submit">PLEAD A FAVOUR</button>
        </Link>
      </div>

      <div className="beertable">
        <table>
          <thead>
            <tr>
              {heading.map((head, index) => ( 
                <th key={index} style={{ width: index === 0 ? '150px' : 'auto' }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((val, colIndex) => (
                  <td key={colIndex}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tracker;
