import { SESSION ,LOGOUT } from "../../constants";

export const session_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: SESSION,
            payload: params,
        });
};

export const destroy_session = () => {
    return (dispatch) =>
        dispatch({
            type: LOGOUT
        });
};