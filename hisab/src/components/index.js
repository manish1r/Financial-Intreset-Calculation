import { Link } from "react-router-dom";
export default function Index() {
    console.log(localStorage);
    if (localStorage.length !== 0) {
        return (
            window.location.replace("/home")
        );
    }
    else return (
        <div className="center">
            <div className="container landing-container">
                <h2>Welcome to Quick-Hisab</h2>

                <div className="nav-buttons">
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}