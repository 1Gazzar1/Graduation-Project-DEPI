import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { LinksContext } from "../../Context/LinksContext/LinksContext";

function Login() {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ message: "", type: "" });
    const { links, setLinks } = useContext(LinksContext); // ✅ استخدم context

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleLogin = (values) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const userFound = users.find(
            (u) => u.email === values.email && u.password === values.password,
        );

        if (userFound) {
            localStorage.setItem("user", JSON.stringify(userFound));
            setToast({ message: "Login successful!", type: "success" });

            // ✅ إضافة زر Logout للـ links لو مش موجود
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

            setTimeout(() => {
                navigate("/", { replace: true }); // redirect للـ Home بعد 1.5 ثانية
            }, 1500);
        } else {
            setToast({ message: "Email or password incorrect", type: "error" });
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login</h2>

                {/* Toast Message */}
                {toast.message && (
                    <div
                        className={`${styles.toast} ${
                            toast.type === "success"
                                ? styles.success
                                : styles.errorToast
                        }`}
                    >
                        {toast.message}
                    </div>
                )}

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={styles.inputField}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className={styles.error}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={styles.inputField}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className={styles.error}
                                />
                            </div>

                            <button type="submit" className={styles.loginBtn}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.switch}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
