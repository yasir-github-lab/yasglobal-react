
  
window.onload = function() {

   if(document.querySelector('.menu-btn')){
    document.querySelector(".menu-btn").onclick = function() {
      document.getElementById("site-navigation").classList.toggle("open");
    };
  }
  
   if(document.querySelector('.search-wrapp')){
    document.querySelector(".search-wrapp").onclick = function() {
      document.querySelector("form.search-form").classList.toggle("open");
    };
  }
  
  if(document.querySelector(".menu-cross")){
  document.querySelector(".menu-cross").onclick = function() {
      document.getElementById("site-navigation").classList.remove("open");
  };	
}
  
  var mu_elements = document.getElementsByClassName("menu-item-has-children");
  var myFunction_mu = function() {
      if(window.screen.width < 980){
          this.querySelector('.sub-menu').classList.toggle("open");
          this.classList.toggle("active-mu");
      }
  };
  for (var i = 0; i < mu_elements.length; i++) {
      mu_elements[i].addEventListener('click', myFunction_mu, false);
  }

  window.addEventListener('scroll',(event) => {
      if(document.documentElement.scrollTop > 49 && !document.body.classList.contains('fixed')){
          document.querySelector("body").classList.add("fixed");
      }else if(document.documentElement.scrollTop < 50){
          document.querySelector("body").classList.remove("fixed");
      }

      var lazyloadImages;    

    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll("img,.section");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            if(image.dataset.src){
              image.src = image.dataset.src;
            }
            image.classList.add("loaded");
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll("img,.section");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    

        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                alert(img.dataset.src);
                img.classList.add('loaded');
              }
          });
          if(lazyloadImages.length === 0) { 
            document.removeEventListener("scroll", lazyload);
            /*window.removeEventListener("resize", lazyload);*/
            /*window.removeEventListener("orientationChange", lazyload);*/
          }
        }, 20);
      }

      document.addEventListener("scroll", lazyload);
      /*window.addEventListener("resize", lazyload);*/
      /*window.addEventListener("orientationChange", lazyload);*/
    }

  });	


  
  
  
};