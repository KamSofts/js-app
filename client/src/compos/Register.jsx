import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import './Auth.css'; 

export default function Register() {
    const [mail, setMail] = useState("");
    const [pwd, setPassword] = useState("");
    const [conf, setConfirm] = useState("");
    const [exception, setException] = useState("");

    // image
    const [img, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // NEW: State for the preview URL
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const registerClicked = async (evt) => {
        evt.preventDefault();
        setException("");

        if (pwd !== conf) {
            setException("Passwords do not match!");
            return; // Stop execution
        }
        // if (pwd.length < 6) {
        //     setException("Password must be at least 6 characters long.");
        //     return;
        // }

        const data = new FormData();
        data.append("mail", mail);
        data.append("pwd", pwd);
        if (img) data.append("img", img);

        try {
            await api.post("/auth/register", data);
            navigate("/login");
        } catch (error) {
            const errMsg = error.response?.data?.message || "Registration failed";
            setException(errMsg);
        }
    }

    // Effect to create/clean up the preview URL
    useEffect(() => {
        if (!img) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(img);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [img]);

    // THE MAGIC CLEAR FUNCTION
    const clearImage = () => {
        setImage(null);
        // This clears the filename text next to the "Choose File" button
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    return (
        <div className="register-container">
            <div className="register-card">
                <h3>Create Account</h3>

                {/* PROFILE PHOTO SECTION */}
                <div className="avatar-section">
                    <div className="avatar-wrapper"
                        onClick={() => fileInputRef.current.click()}
                        title="Click to upload photo">
                        {preview ? (<img src={preview} alt="Preview" className="avatar-img" />)
                            : (<div className="avatar-placeholder">Add Photo</div>)}
                    </div>
                    {preview && (
                        <button type="button" onClick={clearImage} className="remove-btn">
                            Remove Photo
                        </button>
                    )}
                </div>

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
                    <input
                        type="password" placeholder="Confirm Password"
                        value={conf} onChange={(e) => setConfirm(e.target.value)}
                        className="form-input"
                    />

                    {/* HIDDEN FILE INPUT */}
                    <input
                        type="file" accept="image/*" ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                </div>

                <button onClick={registerClicked} className="submit-button">
                    Register
                </button>

                <div className="footer-link">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};