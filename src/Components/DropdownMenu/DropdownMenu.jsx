import { Link, useNavigate } from "react-router-dom";
import styles from "./DropdownMenu.module.css";
import { motion } from "framer-motion";
import { useState, useRef, useContext, useEffect } from "react";
import { LinksContext } from "../../Context/LinksContext/LinksContext";

function DropdownMenu() {
    const [clicked, setClicked] = useState(false);
    const filmRef = useRef();
    const MotionLink = motion.create(Link);
    const navigate = useNavigate();
    const { links, setLinks } = useContext(LinksContext);

    // ✅ عند mount، إذا فيه user، أضف زر Logout للـ links لو مش موجود
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setLinks((prev) => {
                const exists = prev.find((link) => link.label === "Logout");
                if (!exists) {
                    return [
                        ...prev,
                        {
                            to: "/login",
                            label: "Logout",
                            rotate: "0deg",
                            isButton: true,
                        },
                    ];
                }
                return prev;
            });
        }
    }, [setLinks]);

    const handleLogout = () => {
        // مسح user من localStorage
        localStorage.removeItem("user");

        // مسح Logout button من links
        setLinks((prev) => prev.filter((link) => link.label !== "Logout"));

        // إعادة توجيه للـ login
        navigate("/login", { replace: true });
    };

    return (
        <motion.div
            onClick={() => setClicked(!clicked)}
            ref={filmRef}
            className={styles.container}
            initial={{ y: "-90%" }}
            animate={clicked ? "dropdown" : "initial"}
            variants={{ dropdown: { y: "-10%" } }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
            <nav className={styles.film}>
                {links.map((item, index) =>
                    item.isButton ? (
                        <button
                            style={{ border: "none" }}
                            key={index}
                            onClick={handleLogout}
                            className={styles.link}
                        >
                            {item.label}
                        </button>
                    ) : (
                        <MotionLink
                            key={index}
                            to={item.to}
                            whileHover={{ scale: 1.1, rotate: item.rotate }}
                            className={styles.link}
                        >
                            {item.label}
                        </MotionLink>
                    ),
                )}
            </nav>
        </motion.div>
    );
}

export default DropdownMenu;
