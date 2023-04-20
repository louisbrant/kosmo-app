import { useToast } from "native-base"

export const DefaultHours = {
    Monday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Tuesday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Wednesday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Thursday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Friday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Saturday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
    Sunday: {
        status: false,
        from: "08:00",
        to: "18:00"
    },
}

const Toast = (title, status) => {
    const toast = useToast();
    toast.show({
        title,
        status,
        placement: "top",
        marginTop: '-50px',
    })
}