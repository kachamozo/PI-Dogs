import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../cssModule/Card.module.css'

export default function Card({
    name,
    image,
    temperament,
    temperaments,
    weightMax,
    weightMin,
    id,
}) {
    return (
        <div>
            <div>
                <h2>
                    <Link to={'/dogs/' + id}>{name}</Link>
                </h2>

                <img
                    src={
                        image
                            ? image
                            : 'https://lemagduchien.ouest-france.fr/images/dossiers/2018-12/vieux-chien-154437.jpg'
                    }
                    alt='img not found'
                    width='350px'
                    height='250px'
                />

                <h3>Temperaments</h3>
                <div>
                    {typeof id === 'string' ? (
                        temperaments ? (
                            temperaments.map((e, i) => (
                                <li key={i}>{e.name}</li>
                            ))
                        ) : (
                            <h4>without temperaments</h4>
                        )
                    ) : temperament ? (
                        temperament
                            .split(', ')
                            .map((e, i) => <li key={i}>{e}</li>)
                    ) : (
                        <h4>without temperaments</h4>
                    )}

                    {/* {temperament?.split(', ').map((e) => (
                        <li>{e}</li>
                     ))}
                     {temperaments?.map((e) => (
                         <li>{e.name}</li>
                     ))} */}
                </div>

                <div>
                    <h4>weightMax: {weightMax}</h4>
                    <h4>weightMin: {weightMin}</h4>
                </div>
            </div>
        </div>
    )
}
