document.addEventListener("DOMContentLoaded", () => {
  // Find either grid (for index.html or reviews.html)
  const reviewsGrid = document.getElementById("reviewsGrid") || document.getElementById("review-grid");
  if (!reviewsGrid) return; // Exit if not on a reviews page

  fetch("reviews.json")
    .then(res => res.json())
    .then(data => {
      const isHome = window.location.pathname.includes("index");
      const selected = isHome ? data.slice(0, 4) : data;

      // Build each review card
      selected.forEach(review => {
        const card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
          <div class="review-header">
            <img src="${review.profilePic}" alt="${review.name}'s profile" class="profile">
            <div class="name">${review.name}</div>
          </div>
          <div class="review-body">
            <img src="${review.restaurantImage}" alt="${review.restaurantName}" class="restaurant">
            <div class="text">
              <strong>${review.restaurantName}</strong><br>
              ${review.text}
            </div>
          </div>
        `;
        reviewsGrid.appendChild(card);
      });

      // === Lightbox Setup ===
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      const lightboxName = document.getElementById("lightbox-name");
      const lightboxText = document.getElementById("lightbox-text");
      const closeBtn = document.querySelector(".close-btn");

      if (lightbox && closeBtn) {
        // Make the whole card clickable for lightbox
        document.querySelectorAll(".review-card").forEach((card, index) => {
          card.addEventListener("click", () => {
            const r = selected[index];
            lightboxImg.src = r.restaurantImage;
            lightboxName.textContent = r.restaurantName;
            lightboxText.textContent = r.text;
            lightbox.style.display = "flex";
          });
        });

        // Close the lightbox
        closeBtn.addEventListener("click", () => {
          lightbox.style.display = "none";
        });

        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) lightbox.style.display = "none";
        });
      }
    })
    .catch(err => console.error("Error loading reviews:", err));
});
