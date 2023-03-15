import axios from 'axios';
import Swal from 'sweetalert2';

export function getDogs() {
	return async function (dispatch) {
		const json = await axios.get('/dogs');
		return dispatch({
			type: 'GET_DOGS',
			payload: json.data,
		});
	};
}

// al payload se le puede nombrar de cualquier manera. Es como un filter de name
export function getNameDogs(name) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`/dogs?name=${name}`);
			return dispatch({
				type: 'GET_NAME_DOGS',
				payload: json.data,
			});
		} catch (error) {
			Swal.fire(
				'El Nombre ingresado no existe en la base de datos, prueba otro o agrega uno nuevo'
			);
			console.log(error);
		}
	};
}

export function filterCreated(payload) {
	return {
		type: 'FILTER_CREATED',
		payload,
	};
}

export function orderByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload,
	};
}

export function orderByWeightMax(payload) {
	return {
		type: 'ORDER_BY_WEIGHT_MAX',
		payload,
	};
}

export function orderByWeightMin(payload) {
	return {
		type: 'ORDER_BY_WEIGHT_MIN',
		payload,
	};
}

export function getTemperaments() {
	return async function (dispatch) {
		const json = await axios.get('/temperament');
		return dispatch({
			type: 'GET_TEMPERAMENTS',
			payload: json.data,
		});
	};
}

export function filterByTemperaments(payload) {
	return {
		type: 'FILTER_BY_TEMPERAMENTS',
		payload,
	};
}

export function postDog(payload) {
	return async function (dispatch) {
		var json = await axios.post(`/dog`, payload);
		return json;
	};
}

export function getDogById(id) {
	return async function (dispatch) {
		var json = await axios.get(`/dogs/${id}`);
		return dispatch({
			type: 'GET_DOG_BY_ID',
			payload: json.data,
		});
	};
}

export function clearDeatails() {
	return {
		type: 'CLEAR_DETAILS',
	};
}

//con fetch('..') la diferencia es como devuelve la data con fetch se usa promesas .then y axios te devuelve la respuesta en un data
