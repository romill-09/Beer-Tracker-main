import React, { useEffect, useState, useRef } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "@firebase/firestore";
import "./css/ticker.css";

const BeerTicker = () => {
  const [tickerData, setTickerData] = useState([]);
  const tickerRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const data = querySnapshot.docs.map((doc) => doc.data());

      const nameBalanceMap = new Map();

      data.forEach((entry) => {
        const { peasant, patron, beersPromised } = entry;

        if (!nameBalanceMap.has(peasant)) {
          nameBalanceMap.set(peasant, 0);
        }
        if (!nameBalanceMap.has(patron)) {
          nameBalanceMap.set(patron, 0);
        }

        nameBalanceMap.set(
          peasant,
          nameBalanceMap.get(peasant) - beersPromised,
        );
        nameBalanceMap.set(patron, nameBalanceMap.get(patron) + beersPromised);
      });

      const tickerItems = Array.from(nameBalanceMap.entries()).map(
        ([name, balance]) => ({
          name,
          balance,
        }),
      );

      setTickerData(tickerItems);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ticker = tickerRef.current;

    const scrollTicker = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth - ticker.clientWidth) {
        ticker.scrollLeft = 0;
      } else {
        ticker.scrollLeft += 1;
      }
    };

    const startScrolling = () => {
      stopScrolling(); // Ensure any existing interval is cleared
      scrollInterval.current = setInterval(scrollTicker, 30);
    };

    const stopScrolling = () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };

    startScrolling();

    ticker.addEventListener("mouseenter", stopScrolling);
    ticker.addEventListener("mouseleave", startScrolling);
    ticker.addEventListener("mousedown", stopScrolling);
    ticker.addEventListener("mouseup", startScrolling);

    return () => {
      stopScrolling();
      ticker.removeEventListener("mouseenter", stopScrolling);
      ticker.removeEventListener("mouseleave", startScrolling);
      ticker.removeEventListener("mousedown", stopScrolling);
      ticker.removeEventListener("mouseup", startScrolling);
    };
  }, []);

  return (
    <div className="ticker-container" ref={tickerRef}>
      <div className="ticker">
        {tickerData.map(({ name, balance }) => (
          <div key={name} className="ticker-item">
            <span>
              {name} ({balance} beers)
            </span>{" "}
            {/* Comment out this line to hide beer numbers */}
            {balance > 0 ? (
              <span className="triangle-up">▲</span>
            ) : balance < 0 ? (
              <span className="triangle-down">▼</span>
            ) : (
              <span className="circle">●</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeerTicker;
