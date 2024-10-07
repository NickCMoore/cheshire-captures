
const ScrollToTop = () => {

    const mybutton = document.getElementById("scrollBtn");
  
    window.onscroll = function() {scrollFunction()};
  
    
    function scrollFunction () {
      if (window.pageYOffset > 1000) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  };
  
  export default ScrollToTop