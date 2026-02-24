window.addEventListener("DOMContentLoaded",()=>{
    alert("You have been Sucessfully Logged out");
    window.localStorage.clear();
    setTimeout(()=>{window.location="/index.js"});
});