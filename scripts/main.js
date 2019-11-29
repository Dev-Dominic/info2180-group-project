

function validatePassword(){
    var pass = document.getElementById("pword")
    var strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
   
    if (strongPass.test(pass) == false){
    pass.setCustomValidity("Password should be at least 8 characters and include 1 digit and uppercase")
    }
}