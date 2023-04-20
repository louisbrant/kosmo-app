import axios from "axios";
import { Toast } from "native-base";
import { ServerURL } from "../constants";
// ** Declare Custome Axios
const request = async ({ endpoint, method, params, callback }) => {
    const property = {
        method: method,
        url: `${ServerURL}api/${endpoint}`,
        // url: `https://kozmo.ibluday.com/api/${endpoint}`,
        data: params,
    };
    try {
        const response = await axios(property);
        callback(response);
    } catch (e) {
        Toast.show({
            text: e.toString(),
            buttonText: "Okay",
            type: "danger",
        });
    }
};
export default request;