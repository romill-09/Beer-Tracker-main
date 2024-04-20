import React, { useEffect, useState } from "react";
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

  return (
    <>
      <div>
        <AppBar />
      </div>

      <div className="plead-button">
        <Link to="/req">
          <button type="submit">PLEAD A FAVOUR</button>
        </Link>
      </div>

      <div className="table-container">
        <div className="beertable">
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
              {data.map((row, rowIndex) => (
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
