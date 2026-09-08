const form = document.getElementById("hospitalForm");

form.addEventListener("submit", function (event) {

    // Stop normal form submission until validation is complete
    event.preventDefault();


    // ================= GET FORM VALUES =================

    const hospitalName =
        document.getElementById("hospitalName").value.trim();

    const licenseNumber =
        document.getElementById("licenseNumber").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const contact =
        document.getElementById("contact").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const terms =
        document.getElementById("terms").checked;


    // ================= CLEAR ERRORS =================

    document.getElementById("hospitalNameError").innerText = "";
    document.getElementById("licenseError").innerText = "";
    document.getElementById("addressError").innerText = "";
    document.getElementById("contactError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";


    let valid = true;


    // ================= HOSPITAL NAME =================

    if (hospitalName === "") {

        document.getElementById("hospitalNameError").innerText =
            "Hospital name is required.";

        valid = false;
    }


    // ================= LICENSE NUMBER =================

    if (licenseNumber === "") {

        document.getElementById("licenseError").innerText =
            "License number is required.";

        valid = false;
    }


    // ================= ADDRESS =================

    if (address === "") {

        document.getElementById("addressError").innerText =
            "Hospital address is required.";

        valid = false;
    }


    // ================= CONTACT NUMBER =================

    if (!/^[0-9]{10}$/.test(contact)) {

        document.getElementById("contactError").innerText =
            "Enter a valid 10-digit contact number.";

        valid = false;
    }


    // ================= EMAIL =================
    // Examples:
    // hospital@gmail.com
    // hospital@yahoo.com
    // info@hospital.org
    // contact@hospital.co.in

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {

        document.getElementById("emailError").innerText =
            "Enter a valid email address.";

        valid = false;
    }


    // ================= PASSWORD =================

    if (password.length < 8) {

        document.getElementById("passwordError").innerText =
            "Password must contain at least 8 characters.";

        valid = false;

    } else if (!/[A-Z]/.test(password)) {

        document.getElementById("passwordError").innerText =
            "Password must contain at least one uppercase letter.";

        valid = false;

    } else if (!/[a-z]/.test(password)) {

        document.getElementById("passwordError").innerText =
            "Password must contain at least one lowercase letter.";

        valid = false;

    } else if (!/[0-9]/.test(password)) {

        document.getElementById("passwordError").innerText =
            "Password must contain at least one number.";

        valid = false;

    } else if (!/[!@#$%^&*]/.test(password)) {

        document.getElementById("passwordError").innerText =
            "Password must contain at least one special character.";

        valid = false;
    }


    // ================= TERMS =================

    if (!terms) {

        alert("Please accept the Terms & Conditions.");

        valid = false;
    }


    // ================= SAVE IF VALID =================

    if (valid) {

        const hospitalData = {

            hospitalName: hospitalName,

            licenseNumber: licenseNumber,

            address: address,

            contact: contact,

            email: email

        };


        // ================= SAVE HOSPITAL DATA =================

        localStorage.setItem(
            "hospitalData",
            JSON.stringify(hospitalData)
        );


        // ================= SAVE PASSWORD =================

        localStorage.setItem(
            "hospitalPassword",
            password
        );


        // ================= CHECK DATA =================

        console.log(
            "Hospital Data Saved:",
            JSON.parse(
                localStorage.getItem("hospitalData")
            )
        );


        // ================= SUCCESS =================

        alert("Hospital registered successfully!");


        // ================= GO TO HOSPITAL REQUESTS =================
        // HTML form action:
        // ./hospital-requests.html

        form.submit();
    }

});