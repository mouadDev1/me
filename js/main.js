(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  $(document).ready(function () {
    var isScrolling = false;
    var $navbarCollapse = $(".navbar-collapse");

    // Add or remove 'navbar-scrolled' class based on scroll position
    function updateNavbar() {
      var scrollDistance = $(window).scrollTop();
      if (scrollDistance > 300) {
        $(".navbar").addClass("navbar-scrolled");
      } else {
        $(".navbar").removeClass("navbar-scrolled");
      }
    }

    // Assign active class to nav links while scrolling
    function updateActiveSection() {
      var scrollDistance = $(window).scrollTop();
      var windowHeight = $(window).height();
      var isBottomReached =
        scrollDistance + windowHeight >= $(document).height();

      $(".section").each(function () {
        var sectionTop = $(this).offset().top;
        var sectionHeight = $(this).outerHeight();

        if (
          (scrollDistance >= sectionTop - windowHeight / 2 &&
            scrollDistance < sectionTop + sectionHeight - windowHeight / 2) ||
          (isBottomReached && $(this).is(":last-child"))
        ) {
          var sectionId = $(this).attr("id");
          $(".navbar-nav a").removeClass("active");
          $('.navbar-nav a[href="#' + sectionId + '"]').addClass("active");
        }
      });
    }

    // Scroll event listener
    $(window).scroll(function () {
      if (!isScrolling) {
        isScrolling = true;
        updateNavbar();
        updateActiveSection();
        setTimeout(function () {
          isScrolling = false;
        }, 250);
      }
    });

    // Refresh scroll navigation on page load
    updateNavbar();
    updateActiveSection();

    // Add click event listener to nav links
    $(".navbar-nav a").on("click", function (event) {
      event.preventDefault();
      var targetSection = $(this).attr("href");
      var targetOffset = $(targetSection).offset().top;
      var navHeight = $(".navbar").outerHeight();
      var scrollDistance = targetOffset;

      $("html, body").animate(
        {
          scrollTop: scrollDistance,
        },
        100,
        function () {
          updateActiveSection();
        }
      );

      // Close the navbar after clicking a navigation item
      $navbarCollapse.collapse("hide");

      $(".navbar-nav a").removeClass("active");
      $(this).addClass("active");
    });

    // Refresh scroll navigation on window resize
    $(window).resize(function () {
      updateActiveSection();
    });

    // Refresh scroll navigation on content change
    $(window).on("load", function () {
      updateActiveSection();
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 10, "easeInOutExpo");
    return false;
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  $(document).ready(function () {
    $(".refresh-link").click(function (e) {
      e.preventDefault();

      // Restore the original color and remove any selection styles from the icon and link
      var link = $(this);
      var icon = link.find("i");

      // Remove any classes that modify the icon's color or hover effects
      icon.removeClass("clicked"); // Replace 'clicked' with the class name that changes the color
      icon.removeClass("hover-class"); // Replace 'hover-class' with any class applied on hover

      link.blur(); // Remove focus from the link

      // Allow the link to open in a new tab after a short delay (e.g., 300 milliseconds)
      setTimeout(function () {
        var newTab = window.open(link.attr("href"), "_blank");
        newTab.focus();
      }, 300);
    });
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // img
  // var pic = document.getElementById("pic");

  // pic.addEventListener("mouseenter", function () {
  //   this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.5)";
  //   this.style.transform = "translateY(-10px)";
  // });

  // pic.addEventListener("mouseleave", function () {
  //   this.style.boxShadow = "none";
  //   this.style.transform = "none";
  // });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });

  // Wait for all images to load before finalizing the layout
  $(window).on("load", function () {
    portfolioIsotope.isotope("reloadItems").isotope();
  });

  // Trigger layout on image load
  $(".portfolio-container").on("load", "img", function () {
    portfolioIsotope.isotope("reloadItems").isotope();
  });

  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });
})(jQuery);
