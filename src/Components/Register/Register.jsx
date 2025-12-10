import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.css";

function Register() {
    const navigate = useNavigate();
    const [toast, setToast] = useState({ message: "", type: "" });

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(4, "Too Short!").required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
    });

    const handleRegister = (values) => {
        let users = JSON.parse(localStorage.getItem("users") || "[]");

        const exists = users.find((u) => u.email === values.email);
        if (exists) {
            setToast({ message: "Email already registered", type: "error" });
            return;
        }

        users.push({ email: values.email, password: values.password });
        localStorage.setItem("users", JSON.stringify(users));

        setToast({
            message: "Registration successful! Please login",
            type: "success",
        });

        setTimeout(() => {
            navigate("/login");
        }, 1500); // بعد 1.5 ثانية يتحول للـ login
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Register</h2>

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
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleRegister}
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

                            <div className={styles.inputGroup}>
                                <label>Confirm Password</label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className={styles.inputField}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className={styles.error}
                                />
                            </div>

                            <button
                                type="submit"
                                className={`${styles.loginBtn} ${styles.colorBtn}`}
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.switch}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
