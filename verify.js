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

    let message;
    if (isVerified) {
        statusMessage.innerText = 'VERIFIED';
        successMark.style.display = 'flex';
        failureMark.style.display = 'none';
        productImage.style.display = 'block';
        productDetails.style.display = 'block';
        message = 'The product is from Iberogast. Authenticity approved';
    } else {
        statusMessage.innerText = 'UNABLE TO VERIFY';
        successMark.style.display = 'none';
        failureMark.style.display = 'flex';
        productImage.style.display = 'none';
        productDetails.style.display = 'none';
        message = 'Unable to verify the product. Caution: If you see a CAVOPS verified label on the product and this message, it might be counterfeit, report this to contact@ c a v o p s.com. However, if you do not see a CAVOPS label, it does not necessarily mean the product is counterfeit. It is possible that we are not authorized to verify the product or not a licensed partner of the company.';
    }

    // Speech synthesis
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1; // Adjust the rate as needed
    speechSynthesis.speak(utterance);
}

// Call the verify function after a delay to simulate loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.animation-container').style.display = 'none';
        document.querySelector('.verification-container').style.display = 'flex';
        verifyTag(); // Call the verification function
    }, 3000); // Duration of animation in milliseconds
});
