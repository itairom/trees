import { carService } from '../services/carService';

// Dispatchers
const _removeCar = (carId) => ({ type: 'REMOVE_CAR', carId });
const _setCars = (cars) => ({ type: 'SET_CARS', cars });
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _toggleDark = () => ({ type: 'TOGGLE_DARK' });
const _setCurrentSurvey = (survey) => ({ type: 'SET_CURRENT_SURVEY', survey });

// THUNK
export function loadCars(filterBy) {
    return async (dispatch) => {
        const cars = await carService.query(filterBy);
        dispatch(_setCars(cars));
    }
}
export function removeCar(carId) {
    return async (dispatch) => {
        carService.remove(carId)
        dispatch(_removeCar(carId))
    }
}
export function setFilter(filterBy) {
    return async (dispatch) => dispatch(_setFilter(filterBy))
}
export function setCurrentSurvey(survey) {
    return async (dispatch) => dispatch(_setCurrentSurvey(survey))
}
export function toggleDark() {
    return (dispatch) => dispatch(_toggleDark())
}

export function saveCar(car) {
    return async (dispatch, getState) => {
        const type = car._id ? 'UPDATE_CAR' : 'ADD_CAR';
        const savedCar = await carService.save(car)
        dispatch({ type, car: savedCar })
    }
}
