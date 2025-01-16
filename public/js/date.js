const today = new Date();
// Example of formatting using toLocaleDateString()
const formattedDate = today.toLocaleDateString('id-ID', {
    weekday: 'long',  // "Monday"
    year: 'numeric',  // "2024"
    month: 'long',    // "September"
    day: 'numeric',    // "30"
    hour: '2-digit',   // e.g., "14"
    minute: '2-digit',
});

// Example Output: "Monday, September 30, 2024"
document.getElementById('date-container').textContent = formattedDate;
document.getElementById('date-container1').textContent = formattedDate;
