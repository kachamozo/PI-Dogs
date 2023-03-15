import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";
import Swal from 'sweetalert2'


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");



    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value); //name toma el valor de e.target.value
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.length === 0) {
            return Swal.fire("Please input a name to start the search");
        } else {
            dispatch(getNameDogs(name));
            setName("");


        }
    }



    return (
        <div>
            <input
                type="text"
                placeholder="Search"
                value={name}
                onChange={handleInputChange}
            />
            <button type="submit" onClick={handleSubmit}>
                Search
            </button>
        </div>
    );
}