document.addEventListener("DOMContentLoaded", () => {
  const artisans = [
    "Carpenters",
    "Plumbers",
    "Electricians",
    "AC Technicians",
    "Painters",
    "Mechanics",
    "Cleaners",
  ];

  let index = 0;
  const artisanElement = document.getElementById("rotatingArtisan");

  function rotateArtisan() {
    index = (index + 1) % artisans.length;
    artisanElement.classList.add("fade-out");
    setTimeout(() => {
      artisanElement.textContent = artisans[index];
      artisanElement.classList.remove("fade-out");
    }, 300);
  }

  setInterval(rotateArtisan, 2000);
});

// ---------- LOCATION HANDLING ----------

const locationText = document.getElementById("locationText");
let selectedLatLng = null;
let map, marker;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "Your Area";
        const country = data.address.country || "";

        locationText.textContent = `${city}, ${country}`;
      },
      () => {
        showManualLocationPrompt();
      }
    );
  } else {
    showManualLocationPrompt();
  }
}

function showManualLocationPrompt() {
  locationText.textContent = "Set search location";
  locationText.addEventListener("click", openMapModal);
}

function openMapModal() {
  document.getElementById("mapModal").classList.remove("d-none");

  // Initialize map only once
  if (!map) {
    map = L.map("map").setView([9.05785, 7.49508], 12); // Default to Abuja

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    marker = L.marker([9.05785, 7.49508], { draggable: true }).addTo(map);

    map.on("click", function (e) {
      marker.setLatLng(e.latlng);
    });
  }
}

function closeMapModal() {
  document.getElementById("mapModal").classList.add("d-none");
}

async function confirmManualLocation() {
  selectedLatLng = marker.getLatLng();

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${selectedLatLng.lat}&lon=${selectedLatLng.lng}`
  );
  const data = await response.json();

  const city =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    "Your Area";
  const country = data.address.country || "";

  locationText.textContent = `${city}, ${country}`;
  closeMapModal();
}

// Load geolocation on page load
window.onload = getUserLocation;
