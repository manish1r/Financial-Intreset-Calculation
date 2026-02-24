import {Link} from "react-router-dom";
export default function Index(){
    console.log(localStorage);
    if(localStorage.length!==0){
        return (
            window.location.replace("/home")
        );
    }
    else return (
        <div className="center">
        <div className="container">
            <h2>Welcome to Quick-Hisab</h2><br/><br/><br/>
            <div className="row">
                <Link to="/login"><button>Login</button></Link><br/>
                <Link to="/register"><button>Register</button></Link>
            </div>
        </div>
        </div>
    );
}