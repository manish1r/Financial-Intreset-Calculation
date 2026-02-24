import {Link} from "react-router-dom";
function logout(){
    alert("You have been Sucessfully Logged out");
    window.localStorage.clear();
    setTimeout(()=>{window.location="/"});
}
export default function Home(){
    return (
        <div className="center">
        <div className="container">
            <h2>Welcome to Quick-Hisab</h2><br/><br/><br/>
            <div className="row">
                <Link to="/customer"><button>Customer</button></Link>
                <Link to="/katha"><button>Katha</button></Link>
                <Link to="/saved"><button>Saved</button></Link>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
        </div>
    );
}