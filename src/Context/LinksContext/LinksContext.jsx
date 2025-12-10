// src/Context/LinksContext/LinksContext.jsx
import { createContext, useState } from "react";

export const LinksContext = createContext();

export function LinksProvider({ children }) {
    // الـ links اللي هنعرضها في Dropdown أو أي مكان
    const [links, setLinks] = useState([
        { to: "/", label: "Home", rotate: "-2.5deg", isButton: false },
        { to: "/library", label: "Library", rotate: "2.5deg", isButton: false },
        {
            to: "/profile",
            label: "Profile",
            rotate: "-2.5deg",
            isButton: false,
        },
    ]);

    return (
        <LinksContext.Provider value={{ links, setLinks }}>
            {children}
        </LinksContext.Provider>
    );
}
