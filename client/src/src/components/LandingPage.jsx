import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../cssModule/LandingPage.module.css'


export default function LandingPage() {
    return (
        <div className={styles.landing}>
            <h1 className={styles.wlc}>Welcome to Dogs</h1>
            <Link to='/home'>
                <input className={styles.btn} type="submit" value='Ingresar' />
                {/* <button>ingresar</button> */}
            </Link>
        </div>
    )
}