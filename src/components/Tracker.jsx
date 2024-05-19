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
import BeerTicker from "./BeerTicker";

const Tracker = () => {
  const { logout } = useAuth();
  const history = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const tableRef = useRef(null);
  const scrollInterval = useRef(null);

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

  return (
    <>
      <div>
        <AppBar />
      </div>

      <div>
        <BeerTicker />
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
