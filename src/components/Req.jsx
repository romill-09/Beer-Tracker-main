import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaCalendarAlt } from "react-icons/fa";
import "./css/req.css";

const Req = () => {
  const [date, setDate] = useState("");
  const [pointOfFavour, setPointOfFavour] = useState("");
  const [peasant, setPeasant] = useState("");
  const [patron, setPatron] = useState("");
  const [beersPromised, setBeersPromised] = useState("");
  const [user, setUser] = useState(null);
  const history = useNavigate();
  const dateInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        history("/login");
      }
    });

    return () => unsubscribe();
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "requests"), {
        date,
        pointOfFavour,
        peasant,
        patron,
        beersPromised,
      });
      console.log("Document written with ID: ", docRef.id);
      history("/tracker");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="nav-wrapper">
        <Link to={auth ? "/tracker" : "/"} className="left brand-logo">
          <img src={"BT.png"} alt="Logo" className="photo" />
        </Link>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>WHERE DID YOU MESS UP</h1>

          <div className="input-box" id="a" style={{ position: "relative" }}>
            <input
              type="date"
              placeholder="Date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              ref={dateInputRef}
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <FaCalendarAlt
              onClick={() => dateInputRef.current.showPicker()}
              style={{
                color: "rgb(160, 217, 239)",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                margin: "0px 10px",
              }}
            />
          </div>

          <div className="input-box" id="b">
            <input
              type="text"
              placeholder="Point of favour"
              required
              value={pointOfFavour}
              onChange={(e) => setPointOfFavour(e.target.value)}
            />
          </div>

          <div className="input-box" id="c">
            <input
              type="text"
              placeholder="Peasant"
              required
              value={peasant}
              onChange={(e) => setPeasant(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="input-box" id="d">
            <input
              type="text"
              placeholder="Patron"
              required
              value={patron}
              onChange={(e) => setPatron(e.target.value)}
              maxLength={20}
            />
          </div>

          <div className="input-box" id="e">
            <input
              type="number"
              placeholder="Beers Promised"
              required
              value={beersPromised}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  value === "" ||
                  (parseInt(value) >= 0 && parseInt(value) <= 99)
                ) {
                  setBeersPromised(value);
                }
              }}
              min={0}
              max={99}
            />
          </div>

          <button type="submit">PLEASE</button>
        </form>
      </div>
    </>
  );
};

export default Req;
