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
            document.getElementById('status').innerText = 'Product Verified!';
            document.getElementById('status').style.color = '#4CAF50';
            showIcon('checkmark');
            hideIcon('cross');
        } else {
            document.getElementById('status').innerText = 'Verification Failed!';
            document.getElementById('status').style.color = '#f44336';
            showIcon('cross');
            hideIcon('checkmark');
        }
    } catch (error) {
        console.error('Error:', error); // Log error for debugging
        document.getElementById('status').innerText = 'Verification Failed!';
        document.getElementById('status').style.color = '#f44336';
        showIcon('cross');
        hideIcon('checkmark');
    }
}

// Function to show an icon with animation
function showIcon(id) {
    const icon = document.getElementById(id);
    icon.classList.remove('hide');
    icon.classList.add('show');
}

// Function to hide an icon with animation
function hideIcon(id) {
    const icon = document.getElementById(id);
    icon.classList.remove('show');
    icon.classList.add('hide');
}

// Call the verify function
verifyTag();
