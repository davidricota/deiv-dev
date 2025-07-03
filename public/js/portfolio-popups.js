// Portfolio Popups Configuration
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Magnific Popup for portfolio items
  $(".popup-trigger").magnificPopup({
    type: "ajax",
    ajax: {
      settings: {
        // Extract only the content we need from the loaded page
        success: function (data) {
          // Find the project content in the loaded page
          var projectContent = $(data).find(".project-detail-page .popup__container").html();
          if (projectContent) {
            // Create a wrapper for the popup content
            var popupContent = '<div class="popup__container">' + projectContent + "</div>";
            this.content = popupContent;
          } else {
            // Fallback: show the full page content
            this.content = data;
          }
        },
      },
    },
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: "scroll",
    preloader: true,
    midClick: true,
    removalDelay: 600,
    mainClass: "mfp-fade",
    callbacks: {
      // Add custom classes to the popup
      elementParse: function (item) {
        item.el.addClass("portfolio-popup-trigger");
      },
      // Handle popup open
      open: function () {
        // Add any custom behavior when popup opens
        $("body").addClass("popup-open");
      },
      // Handle popup close
      close: function () {
        // Remove custom classes when popup closes
        $("body").removeClass("popup-open");
      },
    },
  });
});
