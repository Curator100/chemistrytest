document.addEventListener('DOMContentLoaded', () => {
    const gif1 = document.getElementById('gif1');
    const gif2 = document.getElementById('gif2');
    const gif3 = document.getElementById('gif3');
    const gif4 = document.getElementById('gif4');
    const gif5 = document.getElementById('gif5');
    const threshold = 50; // 1-inch radius in pixels

    function makeMovable(gif, showGif) {
        gif.addEventListener('mousedown', (e) => {
            let shiftX = e.clientX - gif.getBoundingClientRect().left;
            let shiftY = e.clientY - gif.getBoundingClientRect().top;

            const moveAt = (pageX, pageY) => {
                gif.style.left = pageX - shiftX + 'px';
                gif.style.top = pageY - shiftY + 'px';

                if (isNearCenter(gif, gif3, threshold)) {
                    showGif.style.display = 'block';
                    setTimeout(() => {
                        showGif.style.display = 'none';
                        gif.style.left = ''; // Reset to original position
                        gif.style.top = '';
                    }, 1000);
                }
            };

            const onMouseMove = (e) => {
                moveAt(e.pageX, e.pageY);
            };

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', onMouseMove);
                gif.onmouseup = null;
            });
        });

        gif.ondragstart = () => false;
    }

    function isNearCenter(movingGif, targetGif, threshold) {
        const movingRect = movingGif.getBoundingClientRect();
        const targetRect = targetGif.getBoundingClientRect();

        const distanceX = Math.abs((movingRect.left + movingRect.width / 2) - (targetRect.left + targetRect.width / 2));
        const distanceY = Math.abs((movingRect.top + movingRect.height / 2) - (targetRect.top + targetRect.height / 2));

        return distanceX <= threshold && distanceY <= threshold;
    }

    makeMovable(gif1, gif4);
    makeMovable(gif2, gif5);
});
