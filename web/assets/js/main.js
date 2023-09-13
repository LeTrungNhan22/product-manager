// handle click navbar li Đăng ký
const registerForm = document.querySelector("#regiter-form");
const loginForm = document.querySelector("#login-form");
const modal = document.querySelector(".modal");
const registerElement = document.querySelector(".js-register");
const loginElement = document.querySelector(".js-login");
const backBtn = document.querySelectorAll(".auth-form__control-back-btn");
const switchRegisterBtn = document.querySelectorAll(
    ".js-switch-register"
);
const switchLoginBtn = document.querySelectorAll(".js-switch-login");

registerElement.onclick = () => {
    modal.style.display = "flex";
    registerForm.style.display = "block";
    loginForm.style.display = "none";
};
loginElement.onclick = () => {
    modal.style.display = "flex";
    registerForm.style.display = "none";
    loginForm.style.display = "block";
};

backBtn.forEach((btn) => {
    btn.onclick = () => {
        modal.style.display = "none";
    };
});

switchRegisterBtn.forEach((btn) => {
    btn.onclick = () => {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
    };
});

switchLoginBtn.forEach((btn) => {
    btn.onclick = () => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    };
});

// handle category click
const cateItems = document.querySelectorAll(".category-item");
cateItems.forEach((item) => {
    item.onclick = () => {
        cateItems.forEach((item) => {
            item.classList.remove("category-item--active");
        });
        item.classList.add("category-item--active");
    };
});
//