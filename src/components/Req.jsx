import React, { useState, useEffect } from "react";
import "./css/req.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Req = () => {
  const [date, setDate] = useState("");
  const [pointOfFavour, setPointOfFavour] = useState("");
  const [peasant, setPeasant] = useState("");
  const [patron, setPatron] = useState("");
  const [beersPromised, setBeersPromised] = useState("");
  const [user, setUser] = useState(null);
  const history = useNavigate();

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
      history('/tracker')
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>PLEAD A FAVOUR!</h1>
        <div className="input-box" id="a">
          <input
            type="text"
            placeholder="Date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          />
        </div>

        <div className="input-box" id="d">
          <input
            type="text"
            placeholder="Patron"
            required
            value={patron}
            onChange={(e) => setPatron(e.target.value)}
          />
        </div>

        <div className="input-box" id="e">
          <input
            type="text"
            placeholder="Beers Promised"
            required
            value={beersPromised}
            onChange={(e) => setBeersPromised(e.target.value)}
          />
        </div>

        <button type="submit">PLEASE</button>
      </form>
    </div>
  );
};

export default Req;
