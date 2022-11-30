"use strict";
var Base = (function () {
  var e = "active",
    t = $("body"),
    a = function () {
      var e = Utils.getLocalItem("skin"),
        t = document.getElementById("header"),
        a = document.getElementById("sidebar");
      e &&
        t &&
        a &&
        (t.setAttribute("data-header", e.header),
        a.setAttribute("data-sidebar", e.sidebar));
    },
    i = function () {
      var a, i, n, l, r;
      if (
        ($('[data-scroll="true"]').each(function () {
          new PerfectScrollbar(this, {
            wheelSpeed: 2,
            swipeEasing: !0,
            wheelPropagation: !1,
            minScrollbarLength: 40,
          });
        }),
        $(".swiper").each(function () {
          var e = parseInt(this.getAttribute("data-swiper-slides")),
            t = this.parentElement,
            a = this.getAttribute("data-swiper-loop"),
            i = this.getAttribute("data-swiper-autoplay"),
            n = t.querySelector(".swiper-button-next"),
            l = t.querySelector(".swiper-button-prev"),
            r = t.querySelector(".swiper-pagination"),
            s = this.getAttribute("data-swiper-pagination")
              ? this.getAttribute("data-swiper-pagination")
              : "bullets",
            o = t.querySelector(".swiper-scrollbar"),
            d = 1,
            p = 2;
          1 === e
            ? (d = p = 1)
            : e > 1 && e < 5
            ? ((d = 2), (p = 1))
            : e >= 5 && ((d = 3), (p = 2));
          var u = {
            speed: 500,
            slidesPerView: p,
            slidesPerGroup: p,
            spaceBetween: 16,
            a11y: !0,
            breakpoints: {
              576: { slidesPerView: d, slidesPerGroup: d },
              1200: { slidesPerView: e, slidesPerGroup: e, spaceBetween: 24 },
            },
          };
          a && (u.loop = a),
            i &&
              (u.autoplay = {
                delay: 5e3,
                disableOnInteraction: !1,
                pauseOnMouseEnter: !0,
              }),
            n && l && (u.navigation = { nextEl: n, prevEl: l }),
            r &&
              (u.pagination = {
                el: r,
                type: s,
                clickable: !0,
                dynamicBullets: !0,
              }),
            o && (u.scrollbar = { el: o, draggable: !0 }),
            new Swiper(this, u);
        }),
        document.querySelector(".dropzone") &&
          ((Dropzone.autoDiscover = !1),
          new Dropzone(".dropzone", { url: "/file/post" })),
        (a = "mat-tabs__line"),
        (i = $("<span>", { class: a })),
        (n = $(".mat-tabs")),
        (l = $(".nav-link")),
        n.each(function () {
          var e = $(this).find(".nav-link.active").outerWidth();
          i.stop().css({ width: e }), i.appendTo(this);
        }),
        l.on("click", function () {
          var e = $(this);
          e.closest(".mat-tabs")
            .find("." + a)
            .stop()
            .css({ left: e.position().left, width: e.outerWidth() });
        }),
        (r = !1),
        $(".sidebar-toggler").on("click", function () {
          (r = !r),
            $(this).toggleClass(e),
            t.attr("data-sidebar-toggle", r ? "true" : null);
        }),
        $("#search_input").on("click", function (e) {
          e.stopPropagation(), t.attr("data-search-results", "true");
        }),
        $(".search").on("click", function (e) {
          e.stopPropagation();
        }),
        t.on("click", function () {
          $(this).removeAttr("data-search-results");
        }),
        $(".amplitude-play-pause").hasClass("amplitude-playing"))
      ) {
        var s = Amplitude.getActiveSongMetadata();
        $("[data-play-id]").removeClass(e),
          $("[data-play-id=" + s.id + "]").addClass(e);
      }
    };
  return {
    init: function () {
      $("#loader").fadeOut(1e3),
        t.settings(),
        i(),
        $(document).on(
          "click",
          'a:not([href^="#"])a:not([href^="mail"])a:not([href^="tel"]):not([href^="javascript"]):not(.external):not([target])',
          function (n) {
            n.preventDefault(), n.stopPropagation();
            var l = $(this).closest("#sidebar"),
              r =
                "undefined" !== $(this).attr("href")
                  ? $(this).attr("href")
                  : null;
            if (r) {
              var s = $("#line_loader");
              window.history.pushState("", "", r),
                s.show().animate({ width: 20 + 80 * Math.random() + "%" }, 200),
                $.ajax({ url: r, type: "GET", dataType: "html" })
                  .done(function (e, t, n) {
                    "success" === t &&
                      200 == n.status &&
                      ((e = $("<div>" + e + "</div>")),
                      $("head title").html(e.find("title").html()),
                      $("#wrapper").html(e.find("#wrapper").html()),
                      $("html, body").animate({ scrollTop: 0 }, 100),
                      i(),
                      a(),
                      Dashboard.init());
                  })
                  .fail(function () {
                    window.location.href = "404.html";
                  })
                  .always(function () {
                    l.length &&
                      $(window).width() < 992 &&
                      ($(".sidebar-toggler").toggleClass(e),
                      t.removeAttr("data-sidebar-toggle")),
                      s
                        .animate({ width: "100%" }, 200)
                        .fadeOut(300, function () {
                          $(this).width("0");
                        });
                  });
            }
          }
        );
    },
  };
})();
$(document).ready(function () {
  Base.init();
});
var ChartJs = {
  overrideDefaults() {
    var e = Chart.defaults,
      t = {
        color: Utils.isDarkMode()
          ? "#92929F"
          : Utils.getCSSVarValue("body-color"),
        borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
        font: { family: Utils.getCSSVarValue("body-font-family"), size: 13 },
        hover: { intersect: !1, mode: "index" },
      };
    Object.assign(e, t),
      Object.assign(e.plugins.tooltip, {
        titleMarginBottom: 6,
        caretSize: 6,
        caretPadding: 10,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 4,
        intersect: !1,
        mode: "index",
        padding: { top: 8, right: 12, bottom: 8, left: 12 },
      });
  },
};
$(() => {
  ChartJs.overrideDefaults();
});
var Dashboard = (function () {
  var e, t, a, i;
  return {
    init: function () {
      !(function () {
        var t = document.getElementById("total_user");
        if ((e && e.destroy(), t)) {
          var a = {
            type: "line",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              datasets: [
                {
                  label: "Users",
                  data: [65, 59, 42, 73, 56, 55, 40],
                  backgroundColor: Utils.getCSSVarValue("red"),
                  borderColor: Utils.getCSSVarValue("red"),
                  borderWidth: 2,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  pointHoverBorderWidth: 12,
                  pointBackgroundColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0)
                    .rgbString(),
                  pointBorderColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0)
                    .rgbString(),
                  pointHoverBackgroundColor: Utils.getCSSVarValue("red"),
                  pointHoverBorderColor: Chart.helpers
                    .color(Utils.getCSSVarValue("red"))
                    .alpha(0.1)
                    .rgbString(),
                },
              ],
            },
            options: {
              title: { display: !1 },
              responsive: !0,
              maintainAspectRatio: !1,
              elements: {
                borderJoinStyle: "bevel",
                borderCapStyle: "round",
                line: { tension: 0.4 },
              },
              scales: {
                x: { display: !1 },
                y: { display: !1, min: 0, max: 85 },
              },
              layout: { margin: 0, padding: 0 },
              plugins: { legend: { display: !1 } },
            },
          };
          e = new Chart(t, a);
        }
      })(),
        (function () {
          var e = document.getElementById("total_songs");
          if ((t && t.destroy(), e)) {
            var a = {
              type: "bar",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Songs",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: Utils.getCSSVarValue("green"),
                    borderWidth: 0,
                    barThickness: 16,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  x: { display: !1 },
                  y: { display: !1, min: 0, max: 85 },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            t = new Chart(e, a);
          }
        })(),
        (function () {
          var e = document.getElementById("purchases");
          if ((a && a.destroy(), e)) {
            var t = {
              type: "line",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Purchases",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: "transparent",
                    borderColor: "#000000",
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 12,
                    pointBackgroundColor: Chart.helpers
                      .color("#000000")
                      .alpha(0)
                      .rgbString(),
                    pointBorderColor: Chart.helpers
                      .color("#000000")
                      .alpha(0)
                      .rgbString(),
                    pointHoverBackgroundColor: "#000000",
                    pointHoverBorderColor: Chart.helpers
                      .color("#000000")
                      .alpha(0.1)
                      .rgbString(),
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  x: { display: !1 },
                  y: { display: !1, min: 0, max: 85 },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            a = new Chart(e, t);
          }
        })(),
        (function () {
          var e = document.getElementById("user_statistics");
          if ((i && i.destroy(), e)) {
            var t = {
              type: "bar",
              data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    label: "Statistics",
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: Utils.getCSSVarValue("purple"),
                    borderWidth: 0,
                    barThickness: 32,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                title: { display: !1 },
                responsive: !0,
                maintainAspectRatio: !1,
                elements: {
                  borderJoinStyle: "bevel",
                  borderCapStyle: "round",
                  line: { tension: 0.4 },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 80,
                    grid: {
                      borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
                    },
                  },
                  x: {
                    grid: {
                      borderColor: Utils.isDarkMode() ? "#34343e" : "#EFF2F5",
                    },
                  },
                },
                layout: { margin: 0, padding: 0 },
                plugins: { legend: { display: !1 } },
              },
            };
            i = new Chart(e, t);
          }
        })();
    },
  };
})();
$(document).ready(function () {
  Dashboard.init();
});
var Player = (function () {
  var e = "active",
    t = $("body"),
    a = $("#playlist"),
    i = [],
    n = function (t = !0) {
      $("#player").addClass("show"),
        Amplitude.getSongs() &&
          1 === Amplitude.getSongs().length &&
          (Amplitude.pause(),
          setTimeout(() => {
            Player.volumeBackground();
          }, 0)),
        Amplitude.init({
          songs: i,
          callbacks: {
            song_change: function () {
              setTimeout(() => {
                var t = Amplitude.getActiveSongMetadata();
                "playing" === Amplitude.getPlayerState()
                  ? ($("[data-play-id]").removeClass(e),
                    $("[data-play-id=" + t.id + "]").addClass(e))
                  : $("[data-play-id]").removeClass(e),
                  r(t);
              }, 0);
            },
          },
        });
      var n = i[0];
      s(!1),
        a.html(o(n)),
        $(".amplitude-play-pause")
          .removeClass("amplitude-paused")
          .addClass("amplitude-playing"),
        t && Amplitude.play(),
        r(n);
    },
    l = function (e) {
      var t = $(e).closest("[data-song-id]");
      return {
        id: parseInt(t.data("song-id")),
        name: t.data("song-name"),
        artist: t.data("song-artist"),
        album: t.data("song-album"),
        url: t.data("song-url"),
        cover_art_url: t.data("song-cover"),
      };
    },
    r = function (e) {
      var t = $("#player_options");
      t.find("[data-favorite-id]").attr("data-favorite-id", e.id),
        t.find("[data-playlist-id]").attr("data-playlist-id", e.id),
        t.find("[download]").attr("href", e.url);
    },
    s = function (e = !0) {
      $(
        ".amplitude-repeat, .amplitude-prev, .amplitude-next, .amplitude-shuffle"
      ).prop("disabled", e);
    },
    o = function (e) {
      var t = Amplitude.getActiveSongMetadata();
      return `<div class="list__item"\n        data-song-id="${
        e.id
      }"\n        data-song-name="${e.name}"\n        data-song-artist="${
        e.artist
      }"\n        data-song-album="${e.album}"\n        data-song-url="${
        e.url
      }"\n        data-song-cover="${
        e.cover_art_url
      }">\n            <div class="list__cover">\n                <img src="${
        e.cover_art_url
      }" alt="${
        e.name
      }">\n                <a href="javascript:void(0);" class="btn btn-play btn-sm btn-default btn-icon rounded-pill ${
        e.id === t.id ? "active" : ""
      }" data-play-id="${
        e.id
      }">\n                    <i class="ri-play-fill icon-play"></i>\n                    <i class="ri-pause-fill icon-pause"></i>\n                </a>\n            </div>\n            <div class="list__content">\n                <a href="song-details.html" class="list__title text-truncate">${
        e.name
      }</a>\n                <p class="list__subtitle text-truncate">\n                    <a href="artist-details.html">${
        e.artist
      }</a>\n                </p>\n            </div>\n            <ul class="list__option">\n                <li class="list__icon-hover">\n                    <a href="javascript:void(0);" role="button" class="d-inline-flex" data-remove-song-id="${
        e.id
      }">\n                        <i class="ri-close-line fs-6"></i>\n                    </a>\n                </li>\n                <li>\n                    <a href="javascript:void(0);" role="button" class="d-inline-flex" data-favorite-id="${
        e.id
      }">\n                        <i class="ri-heart-line heart-empty"></i>\n                        <i class="ri-heart-fill heart-fill"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>`;
    },
    d = function () {
      (i = []),
        s(),
        Amplitude.pause(),
        Utils.removeLocalItem("songs"),
        a.html(
          '<div class="col-sm-8 col-10 mx-auto mt-5 text-center">\n            <i class="ri-music-2-line mb-3"></i>\n            <p>هیچ موزیک، آلبوم یا لیست پخشی به لیست اضافه نشده است.</p>\n        </div>'
        );
    };
  return {
    volumeBackground: function () {
      var e = $('.player-volume input[type="range"]'),
        t = parseInt(e.val(), 10),
        a = Utils.isDarkMode()
          ? "255, 255, 255"
          : Utils.getCSSVarValue("dark-rgb"),
        i =
          "linear-gradient(to right, rgb(" +
          a +
          ") 0%, rgb(" +
          a +
          ") " +
          t +
          "%, rgba(" +
          a +
          ", 0) " +
          t +
          "%, rgba(" +
          a +
          ", 0) 100%)";
      e.css("background", i);
    },
    init: function () {
      var r;
      !(function () {
        if (Utils.getLocalItem("songs") && Utils.getLocalItem("songs").length) {
          if (
            ((i = Utils.getLocalItem("songs")),
            n(!1),
            $(".amplitude-play-pause")
              .removeClass("amplitude-playing")
              .addClass("amplitude-paused"),
            i.length > 1)
          )
            for (let e = 0; e < i.length; e++) {
              var t = i[e];
              0 === e ? a.html(o(t)) : a.append(o(t));
            }
          $("[data-play-id]").removeClass(e);
        }
      })(),
        t.on("click", "[data-play-id]", function () {
          var t = l(this),
            r = i.findIndex((e) => e.id === t.id);
          $(this).hasClass(e)
            ? ($("[data-play-id]").removeClass(e),
              Amplitude.pause(),
              $(".amplitude-play-pause")
                .removeClass("amplitude-playing")
                .addClass("amplitude-paused"))
            : (-1 === r
                ? (i.push(t),
                  1 === i.length
                    ? n()
                    : (a.append(o(t)), Amplitude.playSongAtIndex(i.length - 1)))
                : Amplitude.playSongAtIndex(r),
              $("[data-play-id=" + t.id + "]").addClass(e)),
            Utils.setLocalItem("songs", i);
        }),
        t.on("click", "[data-queue-id]", function () {
          var t = l(this);
          -1 === i.findIndex((e) => e.id === t.id)
            ? (i.push(t),
              1 === i.length
                ? (n(), $("[data-play-id=" + t.id + "]").addClass(e))
                : a.append(o(t)))
            : Utils.showMessage("Song already in Queue"),
            Utils.setLocalItem("songs", i);
        }),
        t.on("click", "[data-next-id]", function () {
          var t = l(this),
            r = Amplitude.getActiveIndex(),
            s = i.findIndex((e) => e.id === t.id);
          i && !i.length
            ? (i.push(t), n(), $("[data-play-id=" + t.id + "]").addClass(e))
            : -1 === s
            ? (i.splice(r + 1, 0, t), a.find(".list__item").eq(r).after(o(t)))
            : Utils.showMessage("Song already in Queue"),
            Utils.setLocalItem("songs", i);
        }),
        t.on("click", "[data-collection-play-id]", function () {
          var e = $(this).attr("data-collection-play-id"),
            t = $("[data-collection-song-id=" + e + "]").find("[data-song-id]"),
            r = [],
            s = 0;
          t.each(function () {
            var e = l(this);
            r.push(e);
          }),
            i && !i.length ? ((i = r), n(), (s = 1)) : i.push(...r);
          for (let e = s; e < r.length; e++) a.append(o(r[e]));
          Utils.setLocalItem("songs", i);
        }),
        t.on("click", "[data-remove-song-id]", function (e) {
          e.stopPropagation();
          var t = parseInt($(this).data("remove-song-id")),
            a = $(this).closest("[data-song-id"),
            n = i.findIndex((e) => e.id === t);
          n > -1 &&
            (a.remove(), Amplitude.removeSong(n), 0 === i.length && d()),
            Utils.setLocalItem("songs", i);
        }),
        $("#clear_playlist").on("click", function () {
          if (i.length >= 1) {
            for (let e = 0; e < i.length; e++)
              a.find(".list__item").eq(e).remove(), Amplitude.removeSong(e);
            d();
          }
        }),
        (r = $(".player-volume"))
          .find('input[type="range"]')
          .on("input", function () {
            var e = r.find(".ri-volume-mute-fill"),
              t = r.find(".ri-volume-down-fill"),
              a = r.find(".ri-volume-up-fill"),
              i = $(this),
              n = parseInt(i.val(), 10),
              l = "d-block",
              s = "d-none";
            Player.volumeBackground(),
              0 === n
                ? (e.removeClass(s).addClass(l), t.addClass(s), a.addClass(s))
                : n > 0 && n < 70
                ? (e.addClass(s), t.removeClass(s).addClass(l), a.addClass(s))
                : n > 70 &&
                  (e.addClass(s), t.addClass(s), a.removeClass(s).addClass(l));
          }),
        $(".amplitude-play-pause").on("click", function () {
          setTimeout(() => {
            if ($(this).hasClass("amplitude-playing")) {
              var t = Amplitude.getActiveSongMetadata();
              $("[data-play-id]").removeClass(e),
                $("[data-play-id=" + t.id + "]").addClass(e);
            } else $("[data-play-id]").removeClass(e);
          }, 0);
        });
    },
  };
})();
$(document).ready(function () {
  Player.init();
}),
  (function (e, t, a, i) {
    e.fn.extend({
      settings: function (t) {
        (t = e.extend({}, e.settings.defaults, t)),
          this.each(function () {
            new e.settings(this, t);
          });
      },
    }),
      (e.settings = function (t, i) {
        var n,
          l,
          r,
          s = a.body,
          o = "skin",
          d = "setting",
          p = "تنظیمات قالب",
          u = [
            "yellow",
            "orange",
            "red",
            "green",
            "blue",
            "purple",
            "indigo",
            "dark",
          ],
          c = ["light", "dark"],
          g = "data-theme",
          m = "data-header",
          h = "data-sidebar",
          v = "data-player",
          y = () => {
            var e = a.getElementById("header"),
              t = a.getElementById("sidebar"),
              n = a.getElementById("player"),
              l = {
                dark: i.dark,
                header: i.header,
                sidebar: i.sidebar,
                player: i.player,
              };
            Utils.setLocalItem(o, l),
              l.dark ? s.setAttribute(g, "dark") : s.removeAttribute(g),
              e && i.header && e.setAttribute(m, i.header),
              t && i.sidebar && t.setAttribute(h, i.sidebar),
              n && i.player && n.setAttribute(v, i.player);
          },
          f = (e, t, a) => {
            var i = `<div class="${d}__body__item"><span class="${d}__title">${t}</span>\n                <div class="${d}__options">`;
            for (let t = 0; t < e.length; t++) {
              var n = e[t];
              i += `<a href="javascript:void(0);" class="${d}__option ${d}__option--${n}" data-${a}-option="${n}"></a>`;
            }
            return (i += "</div></div>");
          },
          b = () => {
            var t = e(`#${d}`),
              a = e(`#${d}_toggler`),
              n = e(`.${d}__option`),
              l = "show",
              r = "active";
            e(s).on("click", () => {
              t.removeClass(l);
            }),
              a.on("click", () => {
                t.toggleClass(l);
              }),
              t.on("click", (e) => {
                e.stopPropagation();
              }),
              n.on("click", function () {
                var t = e(this),
                  a = t.data("theme-option"),
                  n = t.data("header-option"),
                  l = t.data("sidebar-option"),
                  s = t.data("player-option");
                a
                  ? (e("[data-theme-option]").removeClass(r),
                    (i.dark = "dark" === a),
                    Utils.changeSkin())
                  : n
                  ? (e("[data-header-option]").removeClass(r), (i.header = n))
                  : l
                  ? (e("[data-sidebar-option]").removeClass(r), (i.sidebar = l))
                  : s &&
                    (e("[data-player-option]").removeClass(r), (i.player = s)),
                  t.addClass(r),
                  y();
              });
          };
        (r = Utils.getLocalItem(o)) && (i = e.extend({}, i, r)),
          y(),
          (n = a.createElement("div")),
          (l = `<a href="javascript:void(0);" id="${d}_toggler">تنظیمات</a>\n                    <div class="${d}__wrapper">\n                        <div class="${d}__head">${p}</div>\n                        <div class="${d}__body">`),
          (l += f(c, "رنگ قالب", "theme")),
          (l += f(u, "سر تیتر", "header")),
          (l += f(u, "نوار کناری", "sidebar")),
          (l += f(u, "پخش کننده", "player")),
          (l +=
            '<p class="mt-4">توجه: می توانید افکت تغییر رنگ سرتیتر ، نوار کناری و پخش کننده را در صفحات داخلی مشاهده کنید.</p></div></div>'),
          (n.id = d),
          (n.innerHTML = l),
          s.appendChild(n),
          b(),
          i.dark
            ? e('[data-theme-option="dark"]').addClass("active")
            : e('[data-theme-option="light"]').addClass("active"),
          e("[data-header-option=" + i.header + "]").addClass("active"),
          e("[data-sidebar-option=" + i.sidebar + "]").addClass("active"),
          e("[data-player-option=" + i.player + "]").addClass("active");
      }),
      (e.settings.defaults = {
        dark: !1,
        header: null,
        sidebar: null,
        player: null,
      });
  })(jQuery, window, document);
var Utils = {
  getCSSVarValue: function (e) {
    var t = getComputedStyle(document.documentElement).getPropertyValue(
      "--bs-" + e
    );
    return t && t.length > 0 && (t = t.trim()), t;
  },
  getLocalItem: function (e) {
    return JSON.parse(localStorage.getItem(e));
  },
  setLocalItem: function (e, t) {
    localStorage.setItem(e, JSON.stringify(t));
  },
  removeLocalItem: function (e) {
    localStorage.removeItem(e);
  },
  showMessage: function (e) {
    Snackbar.show({
      pos: this.isRTL() ? "bottom-left" : "bottom-right",
      text: e,
      showAction: !1,
    });
  },
  changeSkin: function () {
    setTimeout(() => {
      ChartJs.overrideDefaults(), Dashboard.init(), Player.volumeBackground();
    }, 10);
  },
  isDarkMode: function () {
    return "dark" === document.querySelector("body").getAttribute("data-theme");
  },
  isRTL: function () {
    return "rtl" === document.querySelector("html").getAttribute("direction");
  },
};
"undefined" != typeof module &&
  void 0 !== module.exports &&
  (module.exports = Utils);
//# sourceMappingURL=scripts.bundle.js.map

$("document").ready(function() {
  setTimeout(function() {
      $('.nav-tabs .nav-item .active').click();
      $('.nav-tabs .nav-item .active').trigger('click');
  });
});
jalaliDatepicker.startWatch({
  minDate: "attr",
  maxDate: "attr"
}); 
