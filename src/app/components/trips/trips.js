"use client";

import Trip from "../trip/trip";
import styles from "./trips.module.css";

function Trips({ trips }) {
  return (
    <div className={styles.ctTrips}>
      {trips === undefined ? (
        <h3 className={styles.txtError}>Loading destinations...</h3>
      ) : trips.length === 0 ? (
        <div className={styles.ctEmpty}>
          <h3 className={styles.txtError}>There are no destinations</h3>
        </div>
      ) : (
        trips.map((trip, index) => <Trip trip={trip} key={index} />)
      )}
    </div>
  );
}

export default Trips;
