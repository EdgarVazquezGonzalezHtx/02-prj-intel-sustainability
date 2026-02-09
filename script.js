// Get elements
const cardsContainer = document.getElementById('cardsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselWrapper = cardsContainer.parentElement;

const gap = 18; // Matches CSS gap
const cardsPerView = 3; // Show 3 cards at a time
const totalCards = document.querySelectorAll('.card').length;

let currentPosition = 0; // Track scroll position
let cardWidth = 0; // Will be calculated dynamically

// Calculate actual card width based on container width
function calculateCardWidth() {
  const wrapperWidth = carouselWrapper.offsetWidth;
  // Calculate card width: (wrapper width - gaps) / cards per view
  cardWidth = (wrapperWidth - (gap * (cardsPerView - 1))) / cardsPerView;
  return cardWidth;
}

// Function to scroll cards
function scrollCards(direction) {
  const scrollAmount = (cardWidth + gap) * cardsPerView;
  
  if (direction === 'next') {
    currentPosition += scrollAmount;
    // Don't scroll past the end
    const maxScroll = (cardWidth + gap) * (totalCards - cardsPerView);
    if (currentPosition > maxScroll) {
      currentPosition = maxScroll;
    }
  } else {
    currentPosition -= scrollAmount;
    // Don't scroll before the start
    if (currentPosition < 0) {
      currentPosition = 0;
    }
  }

  // Apply smooth scroll
  cardsContainer.style.transform = `translateX(-${currentPosition}px)`;
  
  // Update button states
  updateButtonStates();
}

// Function to update button disabled states
function updateButtonStates() {
  const maxScroll = (cardWidth + gap) * (totalCards - cardsPerView);
  prevBtn.disabled = currentPosition === 0;
  nextBtn.disabled = currentPosition >= maxScroll;
}

// Event listeners
prevBtn.addEventListener('click', () => scrollCards('prev'));
nextBtn.addEventListener('click', () => scrollCards('next'));

// Calculate card width on page load and window resize
window.addEventListener('load', () => {
  calculateCardWidth();
  updateButtonStates();
});

window.addEventListener('resize', () => {
  calculateCardWidth();
  // Reset position to avoid getting stuck
  currentPosition = 0;
  cardsContainer.style.transform = `translateX(0)`;
  updateButtonStates();
});

// Initialize on page load if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    calculateCardWidth();
    updateButtonStates();
  });
} else {
  calculateCardWidth();
  updateButtonStates();
}
