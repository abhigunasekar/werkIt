function validatePassword() {
    var x = document.forms["signUp"]["pass"].value;
    var y = document.forms["signUp"]["confirmPass"].value;
    if (x != y)) {
        alert("Passwords Do Not Match. Try Again!");
        return false;
    }
}