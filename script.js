document.addEventListener("DOMContentLoaded", () => {
    const addServiceForm = document.getElementById("add-service-form");
    const servicesGrid = document.getElementById("services-grid");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupDesc = document.getElementById("popup-desc");
    const hideDetailsBtn = document.getElementById("hide-details-btn");
    const maxWords = 10; // Maximum words before truncation

    // Truncate descriptions and set initial text
    document.querySelectorAll('.short-desc').forEach(desc => {
        const fullText = desc.getAttribute('data-full-desc');
        const truncatedText = truncateText(fullText, maxWords);
        desc.textContent = truncatedText + '...'; // Display truncated text
    });

    // Show popup function
    function showPopup(title, desc) {
        popupTitle.textContent = title;
        popupDesc.textContent = desc;
        popup.classList.remove("hidden");
        document.body.classList.add("dimmed");
    }

    // Hide popup function
    hideDetailsBtn.addEventListener("click", () => {
        popup.classList.add("hidden");
        document.body.classList.remove("dimmed");
    });

    // Event delegation to handle "Show Details" buttons in services grid
    servicesGrid.addEventListener("click", (event) => {
        if (event.target.classList.contains("show-details-btn")) {
            // Only process if the clicked button belongs to a service card
            const serviceCard = event.target.closest(".service-card");
            if (serviceCard) {
                const title = serviceCard.querySelector("h3").textContent;
                const desc = serviceCard.querySelector("p").getAttribute('data-full-desc');
                showPopup(title, desc);
            }
        }
    });
    
    // Handle form submission
    addServiceForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("service-title").value;
        const desc = document.getElementById("service-desc").value;
        const imgUrl = document.getElementById("service-img").value;

        // Create a new service card
        const newCard = document.createElement("div");
        newCard.classList.add("service-card");
        newCard.innerHTML = `
            <img src="${imgUrl}" alt="${title}" class="service-img">
            <div class="service-content">
                <h3>${title}</h3>
                <p class="short-desc" data-full-desc="${desc}">${truncateText(desc, maxWords)}...</p>
                <button class="show-details-btn">Show Details</button>
            </div>
        `;

        // Add the new card to the services grid
        servicesGrid.appendChild(newCard);

        // Clear the form inputs
        addServiceForm.reset();
    });

    // Function to truncate text
    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ');
        }
        return text;
    }

    // Remove last service card
    const removeLastItemButton = document.getElementById('remove-last-item');
    removeLastItemButton.addEventListener('click', () => {
        const lastServiceCard = servicesGrid.lastElementChild;
        if (lastServiceCard) {
            servicesGrid.removeChild(lastServiceCard);
        } else {
            alert('No more items to remove!');
        }
    });
   
});


