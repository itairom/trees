
const initialState = {
    filterBy: null,
    isDark: false,
    currentSurvey:null,
    isTreePreviewShowen:false,
    survey:{}
}

export default function TreeReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_SURVEY':
            return {
                ...state,
                survey: action.survey
            }
        case 'QUERY_SURVEY':
            return {
                ...state,
                survey: action.survey
            }
        case 'SET_CURRENT_SURVEY':
            return {
                ...state,
                currentSurvey: action.survey
            }
        case 'TOGGLE_DARK':
            console.log('toggle');
            return {
                ...state,
                isDark: !state.isDark
            }
        case 'TOGGLE_IS_PREVIEW_TREE':
            return {
                ...state,
                isTreePreviewShowen: !state.isTreePreviewShowen
            }

        default:
            return state;
    }
}