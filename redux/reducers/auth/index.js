import { SESSION, LOGOUT } from "../../constants";
import produce from 'immer'

const initialState = {
    isSession: false,
    session: {
        roles: "customer"
    },
    token: ''
};

const Auth = (
    state = initialState,
    action
) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case SESSION: {
                draft.isSession = true;
                draft.session = action.payload.user;
                draft.token = action.payload.token;
                return;
            }
            case LOGOUT: {
                return {
                    isSession: false
                }
            }
            default: {
                return { ...state };
            }
        }
    })
};
export default Auth;
