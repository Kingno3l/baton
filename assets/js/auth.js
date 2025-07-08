document.addEventListener('DOMContentLoaded', () => {
  // Password visibility toggle
  window.toggleVisibility = function (id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  };

  const carousel = document.getElementById('customCarousel');
  const indicators = document.querySelectorAll('.custom-indicator');
  const rightPanel = document.querySelector('.right-panel');

  if (!carousel || !rightPanel) return;

  const bgColors = ['#171219', '#700002', '#311B15', '#666666'];

  const slide1Background = document.getElementById('slide1-background');
  const slide2Background = document.getElementById('slide2-background');
  const slide3Background = document.getElementById('slide3-background');
  const slide4Background = document.getElementById('slide4-background');

  const updateIndicators = (activeIndex) => {
    indicators.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
      dot.classList.toggle('inactive', index !== activeIndex);
    });

    rightPanel.style.backgroundColor = bgColors[activeIndex];

    [slide1Background, slide2Background, slide3Background, slide4Background].forEach(bg => {
      bg.style.display = 'none';
    });

    if (activeIndex === 0) slide1Background.style.display = 'block';
    if (activeIndex === 1) slide2Background.style.display = 'block';
    if (activeIndex === 2) slide3Background.style.display = 'block';
    if (activeIndex === 3) slide4Background.style.display = 'block';
  };

  carousel.addEventListener('slid.bs.carousel', (e) => {
    updateIndicators(e.to);
  });

  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);
      carouselInstance.to(index);
    });
  });

  updateIndicators(0);
});
