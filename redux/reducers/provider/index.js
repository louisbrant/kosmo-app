import { REGISTER_SHOP, APPOINTMENTSDATA , PROVIDERSHOP} from "../../constants";

const Provider = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_SHOP: {
            return {
                ...state,
                shop: {
                    ...state.shop,
                    ...action.payload,
                },
            };
        }
        case APPOINTMENTSDATA: {
            return {
                ...state,
                apdata: action.payload
            };
        }
        case PROVIDERSHOP: {
            return {
                ...state,
                pshop: action.payload
            };
        }
        default: {
            return { ...state };
        }
    }
};
export default Provider;
