document.getElementById('scan-button').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    console.log("Record type:  " + record.recordType);
                    console.log("MIME type:    " + record.mediaType);
                    console.log("=== data ===\n" + decoder.decode(record.data));
                    const nfcData = decoder.decode(record.data);
                    document.getElementById('nfc-data').textContent = nfcData;

                    // Send data to server
                    fetch('https://example.com/api/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nfcData: nfcData })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        // Handle and display the detailed information here
                        displayProductDetails(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            };
        } catch (error) {
            console.error("Error reading NFC: ", error);
        }
    } else {
        alert("NFC is not supported on this device.");
    }
});

function displayProductDetails(data) {
    const detailsContainer = document.getElementById('product-details');
    detailsContainer.innerHTML = ''; // Clear previous content

    // Iterate over all properties in the data object
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const detail = document.createElement('p');
            detail.textContent = `${key}: ${data[key]}`;
            detailsContainer.appendChild(detail);
        }
    }
}
