/* =====================================================
   1. GET ELEMENTS
===================================================== */

const loginCard = document.getElementById("loginCard");

const showLogin = document.getElementById("showLogin");

const showSignup = document.getElementById("showSignup");

const signupBtn = document.getElementById("signupBtn");

const loginBtn = document.getElementById("loginBtn");


/* =====================================================
   2. SIGN UP -> LOGIN FLIP
===================================================== */

if (showLogin) {

    showLogin.addEventListener("click", function(event) {

        event.preventDefault();

        loginCard.classList.add("flipped");

    });

}


if (showSignup) {

    showSignup.addEventListener("click", function(event) {

        event.preventDefault();

        loginCard.classList.remove("flipped");

    });

}


/* =====================================================
   3. EMAIL VALIDATION
===================================================== */

function validEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =====================================================
   4. PASSWORD VALIDATION
===================================================== */

function validPassword(password) {

    /*
       Password must have:
       - At least 6 characters
    */

    return password.length >= 6;

}


/* =====================================================
   5. GET USERS FROM LOCAL STORAGE
===================================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("users")
    ) || [];

}


/* =====================================================
   6. SAVE USERS TO LOCAL STORAGE
===================================================== */

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


/* =====================================================
   7. SIGN UP
===================================================== */

if (signupBtn) {

    signupBtn.addEventListener("click", function () {

        /* Get input values */

        const name =
            document.getElementById("signupName")
                ?.value.trim();

        const email =
            document.getElementById("signupEmail")
                ?.value.trim();

        const password =
            document.getElementById("signupPassword")
                ?.value;

        const confirmPassword =
            document.getElementById("signupConfirmPassword")
                ?.value;


        /* =============================
           NAME CHECK
        ============================= */

        if (!name) {

            alert("Please enter your name");

            return;

        }


        /* =============================
           EMAIL CHECK
        ============================= */

        if (!validEmail(email)) {

            alert("Please enter a valid email address");

            return;

        }


        /* =============================
           PASSWORD CHECK
        ============================= */

        if (!validPassword(password)) {

            alert(
                "Password must contain at least 6 characters"
            );

            return;

        }


        /* CONFIRM PASSWORD */

        if (password !== confirmPassword) {

            alert("Passwords do not match");

            return;

        }


        /* GET EXISTING USERS*/

        const users = getUsers();


        /* =============================
           CHECK DUPLICATE EMAIL
        ============================= */

        const existingUser = users.find(
            function (user) {

                return user.email.toLowerCase()
                    === email.toLowerCase();

            }
        );


        if (existingUser) {

            alert(
                "This email is already registered. Please login."
            );

            return;

        }


        /* =============================
           CREATE USER
           
           ONLY LOGIN/SIGNUP DATA
        ============================= */

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password

        };


        /* =============================
           ADD USER
        ============================= */

        users.push(newUser);


        /* =============================
           SAVE USER
        ============================= */

        saveUsers(users);


        /* =============================
           SUCCESS
        ============================= */

        alert(
            "Registration successful! Please login."
        );


        /* =============================
           CLEAR FORM
        ============================= */

        const signupForm =
            document.getElementById("signupForm");

        if (signupForm) {

            signupForm.reset();

        }


        /* =============================
           FLIP TO LOGIN
        ============================= */

        

    });

}


/* =====================================================
   8. LOGIN
===================================================== */

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        /* Get values */

        const email =
            document.getElementById("loginEmail")
                ?.value.trim();

        const password =
            document.getElementById("loginPassword")
                ?.value;


        /* =============================
           EMPTY FIELD CHECK
        ============================= */

        if (!email || !password) {

            alert(
                "Please enter email and password"
            );

            return;

        }


        /* =============================
           EMAIL FORMAT
        ============================= */

        if (!validEmail(email)) {

            alert(
                "Please enter a valid email address"
            );

            return;

        }


        /* =============================
           GET USERS
        ============================= */

        const users = getUsers();


        /* =============================
           FIND USER
        ============================= */

        const user = users.find(
            function (user) {

                return user.email.toLowerCase()
                    === email.toLowerCase();

            }
        );


        /* =============================
           EMAIL NOT FOUND
        ============================= */

        if (!user) {

            alert(
                "Email is not registered. Please sign up first."
            );

            return;

        }


        /* =============================
           PASSWORD CHECK
        ============================= */

        if (user.password !== password) {

            alert("Incorrect password");

            return;

        }


        /* =============================
           SAVE LOGGED IN USER
        ============================= */

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        /* =============================
           LOGIN SUCCESS
        ============================= */

        alert("Login successful!");


        /* =============================
           GO TO DASHBOARD
        ============================= */
        if (selectedRole === "Donor") {

            window.location.href = "../hospital-donor/donor-requests.html";

        }
        else if (selectedRole === "Patient") {

            window.location.href = "../patient/patientdashboard.html";

        }
        else if (selectedRole === "Hospital") {

            window.location.href = "../hospital-donor/hospital-register.html";

        }

    }); 

}


/* =====================================================
   9. PASSWORD SHOW / HIDE
===================================================== */

const passwordToggle =
    document.querySelector(".toggle");


if (passwordToggle) {

    passwordToggle.addEventListener(
        "click",
        function () {

            const password =
                document.getElementById(
                    "loginPassword"
                );


            if (!password) return;


            if (
                password.type === "password"
            ) {

                password.type = "text";

                this.classList.remove(
                    "fa-eye"
                );

                this.classList.add(
                    "fa-eye-slash"
                );

            }

            else {

                password.type = "password";

                this.classList.remove(
                    "fa-eye-slash"
                );

                this.classList.add(
                    "fa-eye"
                );

            }

        }
    );

}

const roles = document.querySelectorAll(".role");

let selectedRole = "Donor";

roles.forEach(role => {

    role.addEventListener("click", function () {

        // Remove active from all roles
        roles.forEach(r => r.classList.remove("active"));

        // Add active to selected role
        this.classList.add("active");

        // Get selected role name
        selectedRole = this.querySelector("span").textContent.trim();

        console.log("Selected Role:", selectedRole);
    });

});