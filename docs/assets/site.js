/* T-cut site behaviour. No dependencies, no build step, no tracking.
 * Progressive enhancement only: every section is readable with JS disabled.
 */
(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var STORAGE_KEY = "tcut-theme";
  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function stored() {
    try {
      var theme = localStorage.getItem(STORAGE_KEY);
      return theme === "dark" || theme === "light" ? theme : null;
    } catch (e) {
      return null; /* private mode or storage disabled */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      var toLight = theme === "dark";
      toggle.setAttribute("aria-pressed", String(theme === "light"));
      toggle.setAttribute(
        "aria-label",
        toLight ? "Switch to light theme" : "Switch to dark theme"
      );
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--surface-base").trim());
  }

  applyTheme(stored() || systemTheme());

  if (toggle) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* nothing to persist to; the choice still applies for this page view */
      }
    });
  }

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: light)");
    var onSystemChange = function () {
      if (!stored()) applyTheme(systemTheme());
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------- Floating status bar ---------- */
  /* Visible only between the hero actions and the closing band. Without
   * IntersectionObserver (or without JS) it stays hidden: the hero already says the same. */
  var floatBar = document.querySelector("[data-float-cta]");
  var heroActions = document.querySelector("[data-hero-actions]");
  var closing = document.querySelector("[data-closing]");
  if (floatBar && heroActions && "IntersectionObserver" in window) {
    var pastHero = false;
    var atEnd = false;
    var syncFloat = function () {
      floatBar.classList.toggle("is-visible", pastHero && !atEnd);
    };
    floatBar.hidden = false;
    new IntersectionObserver(function (entries) {
      var e = entries[entries.length - 1];
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      syncFloat();
    }).observe(heroActions);
    if (closing) {
      new IntersectionObserver(function (entries) {
        var e = entries[entries.length - 1];
        /* Stay hidden from the closing band through the footer. */
        atEnd = e.isIntersecting || e.boundingClientRect.top < 0;
        syncFloat();
      }).observe(closing);
    }
  }

  /* ---------- Roadmap: upgrade stacked sections into a tablist ---------- */
  var tabsRoot = document.querySelector("[data-phase-tabs]");
  if (!tabsRoot) return;

  var tabs = Array.prototype.slice.call(tabsRoot.querySelectorAll("[data-phase-tab]"));
  var panels = Array.prototype.slice.call(tabsRoot.querySelectorAll("[data-phase-panel]"));
  if (!tabs.length || tabs.length !== panels.length) return;

  var list = tabsRoot.querySelector("[data-phase-tablist]");
  if (list) {
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-label", "Development phases");
    var layout = window.matchMedia("(min-width: 56rem)");
    var setOrientation = function () {
      list.setAttribute("aria-orientation", layout.matches ? "vertical" : "horizontal");
    };
    setOrientation();
    layout.addEventListener("change", setOrientation);
    Array.prototype.forEach.call(list.children, function (li) {
      li.setAttribute("role", "presentation");
    });
  }

  function select(index, moveFocus) {
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute("aria-selected", String(on));
      tab.setAttribute("tabindex", on ? "0" : "-1");
      panels[i].hidden = !on;
    });
    /* The roadmap sun (CSS) follows the selected phase along its arc. */
    tabsRoot.style.setProperty("--p", String(index));
    if (moveFocus) tabs[index].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panels[i].id);
    panels[i].setAttribute("role", "tabpanel");
    panels[i].setAttribute("aria-labelledby", tab.id);
    panels[i].setAttribute("tabindex", "0");
    /* The visible heading inside each panel is redundant once tabs exist. */
    var h = panels[i].querySelector("[data-phase-heading]");
    if (h) h.classList.add("visually-hidden");

    tab.addEventListener("click", function (event) {
      event.preventDefault();
      select(i, false);
    });

    tab.addEventListener("keydown", function (event) {
      var key = event.key;
      var vertical = list && list.getAttribute("aria-orientation") === "vertical";
      var next = null;
      if (key === (vertical ? "ArrowDown" : "ArrowRight")) next = (i + 1) % tabs.length;
      else if (key === (vertical ? "ArrowUp" : "ArrowLeft")) next = (i - 1 + tabs.length) % tabs.length;
      else if (key === "Home") next = 0;
      else if (key === "End") next = tabs.length - 1;
      else if (key === " ") next = i;
      if (next === null) return;
      event.preventDefault();
      select(next, true);
    });
  });

  var initial = tabs.findIndex
    ? tabs.findIndex(function (t) { return t.hasAttribute("data-phase-default"); })
    : -1;
  select(initial > -1 ? initial : 0, false);
})();
