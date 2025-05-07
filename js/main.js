$(function () {
  $("header").load("components/header.html");
  $("footer").load("components/footer.html");
  $("#firstView").load("components/firstView.html");
  $("#profile").load("components/profile.html", function () {
    $(".profile-menus").on("click", ".profile-menu", function () {
      const target = $(this).data("target");

      // 切り替えたい背景色
      const bgColors = {
        profile: "rgb(255, 81, 81,0.8)", // 赤
        research: "rgb(81, 180, 81, 0.8)", // 緑
        experience: "rgb(81, 81, 255, 0.8)", // 青
        hobby: "rgb(255, 230, 45, 0.8)", // 黄
      };

      const textColors = {
        profile: "white",
        research: "white",
        experience: "white",
        hobby: "rgb(100, 100, 100)", // 黄色背景には暗い文字
      };

      // 背景色を変更
      $(".profile-overlay").css("background-color", bgColors[target]);

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
          breakpoint: 1060,
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

    // モーダルの初期化
    $(".modal").modal({
      dismissible: true, // モーダルを閉じるために背景をクリックできるかどうか
      opacity: 0.5, // 背景の不透明度
      inDuration: 300, // 開くときのアニメーション時間
      outDuration: 200, // 閉じるときのアニメーション時間
      startingTop: "4%", // モーダルが開くときの初期位置
      endingTop: "15%", // モーダルが開いたときの位置
    });

    $(".modal").on("open", function () {
      console.log("Modal opened:", this);
      const $slider = $(this).find(".works-modal-slider");

      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }

      setTimeout(() => {
        // CSSレイアウトの再計算を強制
        $slider[0].offsetHeight;

        $slider.slick({
          dots: true,
        });
      }, 10);
    });

    $(".works-modal-slider").slick({
      dots: true,
    });

    $(".slick-slide").on("click", function () {
      if (
        $(this).hasClass("slick-center") &&
        !$(this).hasClass("works-modal-image")
      ) {
        const target = $(this).data("target");
        const modalClass = ".works-modal-" + target;
        $(modalClass).modal("open");
        console.log("Modal opened:", this);
        const $slider = $(modalClass).find(".works-modal-slider");

        if ($slider.hasClass("slick-initialized")) {
          $slider.slick("unslick");
        }

        setTimeout(() => {
          // CSSレイアウトの再計算を強制
          $slider[0].offsetHeight;

          $slider.slick({
            dots: true,
          });
        }, 10);
      }
    });

    $(".works-slider").on("beforeChange", function () {
      const $slider = $(this);
      const $component = $slider.closest(".works-component");

      // 現在の .slick-center を取得（これが「次に中央になる予定」のスライド）

      setTimeout(() => {
        const $center = $slider.find(".slick-center");
        const target = $center.data("target");

        $component.find(".works-name:visible").fadeOut(250, function () {
          $component.find(".works-name-" + target).fadeIn(250);
        });
      }, 1); // DOM反映直後に取得するための遅延
    });
  });

  $("#skills").load("components/skills.html", function () {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          grid: {
            color: "rgb(255, 255, 255)", // 7角形の線の色（外周）
          },
          angleLines: {
            color: "rgb(255, 255, 255)", // 中心から放射状に伸びる線の色
          },
          ticks: {
            stepSize: 1,
            color: "rgb(255, 255, 255)", // 数値の色
            font: {
              size: 14,
            },
            backdropColor: "rgba(122, 135, 194, 0.75)", // 数値の背景色
          },
          pointLabels: {
            font: {
              size: 18,
            },
            color: "rgb(255, 255, 255)", // ラベルの色
            callback: function (label) {
              return label.split(" "); // ← 単語で分割して複数行にする
            },
          },
        },
      },
    };
    const ctx1 = document
      .getElementById("skills-radarChart-language")
      .getContext("2d");
    new Chart(ctx1, {
      type: "radar",
      data: {
        labels: [
          "TypeScript",
          "python",
          "HTML CSS",
          "JavaScript",
          "C",
          "Go",
          "PosgreSQL",
        ], // 7項目
        datasets: [
          {
            label: "スコア",
            data: [3, 3, 2, 3, 1, 2, 2],
            fill: true,
            backgroundColor: "rgba(63, 81, 181, 0.6)",
            borderColor: "rgba(63, 81, 181, 1)",
            pointBackgroundColor: "rgba(63, 81, 181, 1)",
          },
        ],
      },
      options: options,
    });
    const ctx2 = document
      .getElementById("skills-radarChart-library")
      .getContext("2d");
    new Chart(ctx2, {
      type: "radar",
      data: {
        labels: [
          "React.js",
          "Next.js",
          "Vue.js, Nuxt.js",
          "prisma",
          "Flusk",
          "OpenCV",
          "MediaPipe, Yolo",
        ], // 7項目
        datasets: [
          {
            label: "スコア",
            data: [3, 3, 1, 2, 1, 3, 3],
            fill: true,
            backgroundColor: "rgba(76, 175, 80, 0.6)",
            borderColor: "rgba(76, 175, 80, 1)",
            pointBackgroundColor: "rgba(76, 175, 80, 1)",
          },
        ],
      },
      options: options,
    });
    const ctx3 = document
      .getElementById("skills-radarChart-others")
      .getContext("2d");
    const radarChart = new Chart(ctx3, {
      type: "radar",
      data: {
        labels: [
          "Windows",
          "Supabase",
          "Unity",
          "GitHub",
          "Reinforcement Learning",
          "Computer Vision",
          "Dance",
          "Intellectual Curiosity",
        ],
        datasets: [
          {
            label: "スコア",
            data: [3, 2, 3, 3, 2, 2, 4, 4],
            fill: true,
            backgroundColor: "rgba(255, 193, 7, 0.6)",
            borderColor: "rgba(255, 193, 7, 1)",
            pointBackgroundColor: "rgba(255, 193, 7, 1)",
          },
        ],
      },
      options: options,
    });
  });
  $("#contact").load("components/contact.html");
  // 全リソースの読み込み進行を % 表示
  window.addEventListener("load", () => {
    const images = Array.from(document.images);
    const total = images.length;
    console.log("total", total);
    const percentageText = document.getElementById("loading-percentage");
    const loading = document.getElementById("loading");

    if (total === 0) {
      // 画像がない場合は即終了
      percentageText.textContent = "読み込み中… 100%";
      loading.classList.add("hidden");
      return;
    }

    let loaded = 0;

    const updateProgress = () => {
      loaded++;
      const percent = Math.floor((loaded / total) * 100);
      percentageText.textContent = `読み込み中… ${percent}%`;
      if (loaded === total) {
        setTimeout(() => {
          loading.classList.add("hidden");
        }, 700);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        if (img.naturalHeight !== 0) {
          updateProgress();
        } else {
          // Safariでは失敗時も complete = true になる対策
          img.addEventListener("error", updateProgress);
        }
      } else {
        img.addEventListener("load", updateProgress);
        img.addEventListener("error", updateProgress);
      }
    });
  });
});
