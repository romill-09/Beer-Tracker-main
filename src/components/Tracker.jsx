import React, { useEffect, useState, useRef } from "react";
import "./css/tracker.css";
import AppBar from "./AppBar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Tracker = () => {
  const { logout } = useAuth();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const tableRef = useRef(null);
  const scrollInterval = useRef(null);
  const [peasantNames, setPeasantNames] = useState([]);
  const [patronNames, setPatronNames] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history("/login"); // Redirect to login page if user is not logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [history]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(data);

      // Fetch unique peasant names
      const uniquePeasantNames = [...new Set(data.map((row) => row.peasant))];
      setPeasantNames(uniquePeasantNames);

      // Fetch unique patron names
      const uniquePatronNames = [...new Set(data.map((row) => row.patron))];
      setPatronNames(uniquePatronNames);
    };

    fetchData();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      history("/login");
    } catch {
      console.log("Failed to log out");
    }
  }

  useEffect(() => {
    const table = tableRef.current;

    const scrollTable = () => {
      if (table.scrollTop >= table.scrollHeight - table.clientHeight) {
        table.scrollTop = 0;
      } else {
        table.scrollTop += 1;
      }
    };

    const startScrolling = () => {
      stopScrolling(); // Ensure any existing interval is cleared
      scrollInterval.current = setInterval(scrollTable, 30);
    };

    const stopScrolling = () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };

    startScrolling();

    table.addEventListener("mouseenter", stopScrolling);
    table.addEventListener("mouseleave", startScrolling);
    table.addEventListener("mousedown", stopScrolling);
    table.addEventListener("mouseup", startScrolling);

    return () => {
      stopScrolling();
      table.removeEventListener("mouseenter", stopScrolling);
      table.removeEventListener("mouseleave", startScrolling);
      table.removeEventListener("mousedown", stopScrolling);
      table.removeEventListener("mouseup", startScrolling);
    };
  }, []);

  // Function to calculate total beers due and owed for a user
  function calculateTotalBeers(name, role) {
    const filteredData = data.filter(
      (row) =>
        (role === "peasant" && row.peasant === name) ||
        (role === "patron" && row.patron === name),
    );

    const totalBeersDue = filteredData.reduce(
      (total, row) => total + row.beersDue,
      0,
    );
    const totalBeersOwed = filteredData.reduce(
      (total, row) => total + row.beersOwed,
      0,
    );

    return { totalBeersDue, totalBeersOwed };
  }

  return (
    <>
      <div>
        <AppBar />
      </div>

      <div id="ticker-container">
        {peasantNames.map((name, index) => {
          const { totalBeersDue, totalBeersOwed } = calculateTotalBeers(
            name,
            "peasant",
          );
          return (
            <div className="ticker-item" key={index}>
              <span className="username">{name}</span>
              <span className="symbol">
                {totalBeersDue < totalBeersOwed ? (
                  <span className="upward-triangle"></span>
                ) : totalBeersDue > totalBeersOwed ? (
                  <span className="downward-triangle"></span>
                ) : (
                  <span className="circle"></span>
                )}
              </span>
            </div>
          );
        })}
        {patronNames.map((name, index) => {
          const { totalBeersDue, totalBeersOwed } = calculateTotalBeers(
            name,
            "patron",
          );
          return (
            <div className="ticker-item" key={index}>
              <span className="username">{name}</span>
              <span className="symbol">
                {totalBeersDue < totalBeersOwed ? (
                  <span className="upward-triangle"></span>
                ) : totalBeersDue > totalBeersOwed ? (
                  <span className="downward-triangle"></span>
                ) : (
                  <span className="circle"></span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="plead-button">
        <Link to="/req">
          <button type="submit">I AM TOO SOBER</button>
        </Link>
      </div>

      <div className="beertable" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Point of Favour</th>
              <th>Peasant</th>
              <th>Patron</th>
              <th>Beers Promised</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 1000).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.date}</td>
                <td>{row.pointOfFavour}</td>
                <td>{row.peasant}</td>
                <td>{row.patron}</td>
                <td>{row.beersPromised}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="logout-button">
        <button style={{ color: "#fff" }} onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Tracker;
