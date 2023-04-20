import { Toast } from "native-base";
import Axios from "./_axios";

const appointments = [
    {
        id: 0,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        name: "Cherry Blossom",
        type: "Hair transplants",
        time: "8:30 AM",
        date: "Sun May 25 2021",
        status: "confirmed",
    },
    {
        id: 1,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        name: "Reserved Time",
        type: "Personal Work",
        time: "8:30 AM to 9:30 AM",
        date: "Mon May 24 2021",
        status: "",
    },
    {
        id: 2,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        name: "Sofia Jenner",
        type: "Hair transplants",
        time: "11:30 AM",
        date: "Mon May 24 2021",
        status: "completed",
    },
    {
        id: 3,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        name: "Chris Anthemum",
        type: "Plastic surgery",
        time: "11:30 AM",
        date: "Fri May 28 2021",
        status: "rescheduled",
    },
    {
        id: 4,
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
        name: "Zoya Khan",
        type: "Plastic surgery",
        time: "11:30 AM",
        date: "Mon May 24 2021",
        status: "cancelled",
    },
];

// ** Declare Auth API
export const login = (params, cb) => {
    Axios({
        endpoint: "auth/signin",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            console.log(data);
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
};

export const deletebook = (params, cb) => {
    Axios({
        endpoint: "shop/deletebook",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const changebook = (params, cb) => {
    Axios({
        endpoint: "shop/changebook",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const addfav = (params, cb) => {
    Axios({
        endpoint: "shop/addfav",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb({
                    title: "Favourite added.",
                    status: "success",
                });
            } else {
                cb({
                    title: "Favourite added already!",
                    status: "warning",
                });
            }
        },
    });
}

export const editacount = (params, cb) => {
    Axios({
        endpoint: "users/editacount",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const getFavData = (params, cb) => {
    Axios({
        endpoint: "shop/getFavData",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const emailCheck = (params, cb) => {
    Axios({
        endpoint: "users/emailCheck",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const createReview = (params, cb) => {
    Axios({
        endpoint: "shop/createReview",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const getReview = (params, cb) => {
    Axios({
        endpoint: "shop/getReview",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const updateBookStatus = (params, cb) => {
    Axios({
        endpoint: "shop/updateBookStatus",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
}

export const signup = (params, cb) => {
    Axios({
        endpoint: "users/signup",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
};

export const getAppointments = (params, cb) => {
    Axios({
        endpoint: "shop/getAppoints",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data);
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        },
    });
    const filterdData = appointments.filter(
        (item) => item.date === params.date
    );
    cb(filterdData);
};

export const getAppointmentDetail = (params, cb) => {
    const filterdData = appointments.find((item) => item.id === params.id);
    cb(filterdData);
};

export const book = (params, cb) => {
    Axios({
        endpoint: "shop/book",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data)
            } else {
                cb([])
            }
        }
    })
}


export const update_business = (params, cb) => {
    Axios({
        endpoint: "shop/update_shop",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data)
            } else {
                Toast.show({
                    title: "Something went wrong!",
                    status: "danger",
                });
            }
        }
    })
}

export const getBooks = (params, cb) => {
    Axios({
        endpoint: "shop/get_books",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data)
            } else {
                cb([])
            }
        }
    })
}

export const getShopList = (params, cb) => {
    Axios({
        endpoint: "shop/get_shops",
        method: "POST",
        params: params,
        callback: ({ data }) => {
            if (data) {
                cb(data)
            } else {
                cb([])
            }
        }
    })
}
