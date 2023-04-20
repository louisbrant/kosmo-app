import { REGISTER_SHOP, APPOINTMENTSDATA, PROVIDERSHOP } from "../../constants";

export const register_shop_store = (params) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_SHOP,
            payload: params,
        });
    }
};

export const appoint_set = (params) => {
    return (dispatch) => {
        dispatch({
            type: APPOINTMENTSDATA,
            payload: params,
        });
    }
};

export const shop_set = (params) => {
    return (dispatch) => {
        dispatch({
            type: PROVIDERSHOP,
            payload: params,
        });
    }
};
