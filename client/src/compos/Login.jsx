import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Auth.css';
import { useAccess } from "../utils/AccessContext";
// import { AccessContext } from "../utils/AccessContext";

export default function Login() {
    const [mail, setMail] = useState("");
    const [pwd, setPassword] = useState("");
    const [exception, setException] = useState("");
    // const { user, login, fetched } = useContext(AccessContext);
    const { login, fetched } = useAccess();

    const navigate = useNavigate();

    const loginClicked = async (evt) => {
        evt.preventDefault();
        setException("");

        const isOk = await login({ mail, pwd });
        if (isOk) {
            navigate("/mdi/dashboard");
        } else {
            setException("Login failed! Please check your email/password.");
        }
    }

    if (!fetched) {
        return <div>Please wait... Fetching user details...!</div>
    }

    return (
        <div className="register-container">
            <div className="register-card">
                <h3>Login</h3>

                {/* ERROR MESSAGE */}
                {exception && <p className="error-text">{exception}</p>}

                {/* INPUTS */}
                <div className="form-group">
                    <input
                        type="email" placeholder="Email Address"
                        value={mail} onChange={(e) => setMail(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="password" placeholder="Password"
                        value={pwd} onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                    />
                </div>

                <button onClick={loginClicked} className="submit-button">
                    Login
                </button>

                <div className="footer-link">
                    <span>Create an Account : </span>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};