'use client'

import { TripsService } from "@/services/tripsService";
import Trips from "./components/trips/trips";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

export default function Home() {

  const [trips, setTrips] = useState('');

  const api = TripsService();

  useEffect(() => {
    api.getTrips().then(res => {
      setTrips(res.data)
    }).catch(error => {
      console.error(error)
    })
  }, []);

  return (
    <main className={styles.main}>
      <Trips trips={trips} />
    </main>
  );
}
