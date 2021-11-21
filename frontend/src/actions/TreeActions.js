import { treeService } from "../services/treeService";

// Dispatchers
const _setFilter = (filterBy) => ({ type: 'SET_FILTER', filterBy });
const _toggleDark = () => ({ type: 'TOGGLE_DARK' });
const _toggleIsTreePreviewShowen = () => ({ type: 'TOGGLE_IS_PREVIEW_TREE' });
const _setCurrentSurvey = (survey) => ({ type: 'SET_CURRENT_SURVEY', survey });
const _updateSurvey = (survey) => ({ type: 'UPDATE_SURVEY', survey });
const _querySurvey = (survey) => ({ type: 'QUERY_SURVEY', survey });

// THUNK

export function setFilter(filterBy) {
    return async (dispatch) => dispatch(_setFilter(filterBy))
}
export function setCurrentSurvey(survey) {
    return async (dispatch) => dispatch(_setCurrentSurvey(survey))
}
export function toggleDark() {
    return (dispatch) => dispatch(_toggleDark())
}
export function toggleIsTreePreviewShowen() {
    return (dispatch) => dispatch(_toggleIsTreePreviewShowen())
}
export function updateSurvey(survey, user) {
    return async (dispatch) => {
        treeService.save(survey, user)
        dispatch(_updateSurvey(survey))
    }
}
export function querySurvey(surveyName, user) {
    return async (dispatch) => {
        const survey = await treeService.querySurvey(surveyName, user)
        dispatch(_querySurvey(survey))
    }
}

// export function saveCar(car) {
//     return async (dispatch, getState) => {
//         const type = car._id ? 'UPDATE_CAR' : 'ADD_CAR';
//         const savedCar = await carService.save(car)
//         dispatch({ type, car: savedCar })
//     }
// }
