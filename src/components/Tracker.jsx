/* global jQuery */
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
import BeerTicker from "./BeerTicker";

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

  useEffect(() => {
    // Define the jQuery plugin
    jQuery.fn.extend({
      pic_scroll: function () {
        return this.each(function () {
          var _this = jQuery(this);
          var ul = _this.find("table");
          var li = ul.find("tbody tr");
          var w = li.length * li.outerHeight();
          li.clone().prependTo(ul);
          var i = 1,
            l;
          _this.hover(
            function () {
              i = 0;
            },
            function () {
              i = 1;
            },
          );
          function autoScroll() {
            l = _this.scrollTop();
            if (l >= w) {
              _this.scrollTop(0);
            } else {
              _this.scrollTop(l + i);
            }
          }
          var scrolling = setInterval(autoScroll, 50);
        });
      },
    });

    // Call pic_scroll on .beertable after the component mounts
    jQuery(function () {
      jQuery(".beertable").pic_scroll();
    });
  }, []); // Empty dependency array to ensure it runs only once after mount

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

      <div className="beertable contain">
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
