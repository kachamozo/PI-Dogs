import React from "react";
import { getDogById, clearDeatails } from "../actions/index";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../cssModule/Details.module.css'

export default function Detail(props) {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogById(id));
    }, [dispatch]);



    const detailsDog = useSelector((state) => state.details);
    console.log("estos son los detalles", detailsDog);


    // para limpiar el estado details cuando salimos a home
    function handleClick(e) {
        dispatch(clearDeatails())
    }

    return (
        <div>
            {detailsDog.length > 0 ? (
                <div key={detailsDog[0].id}>
                    <div >
                        <h1>{detailsDog[0].name}</h1>
                        <img src={
                            detailsDog[0].image ?
                                detailsDog[0].image :
                                "https://vidaconmascotas.com/wp-content/uploads/2019/09/cropped-Beagle-raza-de-perros-pequenos-950x500.jpg"
                        }
                            alt="img not found"
                            width="500px"
                            height="500px" />
                        <div>

                            <div>

                                <h3>Life span: </h3>
                                <p>Max: {detailsDog[0].lifeSpanMax}</p>
                                <p>Min: {detailsDog[0].lifeSpanMin}</p>

                            </div>
                            <div>
                                <div >
                                    <h3>Weight: </h3>
                                    <p>Min: {detailsDog[0].weightMin}</p>
                                    <p>Max: {detailsDog[0].weightMax}</p>
                                </div>
                            </div>
                            <div >

                                <div >
                                    <h3>Height: </h3>
                                    <p>Min: {detailsDog[0].heightMin}</p>
                                    <p>Max: {detailsDog[0].heightMax}</p>
                                </div>
                            </div>
                            <br />
                            <div >
                                <div >
                                    {
                                        <div>
                                            <h3>Temperament: </h3>
                                            <p>
                                                {detailsDog[0].createdInDb
                                                    ? detailsDog[0].temperaments.map((el) => el.name).join(', ')
                                                    : detailsDog[0].temperament}
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <Link to="/home">
                            <button onClick={handleClick} className={styles.btn}>Back</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );

}