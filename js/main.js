$(function () {
  // 共通部分の読み込み
  $("header").load("components/header.html");
  $("footer").load("components/footer.html");
  $("#firstView").load("components/firstView.html");
  $("#profile").load("components/profile.html");
  $("#works").load("components/works.html");
  $("#skills").load("components/skills.html");

  $("#contact").load("components/contact.html");

  // クリックで詳細表示
  $("#moreBtn").click(function () {
    toggleMoreInfo();
  });

  // 関数① 表示切り替え
  function toggleMoreInfo() {
    $("#moreInfo").toggleClass("hidden");
    logToggleState();
  }

  // 関数② 表示状態のログ出力
  function logToggleState() {
    const isVisible = !$("#moreInfo").hasClass("hidden");
    console.log("詳細表示状態:", isVisible);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".parallax");
  M.Parallax.init(elems);
});
