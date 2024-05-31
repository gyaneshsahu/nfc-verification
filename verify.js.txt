// Extract URL parameters
const url = new URL(window.location.href);
const tagId = url.pathname.split('/')[2];
const eCode = url.searchParams.get('eCode');
const enc = url.searchParams.get('enc');
const cmac = url.searchParams.get('cmac');

// Function to verify the tag
async function verifyTag() {
    try {
        const response = await fetch('https://third-party.etrnl.app/v1/tags/verify-authenticity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'API-KEY':'DUNYKTGJ27IP2AT65HLLMWKRKTFX1HCNFMESCJXEFNQ6O6HH' // Replace with your actual API key
            },
            body: JSON.stringify({ tagId, eCode, enc, cmac })
        });
        const result = await response.json();
        if (result.success && result.authentic) {
            document.getElementById('status').innerText = 'Tag Verified!';
        } else {
            document.getElementById('status').innerText = 'Verification Failed!';
        }
    } catch (error) {
        document.getElementById('status').innerText = 'Verification Failed!';
    }
}

// Call the verify function
verifyTag();
