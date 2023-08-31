import { createContext } from "react";

const UserContext = createContext({
    user: {
        name: "Dummy 01",
        email: "dummy@mail.com"
    }
});

export default UserContext;