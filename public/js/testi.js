
// Static testimonials data with avatars and stars
const testimonials = [
    {
        text: `"Jual emas di logamberkah.id itu gampang banget! Prosesnya cepat, dan harga yang ditawarkan sangat bersaing."`,
        author: "Andi Prasetyo",
        avatar: "https://picsum.photos/seed/p2/150", // Placeholder avatar
        stars: "⭐⭐⭐⭐⭐"
    },
    {
        text: `"Belanja emas di sini bikin saya happy. Banyak pilihan dan harga yang terjangkau. Pasti balik lagi deh!"`,
        author: "Fitriani",
        avatar: "https://picsum.photos/seed/p3/150",
        stars: "⭐⭐⭐⭐⭐"
    },
    {
        text: `"Logamberkah.id bikin saya yakin berinvestasi emas. Prosesnya cepat dan aman, saya sangat merekomendasikan!"`,
        author: "Dwi Handayani",
        avatar: "https://picsum.photos/seed/p4/150",
        stars: "⭐⭐⭐⭐⭐"
    },
    {
        text: `"Jual emas batangan di sini praktis banget. Hasil penjualannya memuaskan, dan timnya sangat membantu."`,
        author: "Agus Setiawan",
        avatar: "https://picsum.photos/seed/p5/150",
        stars: "⭐⭐⭐⭐⭐"
    }
];

// Function to rotate testimonials
function rotateTestimonials() {
    const testimonialBox = document.getElementById('testimonial-box');
    let currentIndex = 0;

    setInterval(() => {
        // Remove the current active testimonial
        const currentTestimonial = testimonialBox.querySelector('.testimonial.active');
        currentTestimonial.classList.remove('active');

        // Update the currentIndex
        currentIndex = (currentIndex + 1) % testimonials.length;

        // Create a new testimonial element
        const newTestimonial = document.createElement('div');
        newTestimonial.classList.add('testimonial', 'active');
        newTestimonial.innerHTML = `
            <img src="${testimonials[currentIndex].avatar}" alt="Avatar" class="avatar">
            <div class="stars">${testimonials[currentIndex].stars}</div>
            <p class="lead">"${testimonials[currentIndex].text}"</p>
            <p><strong>- ${testimonials[currentIndex].author} -</strong></p>
        `;

        // Replace the old testimonial with the new one
        testimonialBox.innerHTML = '';
        testimonialBox.appendChild(newTestimonial);
    }, 4000); // Change every 4 seconds
}

// Start rotating testimonials on page load
document.addEventListener("DOMContentLoaded", rotateTestimonials);
