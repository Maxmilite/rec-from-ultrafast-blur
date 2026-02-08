
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('comparison-container');
    const imageLeft = document.getElementById('image-left');
    const imageRight = document.getElementById('image-right');
    const clipper = document.getElementById('video-clipper');
    const slider = document.getElementById('video-slider');

    if (!container || !imageLeft || !imageRight || !clipper || !slider) return;

    // Slider logic
    function moveSlider(x) {
        const rect = container.getBoundingClientRect();
        let pos = x - rect.left;

        // Clamp
        if (pos < 0) pos = 0;
        if (pos > rect.width) pos = rect.width;

        const percentage = (pos / rect.width) * 100;

        clipper.style.width = percentage + '%';
        slider.style.left = percentage + '%';
    }

    // Mouse move on container drives slider
    container.addEventListener('mousemove', (e) => {
        moveSlider(e.clientX);
    });

    // Touch support
    let isDragging = false;
    slider.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            moveSlider(e.touches[0].clientX);
        }
    });

    // Click on container to move slider (fallback)
    container.addEventListener('click', (e) => {
        moveSlider(e.clientX);
    });
});

function changeRotationObject(objectName, btn) {
    const imageLeft = document.getElementById('image-left');
    const imageRight = document.getElementById('image-right');

    if (!imageLeft || !imageRight) return;

    // Update button states
    if (btn) {
        const buttons = btn.parentElement.querySelectorAll('.button');
        buttons.forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
    }

    // Update image sources
    imageLeft.src = `./static/images/rotation/gt_${objectName}.png`;
    imageRight.src = `./static/images/rotation/output_${objectName}.png`;
}
