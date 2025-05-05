$(function () {
  $("header").load("components/header.html");
  $("footer").load("components/footer.html");
  $("#firstView").load("components/firstView.html");
  $("#profile").load("components/profile.html", function () {
    $(".profile-menus").on("click", ".profile-menu", function () {
      const target = $(this).data("target");

      // 切り替えたい背景色
      const bgColors = {
        profile: "rgb(255, 81, 81)", // 赤
        research: "rgb(81, 180, 81)", // 緑
        experience: "rgb(81, 81, 255)", // 青
        hobby: "rgb(255, 230, 45)", // 黄
      };

      const textColors = {
        profile: "white",
        research: "white",
        experience: "white",
        hobby: "rgb(100, 100, 100)", // 黄色背景には暗い文字
      };

      // 背景色を変更
      $(".profile-bg").css("background-color", bgColors[target]);

      // テキスト切り替え
      $(".profile-section:visible").fadeOut(300, function () {
        $(".profile-" + target).fadeIn(300);
      });

      $(".profile-wrapper").css("color", textColors[target]);
      $(".profile-header").css("color", textColors[target]);
    });
  });

  $("#works").load("components/works.html", function () {
    $(".works-slider").slick({
      centerMode: true,
      centerPadding: "0px",
      slidesToShow: 3,
      arrows: true,
      dots: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: "0px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 520,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "0px",
            slidesToShow: 1,
          },
        },
      ],
    });
  });

  $("#skills").load("components/skills.html");
  $("#contact").load("components/contact.html");
});
