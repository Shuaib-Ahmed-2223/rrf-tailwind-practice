function animateCounter(id, start, end, duration, addPlus = false) {
    let element = document.getElementById(id);
    let range = end - start;
    let startTime = null;

    // IntersectionObserver to trigger the animation when element comes into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start the animation once the element is in the viewport
                if (!startTime) {
                    requestAnimationFrame(step); // Begin the countdown animation
                }
                observer.unobserve(entry.target); // Stop observing once animation starts
            }
        });
    }, {
        threshold: 0.1 // 10% of the element should be visible to trigger the animation
    });

    observer.observe(element); // Start observing the element

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let current = Math.min(Math.floor(start + (range * (progress / duration))), end);

        element.textContent = addPlus ? current + "+" : current;

        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }
}



window.onload = function() {
    animateCounter("counter1", 0, 512, 3000);          
    animateCounter("counter2", 0, 10, 1500, true);     
    animateCounter("counter3", 0, 273, 2500, true);    
};

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');  // Add the 'show' class to trigger animation
                observer.unobserve(entry.target);    // Stop observing once animation is done
            }
        });
    }, {
        threshold: 0.1 // 10% visible triggers the animation
    });

    // Select both 'fade-in-left' and 'fade-in-right' elements
    const elements = document.querySelectorAll('.fade-in-left, .fade-in-right');

    elements.forEach(el => observer.observe(el));  // Observe both types of elements
});


document.addEventListener("DOMContentLoaded", function() {
    // Function to animate the progress bar
    function animateProgressBar(element) {
        const progressBar = element.querySelector('.progress-bar');
        const percentageText = element.querySelector('.percentage-text');
        const width = progressBar.getAttribute('data-width');
        let currentWidth = 0;
        let currentPercentage = 0;
        
        // Animating the progress bar width and percentage text
        const interval = setInterval(() => {
            if (currentWidth < width) {
                currentWidth++;
                currentPercentage++;
                progressBar.style.width = `${currentWidth}%`;
                percentageText.textContent = `${currentPercentage}%`;
            } else {
                clearInterval(interval);
            }
        }, 15); // Adjust speed of progress bar fill
    }

    // Setting up IntersectionObserver to trigger the animation when the element is in the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Trigger fade-in animation
                animateProgressBar(entry.target); // Start progress bar animation
                observer.unobserve(entry.target); // Stop observing the element once animation starts
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observing elements with the class fade-in-left or fade-in-right
    const elements = document.querySelectorAll('.fade-in-left, .fade-in-right');
    elements.forEach(el => observer.observe(el));
});




document.addEventListener('DOMContentLoaded', function () {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const testimonialText = document.getElementById('testimonialText');
    const testimonialImage = document.getElementById('testimonialImage');
    const testimonialName = document.getElementById('testimonialName');
  
    // Check if all elements exist
    if (nextBtn && prevBtn && testimonialText && testimonialImage && testimonialName) {
      const testimonials = [
        {
          text: "Sara Jones's designs are both visually captivating and highly effective. She transformed our website, enhancing user engagement and conversions. Highly recommended!",
          image: "assets/img/Image (8).png",
          name: "John Smith / CEO of XYZ Company"
        },
        {
          text: "Working with Sara was a pleasure. She captured our brand’s essence perfectly and delivered an outstanding website.",
          image: "assets/img/Image (9).png",
          name: "Jane Doe / Marketing Head of ABC Ltd."
        },
        {
          text: "Sara’s work exceeded all expectations. Professional, creative, and efficient. I highly recommend her services!",
          image: "assets/img/Image (10).png",
          name: "Michael Brown / Founder of DEF Corp."
        }
      ];
  
      let current = 0;
  
      function showTestimonial(index) {
        testimonialText.innerText = testimonials[index].text;
        testimonialImage.src = testimonials[index].image;
        testimonialName.innerHTML = testimonials[index].name;
      }
  
      nextBtn.addEventListener('click', () => {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
      });
  
      prevBtn.addEventListener('click', () => {
        current = (current - 1 + testimonials.length) % testimonials.length;
        showTestimonial(current);
      });
  
      // Optional: Auto-slide every 5 seconds
      setInterval(() => {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
      }, 5000);
  
      // Initialize first testimonial
      showTestimonial(current);
    } else {
      console.error('One or more elements not found in the DOM.');
    }
  });
  