import React, { useEffect, useState } from "react"; //tb se puede importar de esta manera
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../actions/index";
import Swal from 'sweetalert2'
import styles from '../cssModule/CreateDog.module.css'

//validar el formulario
function validateForm(input) {
    let errors = {};

    // NAME
    if (!input.name) {
        errors.name = "You must enter a name";
    } else {
        errors.name = "";
    }

    // WEIGHTS
    if (!input.weightMin) {
        errors.weightMin = "Type a valid minimal weight number";
    } else {
        errors.weightMin = "";
    }
    if (!input.weightMax) {
        errors.weightMax = "Type a valid maxim weight number";
    } else {
        errors.weightMax = "";
    }
    // HEIGHTS
    if (!input.heightMin) {
        errors.heightMin = "Type a valid minimal height number";
    } else {
        errors.heightMin = "";
    }
    if (!input.heightMax) {
        errors.heightMax = "Type a valid maxim height number";
    } else {
        errors.heightMax = "";
    }
    return errors;
}


export default function CreateRecipe() {
    const dispatch = useDispatch();
    let listTemperaments = useSelector((state) => state.temperaments);
    console.log("esto es listDiets", listTemperaments);
    listTemperaments ?
        listTemperaments.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
            }
            return 0;
        })
        : listTemperaments.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
            }
            return 0;
        });

    const [input, setInput] = useState({
        name: "",
        weightMax: "",
        weightMin: "",
        heightMax: "",
        heightMin: "",
        lifeSpanMax: "",
        lifeSpanMin: "",
        image: "",
        temperament: [],
    });

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
        console.log(input);
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }

    // function handleCheck(e) {
    //     if (e.target.checked && !input.temperament.includes(e.target.value)) {
    //         setInput({
    //             ...input,
    //             temperament: [...input.temperament, e.target.value],
    //         });
    //     } else if (!e.target.checked) {
    //         setInput({
    //             ...input,
    //             temperament: input.temperament.filter((d) => d !== e.target.value),
    //         });
    //     }
    // }

    function handleDelete(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter((temp) => temp !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !errors.name &&
            !errors.weightMax &&
            !errors.weightMin &&
            !errors.heightMax &&
            !errors.heightMin
        ) {
            console.log(input)
            dispatch(postDog(input));
            Swal.fire("Congratulations you created a new dog!");
            setInput({
                name: "",
                weightMax: "",
                weightMin: "",
                heightMax: "",
                heightMin: "",
                lifeSpanMax: "",
                lifeSpanMin: "",
                image: "",
                temperament: [],
            });
        }
        else {
            return Swal.fire("Something went wrong. Please try again.");
        }

    }
    return (
        <div>
            <Link to="/home">
                <button>Back to Home</button>
            </Link>
            <h1>Create your Dog</h1>
            <h3>Los campos con * son obligatorios</h3>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>* name:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        required
                    />
                    <div>
                        <p >{errors.name}</p>
                    </div>
                </div>
                <div>
                    <label>* weightMax:</label>
                    <input
                        type="text"
                        name="weightMax"
                        value={input.weightMax}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        required
                    />
                    <div>
                        <p >{errors.weightMax}</p>
                    </div>
                </div>

                <div>
                    <label>* weightMin:</label>
                    <input
                        type="text"
                        name="weightMin"
                        value={input.weightMin}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        required
                    />
                    <div>
                        <p >{errors.weightMin}</p>
                    </div>
                </div>
                <div>
                    <label>* heightMax:</label>
                    <input
                        type="text"
                        name="heightMax"
                        value={input.heightMax}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        required
                    />
                    <div>
                        <p >{errors.heightMax}</p>
                    </div>
                </div>
                <div>
                    <label>* heightMin:</label>
                    <input
                        type="text"
                        name="heightMin"
                        value={input.heightMin}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                        required
                    />
                    <div>
                        <p >{errors.heightMin}</p>
                    </div>
                </div>
                <div>
                    <label>lifeSpanMax:</label>
                    <input
                        type="text"
                        name="lifeSpanMax"
                        value={input.lifeSpanMax}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>
                <div>
                    <label>lifeSpanMin:</label>
                    <input
                        type="text"
                        name="lifeSpanMin"
                        value={input.lifeSpanMin}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>

                <div>
                    <label>image Url:</label>
                    <input
                        type="textarea"
                        name="image"
                        value={input.image}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                </div>

                <select onChange={(e) => handleSelect(e)} >
                    <option disabled selected> Temperaments</option>
                    {listTemperaments?.map((e) => (
                        <option value={e.name} key={e.id}> {e.name} </option>
                    ))}

                </select >
                <>
                    <h4>You have selected that:</h4>
                    {input.temperament.map((el) => (
                        <div key={el}>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>x</button>
                        </div>
                    ))}
                </>

                {/* <div>
                    <label>Temperaments: </label>
                    <br />
                    {listTemperaments.map((d) => (
                        <label htmlFor={d.name} key={d.name}>
                            <input
                                type="checkbox"
                                name={d.name}
                                value={d.name}
                                onChange={(e) => handleCheck(e)}
                            />
                            {d.name}
                        </label>
                    ))}
                </div> */}
                <button type='submit'>Create Dog </button>
            </form>
        </div>
    );
}
