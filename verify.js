// Extract URL parameters
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
    try {
        const response = await fetch('https://third-party.etrnl.app/v1/tags/verify-authenticity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY': 'YOUR_PUBLIC_API_KEY' // Replace with your public API key
            },
            body: JSON.stringify({ tagId, eCode, enc, cmac })
        });
        const result = await response.json();
        console.log('API Response:', result); // Log response for debugging
        if (result.success && result.authentic) {
            document.getElementById('status').innerText = 'Tag Verified!';
        } else {
            document.getElementById('status').innerText = 'Verification Failed!';
        }
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        document.getElementById('status').innerText = 'Verification Failed!';
    }
}

// Call the verify function
verifyTag();
