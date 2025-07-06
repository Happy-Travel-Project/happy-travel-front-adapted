"use client";

import Trip from "../trip/trip";
import styles from "./trips.module.css";

function Trips({ trips }) {
  return (
    <div className={styles.ctTrips}>
      {trips === undefined ? (
        <h3 className={styles.txtError}>Cargando destinos...</h3>
      ) : trips.length === 0 ? (
        <div className={styles.ctEmpty}>
          <h3 className={styles.txtError}>No hay destinos</h3>
        </div>
      ) : (
        trips.map((trip, index) => <Trip trip={trip} key={index} />)
      )}
    </div>
  );
}

export default Trips;
