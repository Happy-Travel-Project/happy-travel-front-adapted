'use client'

import React, { useState } from "react"
import styles from './page.module.css';
import { AuthService } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

const initialSignin = {
    username: '',
    email: '',
    password: ''
};

export default function Page() {
    const [signinData, setSigninData] = useState(initialSignin);
    const [error, setError] = useState("");

    const router = useRouter();
    const api = AuthService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.postRegister(signinData);
            router.push("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration error");
        }
    };

    const handleInput = (e) => {
        e.persist();
        setSigninData({
            ...signinData,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        setSigninData(initialSignin);
        setError("");
    };


    return (
        <div className={styles.ctPage}>
            <div className={styles.ctForm}>
                <form onSubmit={handleSubmit} className={styles.formLogin}>
                    <h3 className={styles.txtTitle}>User Registration</h3>
                    <hr />

                    <label htmlFor="username" className={styles.lbLogin}>
                        Name
                        <input
                            type="username"
                            name="username"
                            id="username"
                            placeholder="Name..."
                            value={signinData.username}
                            onChange={handleInput}
                            className={styles.inptLogin} />
                    </label>

                    <label htmlFor="email" className={styles.lbLogin}>
                        E-mail
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com"
                            value={signinData.email}
                            onChange={handleInput}
                            className={styles.inptLogin} />
                    </label>

                    <label htmlFor="password" className={styles.lbLogin}>
                        Password
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password..."
                            value={signinData.password}
                            onChange={handleInput}
                            className={styles.inptLogin} />
                    </label>

                    <span className={styles.sLogin}>{error}</span>

                    <div className={styles.ctButtons}>
                        <button type="submit" className={`${styles.btLogin} ${styles.btAccept}`}>Accept</button>
                        <button
                            type="button"
                            onClick={() => {
                                setSigninData(initialSignin);
                                setError("");
                            }}
                            className={`${styles.btLogin} ${styles.btCancel}`}
                        >
                            Cancel
                        </button>
                    </div>
                    <p className={styles.txtSignIn}>Already have an account? Log in <span><Link href={'/login'}>here</Link></span></p>
                </form>
            </div>
        </div>
    )
}