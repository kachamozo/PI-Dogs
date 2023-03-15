import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getDogs,
	orderByName,
	filterCreated,
	orderByWeightMax,
	orderByWeightMin,
	getTemperaments,
	filterByTemperaments,
} from '../actions/index';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home() {
	//se utiliza la constante para despachar las acciones
	const dispatch = useDispatch();
	//con el hook useSelector nos traemos todo lo que esta el estado dogs del reducer
	const allDogs = useSelector((state) => state.dogs);
	const allTemperaments = useSelector((state) => state.temperaments);
	allTemperaments
		? allTemperaments.sort(function (a, b) {
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

				if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;

				return 0;
		  })
		: allTemperaments.sort(function (a, b) {
				if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;

				if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;

				return 0;
		  });
	console.log(allTemperaments);

	// definir estados locales para mi paginado
	const [currentPage, setCurrentPage] = useState(1); //estado de la pagina actual y un estado que setee la pagina actual
	const [dogsPerPage, setDogsPerPage] = useState(8); //define un estado de perros por paginas y el readme pide 8
	const indexLastDog = currentPage * dogsPerPage; //1 * 8 = 8    2*8=16
	const indexFirtsDog = indexLastDog - dogsPerPage; // 8 - 8 = 0  16-8=8
	const currentDogs = allDogs.slice(indexFirtsDog, indexLastDog); //slice(0,8)   slice(8,16)

	const paginado = function (pageNumber) {
		setCurrentPage(pageNumber);
	};

	//definir estados para ordenar ascendente y descendente
	const [order, setOrder] = useState('');

	useEffect(() => {
		dispatch(getDogs());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	function handleClick(e) {
		e.preventDefault();
		dispatch(getDogs());
		setCurrentPage(1);
	}

	function handleFilterCreated(e) {
		e.preventDefault();
		dispatch(filterCreated(e.target.value));
		setCurrentPage(1);
	}

	// funcion para ordenar ascedente o descendente
	function handleOrderByName(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrder(`Ordenado${e.target.value}`);
	}

	function handleOrderByWeightMax(e) {
		e.preventDefault();
		dispatch(orderByWeightMax(e.target.value));
		setCurrentPage(1);
		setOrder(e.target.value);
	}

	function handleOrderByWeightMin(e) {
		e.preventDefault();
		dispatch(orderByWeightMin(e.target.value));
		setCurrentPage(1);
		setOrder(e.target.value);
	}

	function handleFilterByTemperaments(e) {
		dispatch(filterByTemperaments(e.target.value));
		setCurrentPage(1);
	}

	return (
		<>
			<div>
				<Link to='/dog'> Created Dog</Link>
				<h1>DOGS LIST</h1>
				<button onClick={(e) => handleClick(e)}>Load All Dogs</button>
			</div>
			<div>
				<select defaultValue={'Value'} onChange={handleOrderByName}>
					<option value='Value' disabled>
						Order...By...Name
					</option>
					<option value='asc'>Ascendente</option>
					<option value='desc'>Descendente</option>
				</select>

				<select defaultValue={'Value'} onChange={handleFilterCreated}>
					<option value='Value' disabled>
						Filter Db-Api
					</option>
					<option value='All'>All</option>
					<option value='Created'>Created</option>
					<option value='Api'>Api</option>
				</select>

				<select defaultValue={'Value'} onChange={handleOrderByWeightMax}>
					<option value='Value' disabled>
						Order...By...weightMax
					</option>
					<option value='minToMax'>Peso ↑</option>
					<option value='maxToMin'>Peso ↓</option>
				</select>
				<select defaultValue={'Value'} onChange={handleOrderByWeightMin}>
					<option value='Value' disabled>
						Order...By...weightMin
					</option>
					<option value='minToMax'>Peso ↑</option>
					<option value='maxToMin'>Peso ↓</option>
				</select>
				<br />
				<select defaultValue={'Value'} onChange={handleFilterByTemperaments}>
					<option value='Value' disabled>
						Filter By-Temperaments
					</option>
					{allTemperaments?.map((e) => {
						return (
							<option value={e.name} key={e.id}>
								{e.name}
							</option>
						);
					})}
				</select>
			</div>
			<Paginado
				dogsPerPage={dogsPerPage}
				allDogs={allDogs.length}
				paginado={paginado}
			/>
			<SearchBar />
			<div>
				{currentDogs?.map((e) => {
					return (
						<Card
							name={e.name}
							image={e.image}
							temperaments={e.temperaments}
							temperament={e.temperament}
							weightMax={e.weightMax}
							weightMin={e.weightMin}
							id={e.id}
							key={e.id}
						/>
					);
				})}
			</div>
		</>
	);
}
