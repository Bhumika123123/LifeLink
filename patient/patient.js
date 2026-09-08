// ======================================================
// LIFELINK - PATIENT MODULE JAVASCRIPT
// ======================================================


// ======================================================
// 1. EMERGENCY REQUEST - BLOOD / ORGAN SELECTION
// ======================================================

const bloodOption = document.getElementById("bloodOption");
const organOption = document.getElementById("organOption");

const bloodSection = document.getElementById("bloodSection");
const organSection = document.getElementById("organSection");


if (bloodOption && organOption && bloodSection && organSection) {

    // Blood selected
    bloodOption.addEventListener("change", function () {

        bloodSection.style.display = "block";
        organSection.style.display = "none";

    });


    // Organ selected
    organOption.addEventListener("change", function () {

        bloodSection.style.display = "none";
        organSection.style.display = "block";

    });

}


// ======================================================
// 2. GET SAVED REQUESTS FROM LOCAL STORAGE
// ======================================================

let requests = JSON.parse(
    localStorage.getItem("lifeLinkRequests")
) || [];


// ======================================================
// 3. EMERGENCY REQUEST FORM SUBMISSION
// ======================================================

const emergencyForm = document.getElementById("emergencyForm");


if (emergencyForm) {

    emergencyForm.addEventListener("submit", function (event) {

        // Prevent page from refreshing
        event.preventDefault();


        // Get selected donation type
        const selectedDonation =
            document.querySelector(
                'input[name="donationType"]:checked'
            );


        // Make sure donation type is selected
        if (!selectedDonation) {

            alert("Please select Blood or Organ Donation.");

            return;
        }


        const donationType = selectedDonation.value;


        // Get form values
        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const organRequired =
            document.getElementById("organRequired").value;

        const hospital =
            document.getElementById("hospital").value.trim();

        const location =
            document.getElementById("location").value.trim();

        const priority =
            document.getElementById("priority").value;

        const description =
            document.getElementById("description").value.trim();


        // ==================================================
        // 4. FORM VALIDATION
        // ==================================================

        if (donationType === "blood" && bloodGroup === "") {

            alert("Please select a blood group.");

            return;
        }


        if (donationType === "organ" && organRequired === "") {

            alert("Please select the required organ.");

            return;
        }


        if (hospital === "") {

            alert("Please enter the hospital name.");

            return;
        }


        if (location === "") {

            alert("Please enter the location.");

            return;
        }


        if (priority === "") {

            alert("Please select the emergency priority.");

            return;
        }


        if (description === "") {

            alert("Please describe the emergency.");

            return;
        }


        // ==================================================
        // 5. CREATE REQUEST OBJECT
        // ==================================================

        const request = {

            id: Date.now(),

            donationType: donationType,

            bloodGroup:
                donationType === "blood"
                    ? bloodGroup
                    : null,

            organRequired:
                donationType === "organ"
                    ? organRequired
                    : null,

            hospital: hospital,

            location: location,

            priority: priority,

            description: description,

            status: "Pending",

            date: new Date().toLocaleDateString("en-IN")

        };


        // ==================================================
        // 6. ADD REQUEST TO ARRAY
        // ==================================================

        requests.push(request);


        // ==================================================
        // 7. SAVE REQUEST IN LOCAL STORAGE
        // ==================================================

        localStorage.setItem(
            "lifeLinkRequests",
            JSON.stringify(requests)
        );


        // ==================================================
        // 8. SUCCESS MESSAGE
        // ==================================================

        alert(
            "Emergency request submitted successfully!"
        );


        // Clear the form
        emergencyForm.reset();


        // Show correct section again
        if (bloodSection && organSection) {

            bloodSection.style.display = "block";

            organSection.style.display = "none";

        }

    });

}


// ======================================================
// 9. DISPLAY REQUESTS ON MY REQUESTS PAGE
// ======================================================

const requestList =
    document.getElementById("requestList");


if (requestList) {

    displayRequests(requests);

}


// ======================================================
// 10. FUNCTION TO DISPLAY REQUESTS
// ======================================================

function displayRequests(requestData) {

    // Clear existing cards
    requestList.innerHTML = "";


    // No requests available
    if (requestData.length === 0) {

        requestList.innerHTML = `
            <div class="no-requests">
                <h3>No Emergency Requests</h3>
                <p>
                    You have not submitted any blood or
                    organ donation requests yet.
                </p>
            </div>
        `;

        return;
    }


    // Create card for every request
    requestData.forEach(function (request) {

        // Decide whether it is Blood or Organ
        let requestTitle;
        let requestIcon;
        let requestClass;


        if (request.donationType === "blood") {

            requestIcon = "🩸";

            requestClass = "blood";

            requestTitle =
                request.bloodGroup + " Blood Required";

        } else {

            requestIcon = "🫀";

            requestClass = "organ";

            requestTitle =
                request.organRequired + " Required";

        }


        // Status class
        const statusClass =
            request.status.toLowerCase();


        // Create request card
        const card = document.createElement("div");

        card.className = "full-request-card";


        card.setAttribute(
            "data-status",
            request.status
        );


        card.innerHTML = `

            <div class="full-request-top">

                <div>

                    <span class="request-type ${requestClass}">
                        ${requestIcon} 
                        ${request.donationType === "blood"
                            ? "Blood"
                            : "Organ"}
                    </span>

                    <h2>${requestTitle}</h2>

                </div>

                <span class="status ${statusClass}">
                    ${request.status}
                </span>

            </div>


            <div class="request-information">

                <div>
                    <label>Hospital</label>
                    <p>${request.hospital}</p>
                </div>

                <div>
                    <label>Location</label>
                    <p>${request.location}</p>
                </div>

                <div>
                    <label>Priority</label>
                    <p>${request.priority}</p>
                </div>

                <div>
                    <label>Request Date</label>
                    <p>${request.date}</p>
                </div>

            </div>


            <div class="request-footer">

                <span>
                    Request ID: #${request.id}
                </span>

                <button
                    class="details-btn"
                    onclick="viewRequestDetails(${request.id})"
                >
                    View Details
                </button>

            </div>

        `;


        // Add card to page
        requestList.appendChild(card);

    });

}


// ======================================================
// 11. FILTER REQUESTS
// ======================================================

const requestTabs =
    document.querySelectorAll(".request-tab");


requestTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        // Remove active class from all tabs
        requestTabs.forEach(function (item) {

            item.classList.remove("active");

        });


        // Add active class to clicked tab
        tab.classList.add("active");


        // Get selected status
        const selectedStatus =
            tab.getAttribute("data-status");


        // Show all requests
        if (selectedStatus === "all") {

            displayRequests(requests);

            return;
        }


        // Filter requests
        const filteredRequests =
            requests.filter(function (request) {

                return request.status === selectedStatus;

            });


        // Display filtered requests
        displayRequests(filteredRequests);

    });

});


// ======================================================
// 12. VIEW REQUEST DETAILS
// ======================================================

function viewRequestDetails(requestId) {

    const request =
        requests.find(function (item) {

            return item.id === requestId;

        });


    if (!request) {

        alert("Request not found.");

        return;
    }


    let requirement;


    if (request.donationType === "blood") {

        requirement =
            "Blood Group: " + request.bloodGroup;

    } else {

        requirement =
            "Organ Required: " + request.organRequired;

    }


    alert(
        "Request Details\n\n" +

        "Donation Type: " +
        request.donationType.toUpperCase() +

        "\n" +

        requirement +

        "\nHospital: " +
        request.hospital +

        "\nLocation: " +
        request.location +

        "\nPriority: " +
        request.priority +

        "\nStatus: " +
        request.status +

        "\nDescription: " +
        request.description
    );

}


// ======================================================
// 13. DASHBOARD REQUEST COUNTS
// ======================================================

const statCards =
    document.querySelectorAll(".stat-card h3");


if (statCards.length >= 3) {

    const activeRequests =
        requests.filter(function (request) {

            return request.status === "Pending";

        }).length;


    const acceptedRequests =
        requests.filter(function (request) {

            return request.status === "Accepted";

        }).length;


    const completedRequests =
        requests.filter(function (request) {

            return request.status === "Completed";

        }).length;


    statCards[0].textContent =
        activeRequests;

    statCards[1].textContent =
        acceptedRequests;

    statCards[2].textContent =
        completedRequests;

}


// ======================================================
// 14. LOGOUT
// ======================================================

const logoutButton =
    document.querySelector(".logout-btn");


if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        const confirmLogout =
            confirm("Are you sure you want to logout?");


        if (confirmLogout) {

            window.location.href =
                "../index.html";

        }

    });

}