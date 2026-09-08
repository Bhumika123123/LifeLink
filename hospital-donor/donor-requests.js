const donorForm = document.getElementById("donorForm");

const successMessage =
    document.getElementById("successMessage");

const bloodDetails =
    document.getElementById("bloodDetails");

const organDetails =
    document.getElementById("organDetails");

const bloodGroup =
    document.getElementById("bloodGroup");

const bloodGroupDetail =
    document.getElementById("bloodGroupDetail");

const city =
    document.getElementById("city");

const organCity =
    document.getElementById("organCity");

const selectedOrgan =
    document.getElementById("selectedOrgan");

const requiredUnits =
    document.getElementById("requiredUnits");

const preferredDonationDate =
    document.getElementById("preferredDonationDate");


// ========================================
// GET SELECTED DONATION TYPE
// ========================================

function getSelectedDonationType() {

    const selected =
        document.querySelector(
            'input[name="donationType"]:checked'
        );

    return selected ? selected.value : "";
}


// ========================================
// CHECK BLOOD DONATION
// ========================================

function isBloodDonation(type) {

    return type === "Blood";
}


// ========================================
// GET FIELD VALUE
// ========================================

function getFieldValue(id) {

    const field =
        document.getElementById(id);

    return field
        ? field.value.trim()
        : "";
}


// ========================================
// SET FIELD ERROR
// ========================================

function setFieldError(fieldId, message) {

    const errorElement =
        document.querySelector(
            '[data-error-for="' + fieldId + '"]'
        );

    const field =
        document.getElementById(fieldId);

    const group =
        field
            ? field.closest(".form-group")
            : null;


    if (errorElement) {

        errorElement.textContent =
            message || "";

    }


    if (group) {

        group.classList.toggle(
            "invalid",
            Boolean(message)
        );

    }
}


// ========================================
// CLEAR ALL ERRORS
// ========================================

function clearAllErrors() {

    document
        .querySelectorAll(".field-error")
        .forEach(function (element) {

            element.textContent = "";

        });


    document
        .querySelectorAll(".form-group.invalid")
        .forEach(function (element) {

            element.classList.remove("invalid");

        });


    if (successMessage) {

        successMessage.textContent = "";

    }
}


// ========================================
// UPDATE DONATION PANELS
// ========================================

function updateDonationPanels() {

    const type =
        getSelectedDonationType();

    const bloodSelected =
        isBloodDonation(type);


    // Blood details
    bloodDetails.classList.toggle(
        "hidden",
        !bloodSelected
    );


    // Organ details
    organDetails.classList.toggle(
        "hidden",
        bloodSelected || !type
    );


    // Blood required fields
    bloodGroupDetail.required =
        bloodSelected;

    requiredUnits.required =
        bloodSelected;

    preferredDonationDate.required =
        bloodSelected;


    // Organ required fields
    selectedOrgan.required =
        Boolean(type) && !bloodSelected;

    organCity.required =
        Boolean(type) && !bloodSelected;


    if (!bloodSelected && type) {

        selectedOrgan.value = type;

        if (!organCity.value.trim()) {

            organCity.value =
                city.value.trim();

        }

    }
}


// ========================================
// GET EXISTING REQUESTS
// ========================================

function getExistingRequests() {

    try {

        const requests =
            JSON.parse(
                localStorage.getItem("donorRequests")
            ) || [];


        return Array.isArray(requests)
            ? requests
            : [];

    } catch (error) {

        return [];

    }
}


// ========================================
// FORM VALIDATION
// ========================================

function validateForm() {

    clearAllErrors();

    let valid = true;

    let firstInvalid = null;


    function fail(fieldId, message) {

        setFieldError(
            fieldId,
            message
        );

        valid = false;


        if (!firstInvalid) {

            firstInvalid =
                document.getElementById(fieldId);

        }

    }


    const donationType =
        getSelectedDonationType();

    const bloodSelected =
        isBloodDonation(donationType);


    // ====================================
    // DONOR NAME
    // ====================================

    const donorName =
        getFieldValue("donorName");

    if (!donorName) {

        fail(
            "donorName",
            "Donor name is required."
        );

    } else if (!/^[A-Za-z ]+$/.test(donorName)) {

        fail(
            "donorName",
            "Name should contain only letters."
        );

    }


    // ====================================
    // AGE
    // ====================================

    const age =
        getFieldValue("age");

    if (!age) {

        fail(
            "age",
            "Age is required."
        );

    } else if (Number(age) < 18) {

        fail(
            "age",
            "Donor must be at least 18 years old."
        );

    } else if (Number(age) > 100) {

        fail(
            "age",
            "Please enter a valid age."
        );

    }


    // ====================================
    // GENDER
    // ====================================

    if (!getFieldValue("gender")) {

        fail(
            "gender",
            "Please select a gender."
        );

    }


    // ====================================
    // BLOOD GROUP
    // ====================================

    if (!getFieldValue("bloodGroup")) {

        fail(
            "bloodGroup",
            "Please select a blood group."
        );

    }


    // ====================================
    // PHONE NUMBER
    // ====================================

    const phone =
        getFieldValue("phone");


    if (!phone) {

        fail(
            "phone",
            "Contact number is required."
        );

    } else if (!/^[0-9]{10}$/.test(phone)) {

        fail(
            "phone",
            "Contact number must contain exactly 10 digits."
        );

    }


    // ====================================
    // EMAIL
    // ====================================

    const email =
        getFieldValue("email");


    if (!email) {

        fail(
            "email",
            "Email is required."
        );

    } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    ) {

        fail(
            "email",
            "Enter a valid email address."
        );

    }


    // ====================================
    // CITY
    // ====================================

    if (!getFieldValue("city")) {

        fail(
            "city",
            "City is required."
        );

    }


    // ====================================
    // STATE
    // ====================================

    if (!getFieldValue("state")) {

        fail(
            "state",
            "State is required."
        );

    }


    // ====================================
    // PINCODE
    // ====================================

    const pincode =
        getFieldValue("pincode");


    if (!pincode) {

        fail(
            "pincode",
            "Pincode is required."
        );

    } else if (!/^[0-9]{6}$/.test(pincode)) {

        fail(
            "pincode",
            "Pincode must contain exactly 6 digits."
        );

    }


    // ====================================
    // DONATION TYPE
    // ====================================

    if (!donationType) {

        fail(
            "donationType",
            "Please select a donation type."
        );

    }


    // ====================================
    // BLOOD DONATION DETAILS
    // ====================================

    if (bloodSelected) {

        if (!getFieldValue("bloodGroupDetail")) {

            fail(
                "bloodGroupDetail",
                "Please select a blood group."
            );

        }


        const units =
            getFieldValue("requiredUnits");


        if (!units) {

            fail(
                "requiredUnits",
                "Please enter required units."
            );

        } else if (Number(units) < 1) {

            fail(
                "requiredUnits",
                "Required units must be at least 1."
            );

        }


        if (
            !getFieldValue(
                "preferredDonationDate"
            )
        ) {

            fail(
                "preferredDonationDate",
                "Preferred donation date is required."
            );

        }

    }


    // ====================================
    // ORGAN / TISSUE DETAILS
    // ====================================

    else if (donationType) {

        if (!getFieldValue("selectedOrgan")) {

            fail(
                "selectedOrgan",
                "Please select an organ or tissue."
            );

        }


        if (!getFieldValue("organCity")) {

            fail(
                "organCity",
                "City/Location is required."
            );

        }

    }


    // ====================================
    // HOSPITAL
    // ====================================

    if (!getFieldValue("hospitalName")) {

        fail(
            "hospitalName",
            "Please select a hospital."
        );

    }


    // ====================================
    // HEALTH INFORMATION
    // ====================================

    const weight =
        getFieldValue("weight");


    if (!weight) {

        fail(
            "weight",
            "Weight is required."
        );

    } else if (Number(weight) <= 0) {

        fail(
            "weight",
            "Enter a valid weight."
        );

    }


    const hemoglobin =
        getFieldValue("hemoglobin");


    if (!hemoglobin) {

        fail(
            "hemoglobin",
            "Hemoglobin is required."
        );

    } else if (Number(hemoglobin) <= 0) {

        fail(
            "hemoglobin",
            "Enter a valid hemoglobin value."
        );

    }


    const bloodPressure =
        getFieldValue("bloodPressure");


    if (!bloodPressure) {

        fail(
            "bloodPressure",
            "Blood pressure is required."
        );

    } else if (
        !/^\d{2,3}\/\d{2,3}$/.test(
            bloodPressure
        )
    ) {

        fail(
            "bloodPressure",
            "Enter blood pressure like 120/80."
        );

    }


    // Chronic Disease
    if (!getFieldValue("chronicDisease")) {

        fail(
            "chronicDisease",
            "Please select an option."
        );

    }


    // Medication
    if (!getFieldValue("medication")) {

        fail(
            "medication",
            "Please select an option."
        );

    }


    // Smoker
    if (!getFieldValue("smoker")) {

        fail(
            "smoker",
            "Please select an option."
        );

    }


    // ====================================
    // SCROLL TO FIRST ERROR
    // ====================================

    if (firstInvalid) {

        firstInvalid.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        firstInvalid.focus();

    }


    return valid;
}


// ========================================
// BLOOD GROUP SYNC
// ========================================

bloodGroup.addEventListener(
    "change",
    function () {

        if (!bloodGroupDetail.value) {

            bloodGroupDetail.value =
                bloodGroup.value;

        }

    }
);


// ========================================
// CITY SYNC
// ========================================

city.addEventListener(
    "input",
    function () {

        if (!organCity.value.trim()) {

            organCity.value =
                city.value.trim();

        }

    }
);


// ========================================
// DONATION TYPE CHANGE
// ========================================

document
    .querySelectorAll(
        'input[name="donationType"]'
    )
    .forEach(function (input) {

        input.addEventListener(
            "change",
            updateDonationPanels
        );

    });


// ========================================
// CLEAR ERROR WHEN USER TYPES
// ========================================

[
    "donorName",
    "age",
    "gender",
    "bloodGroup",
    "phone",
    "email",
    "city",
    "state",
    "pincode",

    "bloodGroupDetail",
    "requiredUnits",
    "preferredDonationDate",

    "selectedOrgan",
    "organCity",
    "hospitalName",

    "weight",
    "hemoglobin",
    "bloodPressure",
    "chronicDisease",
    "medication",
    "allergies",
    "smoker"

].forEach(function (id) {

    const field =
        document.getElementById(id);


    if (!field) {
        return;
    }


    field.addEventListener(
        "input",
        function () {

            setFieldError(id, "");

        }
    );


    field.addEventListener(
        "change",
        function () {

            setFieldError(id, "");

        }
    );

});


// ========================================
// INITIALIZE
// ========================================

updateDonationPanels();


// ========================================
// SUBMIT FORM
// ========================================

donorForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validateForm()) {

            return;

        }


        const donationType =
            getSelectedDonationType();

        const bloodSelected =
            isBloodDonation(
                donationType
            );


        const hospitalName =
            getFieldValue(
                "hospitalName"
            );


        const donorBloodGroup =
            bloodSelected
                ? (
                    getFieldValue(
                        "bloodGroupDetail"
                    ) ||
                    getFieldValue(
                        "bloodGroup"
                    )
                )
                : getFieldValue(
                    "bloodGroup"
                );


        const location =
            bloodSelected
                ? getFieldValue("city")
                : (
                    getFieldValue("organCity")
                    ||
                    getFieldValue("city")
                );


        // ====================================
        // CREATE REQUEST
        // ====================================

        const request = {

            id:
                "REQ" + Date.now(),


            // DONOR INFORMATION

            donorName:
                getFieldValue("donorName"),

            donorAge:
                getFieldValue("age"),

            gender:
                getFieldValue("gender"),

            donorBloodGroup:
                donorBloodGroup,

            donorContact:
                getFieldValue("phone"),

            email:
                getFieldValue("email"),

            city:
                getFieldValue("city"),

            state:
                getFieldValue("state"),

            pincode:
                getFieldValue("pincode"),


            // DONATION INFORMATION

            donationType:
                donationType,

            donationCategory:
                bloodSelected
                    ? "Blood"
                    : "Organ/Tissue",

            requirement:
                bloodSelected
                    ? "Blood"
                    : getFieldValue(
                        "selectedOrgan"
                    ),

            requiredBloodGroup:
                bloodSelected
                    ? donorBloodGroup
                    : "",

            requiredUnits:
                bloodSelected
                    ? getFieldValue(
                        "requiredUnits"
                    )
                    : "",

            preferredDonationDate:
                bloodSelected
                    ? getFieldValue(
                        "preferredDonationDate"
                    )
                    : "",

            selectedOrgan:
                bloodSelected
                    ? ""
                    : getFieldValue(
                        "selectedOrgan"
                    ),

            organCity:
                bloodSelected
                    ? ""
                    : getFieldValue(
                        "organCity"
                    ),

            additionalInfo:
                bloodSelected
                    ? ""
                    : getFieldValue(
                        "organAdditionalInfo"
                    ),


            // HOSPITAL

            hospitalName:
                hospitalName,


            // ====================================
            // HEALTH INFORMATION
            // ====================================

            healthInformation: {

                weight:
                    getFieldValue(
                        "weight"
                    ),

                hemoglobin:
                    getFieldValue(
                        "hemoglobin"
                    ),

                bloodPressure:
                    getFieldValue(
                        "bloodPressure"
                    ),

                chronicDisease:
                    getFieldValue(
                        "chronicDisease"
                    ),

                medication:
                    getFieldValue(
                        "medication"
                    ),

                allergies:
                    getFieldValue(
                        "allergies"
                    ),

                smoker:
                    getFieldValue(
                        "smoker"
                    )

            },


            // REQUEST STATUS

            requestDate:
                new Date()
                    .toISOString()
                    .slice(0, 10),

            status:
                "Pending",

            createdAt:
                new Date().toISOString()

        };


        // ====================================
        // SAVE TO LOCAL STORAGE
        // ====================================

        const requests =
            getExistingRequests();


        requests.push(request);


        localStorage.setItem(
            "donorRequests",
            JSON.stringify(requests)
        );


        // ====================================
        // RESET FORM
        // ====================================

        donorForm.reset();


        clearAllErrors();


        // Blood as default
        const bloodRadio =
            document.querySelector(
                'input[name="donationType"][value="Blood"]'
            );


        if (bloodRadio) {

            bloodRadio.checked = true;

        }


        updateDonationPanels();


        // ====================================
        // SUCCESS
        // ====================================

        successMessage.style.color =
            "#1d8a4a";


        successMessage.textContent =
            "Donation request generated for "
            + hospitalName
            + ".";

    }
);