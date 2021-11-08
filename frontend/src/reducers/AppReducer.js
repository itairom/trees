import { userService } from '../services/userService'

const initialState = {
    workspace: [],
    // loggedInUser: userService.getLoggedinUser(),
    loggedInUser: {"username":"itairom"},
    onlineUsers: [],
    loginErr: null,
    currPopover: {
        elPos: null,
        name: '',
        props: null
    },
    isOverlayOpen: false,
}

export function AppReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user, loginErr: null }
        case 'SET_ONLINE_USERS':
            return { ...state, onlineUsers: [...action.onlineUsers] }
        case 'LOGIN_ERR':
            return { ...state, loginErr: action.err }
        case 'SET_POPOVER':
            return { ...state, currPopover: { name: action.popoverName, elPos: action.elPos, props: action.props }, isOverlayOpen: true }
        case 'CLOSE_POPOVER':
            return { ...state, currPopover: { name: '', elPos: null, props: null }, isOverlayOpen: false }
        default:
            return state
    }
}