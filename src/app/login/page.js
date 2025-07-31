'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react"
import styles from './page.module.css';
import { AuthService } from "@/services/authService";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";

const initialLogin = {
    username: '',
    password: ''
};

export default function Page() {
    const [loginData, setLoginData] = useState(initialLogin);
    const [error, setError] = useState("");

    const router = useRouter();
    const api = AuthService();
    const { login } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.postLogin(loginData);
            const token = response.data.token;
            login(token);
            router.push("/auth");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Authentication error");
        }
    };

    const handleInput = (e) => {
        e.persist();
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        setLoginData(initialLogin);
        setError("");
    };


    return (
        <div className={styles.ctPage}>
            <div className={styles.ctForm}>
                <form onSubmit={handleSubmit} className={styles.formLogin}>
                    <h3 className={styles.txtTitle}>User Login</h3>
                    <hr />
                    <label htmlFor="username" className={styles.lbLogin}>
                        User Name
                        <input
                            type="username"
                            name="username"
                            id="username"
                            placeholder="Your Username"
                            value={loginData.username}
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
                            value={loginData.password}
                            onChange={handleInput}
                            className={styles.inptLogin} />
                    </label>

                    <span className={styles.sLogin}>{error}</span>

                    <div className={styles.ctButtons}>
                        <button type="submit" className={`${styles.btLogin} ${styles.btAccept}`}>Accept</button>
                        <button
                            type="button"
                            onClick={() => {
                                setLoginData(initialLogin);
                                setError("");
                            }}
                            className={`${styles.btLogin} ${styles.btCancel}`}
                        >
                            Cancel
                        </button>
                    </div>
                    <p className={styles.txtSignIn}>Don't have an account yet? Sign up <span><Link href={'/signin'}>here</Link></span></p>
                </form>
            </div>
        </div>
    )
}