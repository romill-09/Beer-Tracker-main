import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "@firebase/firestore";
import "./css/ticker.css";

const BeerTicker = () => {
  const [tickerData, setTickerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "requests"));
        const data = querySnapshot.docs.map((doc) => doc.data());

        const nameBalanceMap = new Map();

        data.forEach((entry) => {
          const { peasant, patron, beersPromised } = entry;
          const beers = Number(beersPromised); // Ensure beersPromised is treated as a number

          if (!nameBalanceMap.has(peasant)) {
            nameBalanceMap.set(peasant, 0);
          }
          if (!nameBalanceMap.has(patron)) {
            nameBalanceMap.set(patron, 0);
          }

          nameBalanceMap.set(peasant, nameBalanceMap.get(peasant) - beers);
          nameBalanceMap.set(patron, nameBalanceMap.get(patron) + beers);
        });

        const tickerItems = Array.from(nameBalanceMap.entries()).map(
          ([name, balance]) => ({
            name,
            balance,
          }),
        );

        setTickerData(tickerItems);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., display a message to the user
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".ticker-container");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
        const scrollerInner = scroller.querySelector(".ticker");
        const scrollerContent = Array.from(scrollerInner.children);

        Array.from(scrollerContent).forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className="contain ticker-container" data-direction="left">
      <div className="ticker">
        {tickerData.map(({ name, balance }) => (
          <div key={name} className="ticker-item">
            <span>
              {name} {balance} beers
            </span>{" "}
            {balance > 0 ? (
              <span className="triangle-up">▲</span>
            ) : (
              <span className="triangle-down">▼</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeerTicker;
