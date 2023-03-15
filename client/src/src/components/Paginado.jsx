import React from 'react';
import styles from '../cssModule/Paginado.module.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers = [] //[1,2,3,4,5...]

    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumbers.push(i + 1)
    }
    return (
        <>
            <nav>
                <ul className={styles.ul}>
                    {pageNumbers?.map((number) => {
                        return (
                            <li key={number}>
                                <a
                                    className={styles.container}
                                    onClick={() => paginado(number)}
                                >
                                    {number}{" "}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </>
    );
}
