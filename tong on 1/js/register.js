let user = JSON.parse(localStorage.getItem("users")) || [];

function register(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // username
    if (username.length === 0) {
        showErrorName("tên không được để trống!");
        return;
    }

    if (username.length < 3) {
        showErrorName("tên phải nhiều hơn 2 ký tự!");
        return;
    }

    document.querySelector(".error-name").style.display = "none";

    // email
    if (!validateEmail(email)) {
        showErrorEmail("email không hợp lệ!");
        return;
    }

    for (let i = 0; i < user.length; i++) {
        if (user[i].email === email) {
            showErrorEmail("email đã tồn tại!");
            return;
        }
    }

    document.querySelector(".error-email").style.display = "none";

    // password
    if (password.length < 8) {
        showErrorPassword("mật khẩu phải ít nhất 8 ký tự!");
        return;
    }

    if (password !== confirmPassword) {
        showErrorPassword("mật khẩu không trùng!");
        return;
    }

    document.querySelector(".error-password").style.display = "none";

    // lưu user
    let newUser = {
        id: Math.floor(Math.random() * 99999) + new Date().getMilliseconds(),
        name: username,
        email: email,
        password: password
    };

    user.push(newUser);
    localStorage.setItem("users", JSON.stringify(user));

    document.location.href = "./login.html";
}

// error functions
function showErrorName(msg) {
    let error = document.querySelector(".error-name");
    error.style.display = "block";
    error.textContent = msg;
}

function showErrorEmail(msg) {
    let error = document.querySelector(".error-email");
    error.style.display = "block";
    error.textContent = msg;
}

function showErrorPassword(msg) {
    let error = document.querySelector(".error-password");
    error.style.display = "block";
    error.textContent = msg;
}

// validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}