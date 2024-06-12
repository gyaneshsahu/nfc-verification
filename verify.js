/* // Extract URL parameters (assuming this part is necessary for your verification logic)
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

// Function to verify the tag and display the result
async function verifyTag() {
    const payload = JSON.stringify({ tagId, eCode, enc, cmac });
    console.log('Payload:', payload); // Log payload for debugging

    try {
        const response = await fetch('https://third-party.etrnl.app/v1/tags/verify-authenticity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': 'UQ5P3EYY20YPHSSAPYCG8LWWFOU4RI420L5B5JQ1RV85J36GTKOU8NMIS9RQNVHM' // Public API key
            },
            body: payload
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result); // Log response for debugging
        displayVerificationResult(result);
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        document.getElementById('verificationResult').innerHTML = `<p>Error verifying product: ${error.message}</p>`;
    }
}

// Function to display the verification result
function displayVerificationResult(result) {
    const verificationResult = document.getElementById('verificationResult');

    if (result.success && result.authentic) {
        verificationResult.innerHTML = `
            <h2>Product is Authentic</h2>
            <pre>${JSON.stringify(result.product, null, 2)}</pre>
        `;
    } else {
        verificationResult.innerHTML = `
            <h2>Unable to Verify Product</h2>
            <pre>${JSON.stringify(result, null, 2)}</pre>
        `;
    }
}*/

// Call the verify function when the page loads
window.addEventListener('load', verifyTag);
