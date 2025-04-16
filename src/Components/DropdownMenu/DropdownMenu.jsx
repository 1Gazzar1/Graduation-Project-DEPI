import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.css";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
function DropdownMenu() {
	const [clicked, setClicked] = useState(false);
	const filmRef = useRef();
	const MotionLink = motion(Link);
	return (
		<>
			

			<motion.div
				onClick={() => setClicked(!clicked)}
				ref={filmRef}
				className={styles.container}
				initial={{
					y: "-90%",
				}}
				animate={clicked ? "dropdown" : "initial"}
				variants={{
					dropdown: {
						y: "-10%",
					},
				}}
				transition={{ type: "spring", stiffness: 200, damping: 15 }}
			>
				<nav className={styles.film}>
					<MotionLink
						to={"/"}
						whileHover={{
							scale: 1.1,
							rotate: "2.5deg",
						}}
						className={styles.link}
					>
						Home
					</MotionLink>
					<MotionLink
						to={"/favorites"}
						whileHover={{
							scale: 1.1,
							rotate: "-2.5deg",
						}}
						className={styles.link}
					>
						Favorites
					</MotionLink>
					<MotionLink
						to={"/credits"}
						whileHover={{
							scale: 1.1,
							rotate: "2.5deg",
						}}
						className={styles.link}
					>
						Credits
					</MotionLink>
				</nav>
			</motion.div>
		</>
	);
}

export default DropdownMenu;
