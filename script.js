// BRIGHTBEAM INSURANCE APPLICATION

const formSteps = [
    document.getElementById("step1"),
    document.getElementById("step2"),
    document.getElementById("step3"),
    document.getElementById("step4"),
    document.getElementById("step5")
];

const progressBar = document.getElementById("progressBar");
const stepIndicator = document.getElementById("stepIndicator");

// Show the selected step
function showStep(stepNumber) {

    formSteps.forEach(function (step, index) {
        step.hidden = index !== stepNumber - 1;
    });

    progressBar.style.width = (stepNumber / 5 * 100) + "%";
    stepIndicator.textContent = `Step ${stepNumber} of 5`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// VALIDATE ALL REQUIRED FIELDS IN A STEP

function validateStep(stepNumber) {

    const step = formSteps[stepNumber - 1];

    const fields = step.querySelectorAll(
        "input[required], select[required], textarea[required]"
    );

    for (const field of fields) {

        if (!field.checkValidity()) {

            // Ensure the step is visible before displaying errors
            showStep(stepNumber);

            field.focus();
            field.reportValidity();

            return false;

        }

    }

    return true;

}

// STEP 1 → STEP 2
document.getElementById("nextBtn").addEventListener("click", function () {

    if (validateStep(1)) {
        showStep(2);
    }
});

// STEP 2 → STEP 1
document.getElementById("backBtn").addEventListener("click", function () {
    showStep(1);
});

// STEP 2 → STEP 3
document.getElementById("nextBtn2").addEventListener("click", function () {

    if (validateStep(2)) {
        showStep(3);
    }
});

// STEP 3 → STEP 2
document.getElementById("backBtn3").addEventListener("click", function () {
    showStep(2);
});

// STEP 3 → STEP 4

document.getElementById("nextBtn3").addEventListener("click", function () {

    if (validateStep(3)) {

        updateCoverageSummary();

        showStep(4);
    }
});

// Initialise application
showStep(1);

// UPDATE COVERAGE SUMMARY

function updateCoverageSummary() {

    const selectedPlan = document.getElementById("plan").value;

    const coverageAmounts = {
        "Plan 5": "RM360,000",
        "Plan 6": "RM600,000",
        "Plan 7": "RM900,000"
    };

    document.getElementById("selectedPlanDisplay").textContent =
        selectedPlan;

    document.getElementById("coverageAmountDisplay").textContent =
        coverageAmounts[selectedPlan] || "Not available";
}


// STEP 4 → STEP 3

document.getElementById("backBtn4").addEventListener("click", function () {

    showStep(3);

});


// STEP 4 → STEP 5

document.getElementById("nextBtn4").addEventListener("click", function () {

    if (validateStep(4)) {

        updateReviewSummary();

        showStep(5);

    }

});

// UPDATE APPLICATION REVIEW SUMMARY

function updateReviewSummary() {

    const fieldMappings = {

        reviewPlan: "plan",
        reviewName: "fullName",
        reviewIdType: "idType",
        reviewIdNumber: "idNumber",
        reviewNationality: "nationality",
        reviewDob: "dob",
        reviewGender: "gender",
        reviewPhone: "phone",
        reviewEmail: "email",
        reviewAddress: "address",
        reviewOccupation: "occupation",
        reviewPaymentMethod: "paymentMethod",
        reviewPayerName: "payerName"

    };

    // Copy applicant information into review section
    for (const [reviewId, inputId] of Object.entries(fieldMappings)) {

        const input = document.getElementById(inputId);
        const reviewElement = document.getElementById(reviewId);

        reviewElement.textContent = input.value || "Not provided";

    }

    // Display the coverage amount
    const coverageAmounts = {
        "Plan 5": "RM360,000",
        "Plan 6": "RM600,000",
        "Plan 7": "RM900,000"
    };

    const selectedPlan = document.getElementById("plan").value;

    document.getElementById("reviewCoverage").textContent =
        coverageAmounts[selectedPlan] || "Not available";

}

// STEP 5 → STEP 4

document.getElementById("backBtn5").addEventListener("click", function () {

    showStep(4);

});



// PUBLIC DEMO — NO DATABASE CONNECTION

document.getElementById("submitBtn").addEventListener("click", function () {

    // Validate all five steps
    for (let stepNumber = 1; stepNumber <= 5; stepNumber++) {

        if (!validateStep(stepNumber)) {
            alert("Please complete Step " + stepNumber);
            return;
        }
    }

    // Hide all form steps
    formSteps.forEach(function (step) {
        step.hidden = true;
    });

    // Show demonstration confirmation
    document.getElementById("successScreen").hidden = false;

    progressBar.style.width = "100%";
    stepIndicator.textContent = "Demonstration Complete";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// RESTART APPLICATION

document.getElementById("restartBtn").addEventListener("click", function () {

    // Clear all form inputs
    document.getElementById("insuranceForm").reset();

    // Hide success screen
    document.getElementById("successScreen").hidden = true;

    // Return to Step 1
    showStep(1);

});
