import { GET_CATS, ADD_TO_CATS, CAT_CLICK, UPDATE_CAT } from "./actions"

const initialState = {
    cats: [],
    isLoading: true,
}
function catsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATS:
            return { ...state, cats: action.payload, isLoading: false };
        case ADD_TO_CATS:
            return { ...state, cats: [...state.cats, action.payload] };
        case UPDATE_CAT:
            const idx = state.cats.findIndex(obj => { return obj.docId === action.payload.docId });
            state.cats[idx] = action.payload
            return { ...state, cats: state.cats };
        case CAT_CLICK:
            return { ...state, cats: action.payload};
        default:
            return state;
    }
}
export default catsReducer