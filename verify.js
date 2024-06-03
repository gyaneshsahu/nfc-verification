// Extract URL parameters (assuming this part is necessary for your verification logic)
const url = new URL(window.location.href);
const tagId = url.searchParams.get('tagId');
const eCode = url.searchParams.get('eCode');
const enc = url.searchParams.get('enc');
const cmac = url.searchParams.get('cmac');

// Log parameters for debugging
console.log('tagId:', tagId);
console.log('eCode:', eCode);
console.log('enc:', enc);
console.log('cmac:', cmac);

// Function to verify the tag
async function verifyTag() {
    const payload = JSON.stringify({ tagId, eCode, enc, cmac });
    console.log('Payload:', payload); // Log payload for debugging

    try {
        const response = await fetch('https://third-party.etrnl.app/v1/tags/verify-authenticity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': 'GMS6N9H0YCLPAJSMDUNYKTGJ27IP2AT65HLLMWKRKTFX1HCNFMESCJXEFNQ6O6HH' // Public API key
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result); // Log response for debugging
        if (result.success && result.authentic) {
            showVerificationResult(true);
        } else {
            showVerificationResult(false);
        }
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        showVerificationResult(false);
    }
}

// Function to display the verification result
function showVerificationResult(isVerified) {
    const statusBox = document.getElementById('statusBox');
    const statusMessage = document.getElementById('statusMessage');
    const successMark = document.getElementById('successMark');
    const failureMark = document.getElementById('failureMark');
    const productImage = document.getElementById('productImage');
    const productDetails = document.getElementById('productDetails');

    if (isVerified) {
        statusMessage.innerText = 'Verified';
        successMark.style.display = 'flex';
        failureMark.style.display = 'none';
        productImage.style.display = 'block';
        productDetails.style.display = 'block';
    } else {
        statusMessage.innerText = 'Unable to Verify';
        successMark.style.display = 'none';
        failureMark.style.display = 'flex';
        productImage.style.display = 'none';
        productDetails.style.display = 'none';
    }
}

// Call the verify function after a delay to simulate loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.animation-container').style.display = 'none';
        document.querySelector('.verification-container').style.display = 'flex';
        verifyTag(); // Call the verification function
    }, 3000); // Duration of animation in milliseconds
});
