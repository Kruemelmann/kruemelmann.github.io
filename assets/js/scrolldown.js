var pageHeight = window.innerHeight;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) + 10

function scrollDown() {
    window.scrollTo({
        top: vh,
        left: 0,
        behavior: 'smooth'
    });
}
