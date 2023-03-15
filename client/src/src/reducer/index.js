import Swal from 'sweetalert2'

const initialState ={
    dogs:[],
    allDogs:[],
    temperaments:[],
    details: []
}

function rootReducer (state=initialState, action){
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs : action.payload,
                allDogs: action.payload
            }
            

        case 'GET_NAME_DOGS':
            if(action.payload.length > 0){

                return{
                    ...state,
                    dogs: action.payload,
                    
                }
            } else Swal.fire('The Dog not Found!!!!')

        case 'FILTER_CREATED':
            const allDogs = state.allDogs
            const filterCreated = action.payload === 'Created'? allDogs.filter((e)=>e.createdInDb): allDogs.filter((e)=>!e.createdInDb)
            return{
                ...state,
                dogs: action.payload === 'All'? allDogs: filterCreated
            }
        
        case "ORDER_BY_NAME":
            const order = action.payload === "asc"
            ? state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            : state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
                
            return {
                ...state,
                dogs: order,
            };
        
        case 'ORDER_BY_WEIGHT_MAX':
            const orderByWeightMax = action.payload === "minToMax"
            ? state.dogs.sort(function (a, b) {
                    if (parseInt(a.weightMax) > parseInt(b.weightMax)) {
                        return 1;
                    }
                    if (parseInt(b.weightMax) > parseInt(a.weightMax)) {
                        return -1;
                    }
                    return 0;
                })
            : state.dogs.sort(function (a, b) {
                    if (parseInt(a.weightMax) > parseInt(b.weightMax)) {
                        return -1;
                    }
                    if (parseInt(b.weightMax) > parseInt(a.weightMax)) {
                        return 1;
                    }
                    return 0;
                });

            return{
                ...state,
                dogs: orderByWeightMax
            }

        case 'ORDER_BY_WEIGHT_MIN':
            const orderByWeightMin = action.payload === "minToMax"
            ? state.dogs.sort(function (a, b) {
                    if (parseInt(a.weightMin) > parseInt(b.weightMin)) {
                        return 1;
                    }
                    if (parseInt(b.weightMin) > parseInt(a.weightMin)) {
                        return -1;
                    }
                    return 0;
                })
            : state.dogs.sort(function (a, b) {
                    if (parseInt(a.weightMin) > parseInt(b.weightMin)) {
                        return -1;
                    }
                    if (parseInt(b.weightMin) > parseInt(a.weightMin)) {
                        return 1;
                    }
                    return 0;
                });

            return{
                ...state,
                dogs: orderByWeightMin
            }

        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments: action.payload
            }
        
        case 'FILTER_BY_TEMPERAMENTS':
            const temps = state.allDogs
            const filterTempsApi = temps.filter((e)=> e.temperament?.split(', ').includes(action.payload))
            const filterTempsDb = temps.filter((e)=> e.temperaments?.find((n)=>n.name===action.payload))

            const filterByTemperaments = [...filterTempsApi, ...filterTempsDb]
            return{
                ...state,
                dogs: filterByTemperaments
            }

        case "POST_DOG":
            return {
                ...state,
            };
        
        case 'GET_DOG_BY_ID':
            return{
                ...state,
                details: action.payload
            }

        case 'CLEAR_DETAILS':
            return{
                ...state,
                details: []
            }
    
        default:
            return state
    }
}
export default rootReducer;












