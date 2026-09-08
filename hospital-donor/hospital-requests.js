const STORAGE_KEY = "donorRequests";

let currentFilter = "All";


// =====================================================
// GET REGISTERED HOSPITAL
// =====================================================

function getHospital() {

    const raw = localStorage.getItem("hospitalData");

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}


// =====================================================
// GET ALL REQUESTS
// =====================================================

function getAllRequests() {

    try {

        const requests =
            JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        return Array.isArray(requests) ? requests : [];

    } catch (error) {

        return [];
    }
}


// =====================================================
// SAVE ALL REQUESTS
// =====================================================

function saveAllRequests(requests) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(requests)
    );
}


// =====================================================
// GET REQUESTS FOR CURRENT HOSPITAL
// =====================================================

function getHospitalRequests() {

    const hospital = getHospital();

    if (!hospital || !hospital.hospitalName) {
        return [];
    }

    return getAllRequests().filter(function (request) {

        return request.hospitalName === hospital.hospitalName;

    });
}


// =====================================================
// DISPLAY HOSPITAL NAME
// =====================================================

function displayHospitalName() {

    const hospital = getHospital();

    const nameElement =
        document.getElementById("registeredHospitalName");

    if (!nameElement) {
        return;
    }

    if (hospital && hospital.hospitalName) {

        nameElement.innerText =
            hospital.hospitalName;

    } else {

        nameElement.innerText =
            "Not registered";
    }
}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary(hospitalRequests) {

    document.getElementById("totalCount").innerText =
        hospitalRequests.length;


    document.getElementById("pendingCount").innerText =
        hospitalRequests.filter(function (request) {

            return request.status === "Pending";

        }).length;


    document.getElementById("acceptedCount").innerText =
        hospitalRequests.filter(function (request) {

            return request.status === "Accepted";

        }).length;


    document.getElementById("rejectedCount").innerText =
        hospitalRequests.filter(function (request) {

            return request.status === "Rejected";

        }).length;
}


// =====================================================
// EMERGENCY CARD CLASS
// =====================================================

function emergencyClass(level) {

    if (level === "Critical") {
        return "emergency-critical";
    }

    if (level === "High") {
        return "emergency-high";
    }

    return "emergency-medium";
}


// =====================================================
// EMERGENCY BADGE CLASS
// =====================================================

function emergencyBadgeClass(level) {

    if (level === "Critical") {
        return "critical";
    }

    if (level === "High") {
        return "high";
    }

    return "medium";
}


// =====================================================
// STATUS BADGE CLASS
// =====================================================

function statusBadgeClass(status) {

    if (status === "Accepted") {
        return "accepted";
    }

    if (status === "Rejected") {
        return "rejected";
    }

    return "pending";
}


// =====================================================
// CREATE DETAIL
// =====================================================

function createDetail(label, value) {

    const item =
        document.createElement("div");

    item.className = "detail";


    const caption =
        document.createElement("label");

    caption.innerText = label;


    const text =
        document.createElement("p");

    text.innerText =
        value === undefined ||
        value === null ||
        value === ""
            ? "-"
            : value;


    item.appendChild(caption);
    item.appendChild(text);

    return item;
}


// =====================================================
// EMPTY STATE
// =====================================================

function showEmptyState(message) {

    const empty =
        document.createElement("div");

    empty.className =
        "empty-state";

    empty.innerText =
        message;

    return empty;
}


// =====================================================
// RENDER REQUESTS
// =====================================================

function renderRequests() {

    const list =
        document.getElementById("requestsList");

    list.innerHTML = "";


    const hospital =
        getHospital();


    const hospitalRequests =
        getHospitalRequests();


    updateSummary(
        hospitalRequests
    );


    // =================================================
    // NO HOSPITAL
    // =================================================

    if (!hospital || !hospital.hospitalName) {

        list.appendChild(
            showEmptyState(
                "No donor requests available."
            )
        );

        return;
    }


    // =================================================
    // FILTER
    // =================================================

    const visibleRequests =
        hospitalRequests.filter(
            function (request) {

                if (currentFilter === "All") {
                    return true;
                }

                return request.status === currentFilter;

            }
        );


    // =================================================
    // NO REQUESTS
    // =================================================

    if (visibleRequests.length === 0) {

        list.appendChild(
            showEmptyState(
                "No donor requests available."
            )
        );

        return;
    }


    // =================================================
    // CREATE REQUEST CARD
    // =================================================

    visibleRequests.forEach(
        function (request) {


            const card =
                document.createElement("article");

            card.className =
                "request-card " +
                emergencyClass(
                    request.emergencyLevel
                );


            // =========================================
            // CARD TOP
            // =========================================

            const top =
                document.createElement("div");

            top.className =
                "card-top";


            const idLabel =
                document.createElement("div");

            idLabel.className =
                "request-id";

            idLabel.innerText =
                "Request ID: " +
                request.id;


            const badges =
                document.createElement("div");

            badges.className =
                "badges";


            // Emergency badge

            const emergencyBadge =
                document.createElement("span");

            emergencyBadge.className =
                "badge " +
                emergencyBadgeClass(
                    request.emergencyLevel
                );

            emergencyBadge.innerText =
                request.emergencyLevel || "-";


            // Status badge

            const statusBadge =
                document.createElement("span");

            statusBadge.className =
                "badge " +
                statusBadgeClass(
                    request.status
                );

            statusBadge.innerText =
                request.status || "-";


            badges.appendChild(
                emergencyBadge
            );

            badges.appendChild(
                statusBadge
            );


            top.appendChild(
                idLabel
            );

            top.appendChild(
                badges
            );


            // =========================================
            // DETAILS
            // =========================================

            const details =
                document.createElement("div");

            details.className =
                "details-grid";


            // -----------------------------------------
            // DONOR DETAILS
            // -----------------------------------------

            details.appendChild(
                createDetail(
                    "Donor Name",
                    request.donorName
                )
            );

            details.appendChild(
                createDetail(
                    "Donor Age",
                    request.donorAge
                )
            );

            details.appendChild(
                createDetail(
                    "Gender",
                    request.gender
                )
            );

            details.appendChild(
                createDetail(
                    "Blood Group",
                    request.donorBloodGroup
                )
            );

            details.appendChild(
                createDetail(
                    "Donor Contact",
                    request.donorContact
                )
            );

            details.appendChild(
                createDetail(
                    "Email",
                    request.email
                )
            );

            details.appendChild(
                createDetail(
                    "City",
                    request.city
                )
            );

            details.appendChild(
                createDetail(
                    "State",
                    request.state
                )
            );

            details.appendChild(
                createDetail(
                    "Pincode",
                    request.pincode
                )
            );


            // -----------------------------------------
            // HEALTH INFORMATION
            // -----------------------------------------

            const health =
                request.healthInformation || {};


            details.appendChild(
                createDetail(
                    "Weight",
                    health.weight
                )
            );

            details.appendChild(
                createDetail(
                    "Hemoglobin",
                    health.hemoglobin
                )
            );

            details.appendChild(
                createDetail(
                    "Blood Pressure",
                    health.bloodPressure
                )
            );

            details.appendChild(
                createDetail(
                    "Chronic Disease",
                    health.chronicDisease
                )
            );

            details.appendChild(
                createDetail(
                    "Medication",
                    health.medication
                )
            );

            details.appendChild(
                createDetail(
                    "Allergies",
                    health.allergies
                )
            );

            details.appendChild(
                createDetail(
                    "Smoker",
                    health.smoker
                )
            );


            // -----------------------------------------
            // DONATION DETAILS
            // -----------------------------------------

            details.appendChild(
                createDetail(
                    "Donation Type",
                    request.donationType
                )
            );

            details.appendChild(
                createDetail(
                    "Donation Category",
                    request.donationCategory
                )
            );

            details.appendChild(
                createDetail(
                    "Requirement",
                    request.requirement
                )
            );

            details.appendChild(
                createDetail(
                    "Required Blood Group",
                    request.requiredBloodGroup
                )
            );

            details.appendChild(
                createDetail(
                    "Required Units",
                    request.requiredUnits
                )
            );

            details.appendChild(
                createDetail(
                    "Preferred Donation Date",
                    request.preferredDonationDate
                )
            );

            details.appendChild(
                createDetail(
                    "Selected Organ",
                    request.selectedOrgan
                )
            );


            // -----------------------------------------
            // REQUEST DETAILS
            // -----------------------------------------

            details.appendChild(
                createDetail(
                    "Hospital Name",
                    request.hospitalName
                )
            );

            details.appendChild(
                createDetail(
                    "Required By",
                    request.requiredBy
                )
            );

            details.appendChild(
                createDetail(
                    "Emergency Level",
                    request.emergencyLevel
                )
            );

            details.appendChild(
                createDetail(
                    "Request Date",
                    request.requestDate
                )
            );

            details.appendChild(
                createDetail(
                    "Current Status",
                    request.status
                )
            );


            // =========================================
            // ACTION BUTTONS
            // =========================================

            const actions =
                document.createElement("div");

            actions.className =
                "card-actions";


            const acceptBtn =
                document.createElement("button");

            acceptBtn.className =
                "action-btn accept-btn";

            acceptBtn.innerText =
                "Accept Request";


            const rejectBtn =
                document.createElement("button");

            rejectBtn.className =
                "action-btn reject-btn";

            rejectBtn.innerText =
                "Reject Request";


            const resultText =
                document.createElement("span");

            resultText.className =
                "result-text";


            // =========================================
            // PENDING REQUEST
            // =========================================

            if (request.status === "Pending") {


                acceptBtn.addEventListener(
                    "click",
                    function () {

                        updateRequestStatus(
                            request.id,
                            "Accepted"
                        );

                    }
                );


                rejectBtn.addEventListener(
                    "click",
                    function () {

                        updateRequestStatus(
                            request.id,
                            "Rejected"
                        );

                    }
                );


            } else {


                // =====================================
                // ALREADY DECIDED
                // =====================================

                acceptBtn.disabled = true;

                rejectBtn.disabled = true;


                if (
                    request.status ===
                    "Accepted"
                ) {

                    resultText.className =
                        "result-text accepted";

                    resultText.innerText =
                        "Accepted";


                } else if (
                    request.status ===
                    "Rejected"
                ) {

                    resultText.className =
                        "result-text rejected";

                    resultText.innerText =
                        "Rejected";
                }
            }


            actions.appendChild(
                acceptBtn
            );

            actions.appendChild(
                rejectBtn
            );

            actions.appendChild(
                resultText
            );


            // =========================================
            // ADD TO CARD
            // =========================================

            card.appendChild(
                top
            );

            card.appendChild(
                details
            );

            card.appendChild(
                actions
            );


            list.appendChild(
                card
            );

        }
    );
}


// =====================================================
// UPDATE REQUEST STATUS
// =====================================================

function updateRequestStatus(
    requestId,
    newStatus
) {

    const requests =
        getAllRequests();


    const updatedRequests =
        requests.map(
            function (request) {

                if (
                    request.id ===
                    requestId
                ) {

                    request.status =
                        newStatus;
                }

                return request;

            }
        );


    saveAllRequests(
        updatedRequests
    );


    renderRequests();
}


// =====================================================
// FILTER BUTTONS
// =====================================================

document
    .querySelectorAll(".filter-btn")
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    currentFilter =
                        button.getAttribute(
                            "data-filter"
                        );


                    document
                        .querySelectorAll(
                            ".filter-btn"
                        )
                        .forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    renderRequests();

                }
            );

        }
    );


// =====================================================
// INITIAL LOAD
// =====================================================

displayHospitalName();

renderRequests();