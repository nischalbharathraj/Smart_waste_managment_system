document.addEventListener("DOMContentLoaded", function() {
    loadBins();  // Load existing bins when the page loads

    // Handle form submission to add new bins
    document.getElementById('addBinForm').addEventListener('submit', function(e) {
        e.preventDefault();  // Prevent page reload

        const location = document.getElementById('location').value;
        const fillLevel = document.getElementById('fill_level').value;
        const type = document.getElementById('type').value;

        const formData = new FormData();
        formData.append('location', location);
        formData.append('fill_level', fillLevel);
        formData.append('type', type);

        fetch('bin_manager.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert(result);  // Show success or error message
            loadBins();  // Reload the bins data after adding a new bin
        });
    });
});

// Load bins data from server
function loadBins() {
    fetch('bin_manager.php')
    .then(response => response.json())
    .then(data => {
        const binsTable = document.querySelector('#binsTable tbody');
        binsTable.innerHTML = '';

        data.forEach(bin => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bin.location}</td>
                <td>${bin.fill_level}%</td>
                <td>${bin.type}</td>
                <td>${bin.last_collected ? bin.last_collected : 'Not Collected'}</td>
            `;
            binsTable.appendChild(row);
        });
    });
}
