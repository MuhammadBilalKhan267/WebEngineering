// Toggle Widget Options
function toggleWidget() {
    const options = document.getElementById("options");
    // Get all elements with the class 'style-menu'
    const styleMenus = document.querySelectorAll('.style-menu');

    // Filter out the ones that do not have the 'hidden' class
    const unhiddenMenus = Array.from(styleMenus).filter(menu => !menu.classList.contains('hidden'));

    // Get the count of unhidden menus
    const unhiddenCount = unhiddenMenus.length;

    if (options.style.display === "block"){
        options.style.display = "none";
    }
    else if (unhiddenCount>0) {

        closeMenus();
        
    }
    else {
        options.style.display = "block";
    }
}
  
  // Open Background Color Menu
function openBackgroundColorMenu(event) {
    event.stopPropagation();
    populateSectionList("section-selector-bg");
    closeMenus();
    document.getElementById("background-color-menu").classList.remove("hidden");
}
  
// Open Text Style Menu
function openTextStyleMenu(event) {
    event.stopPropagation();
    populateSectionList("section-selector-text");
    closeMenus();
    document.getElementById("text-style-menu").classList.remove("hidden");
}
  
// Open Text Style Menu
function openResetStyleMenu(event) {
    event.stopPropagation();
    populateSectionList("section-selector-text");
    closeMenus();
    document.getElementById("reset-style-menu").classList.remove("hidden");
}

let originalStyles = {}; // Cache to store original styles of sections

// Cache Original Styles on Page Load
document.addEventListener("DOMContentLoaded", () => {
  cacheOriginalStyles();
  populateSectionList("section-selector-bg");
  populateSectionList("section-selector-text");
  populateSectionList("reset-section-selector"); // Populate Reset dropdown
});

// Cache the original styles for all sections
function cacheOriginalStyles() {
  const bodyChildren = document.body.children;
  let reachedFooter = false;

  originalStyles["body"] = {
    backgroundColor: document.body.style.backgroundColor || "",
    fontStyle: document.body.style.fontStyle || "",
    fontWeight: document.body.style.fontWeight || "",
    textDecoration: document.body.style.textDecoration || "",
    color: document.body.style.color || "",
  };

  Array.from(bodyChildren).forEach((child) => {
    if (!reachedFooter && child.id && isVisible(child)) {
      originalStyles[child.id] = {
        backgroundColor: child.style.backgroundColor || "",
        fontStyle: child.style.fontStyle || "",
        fontWeight: child.style.fontWeight || "",
        textDecoration: child.style.textDecoration || "",
        color: child.style.color || "",
      };
    }

    if (child.tagName.toLowerCase() === "footer") {
        reachedFooter = true;
      }
  });
}

// Check if an element is visible
function isVisible(element) {
  return element.style.display !== "none" && element.offsetParent !== null;
}

// Populate Section List Dynamically (For Reset and Style Menus)
function populateSectionList(selectorId) {
  const sectionSelector = document.getElementById(selectorId);
  sectionSelector.innerHTML = ""; // Clear existing options

  const bodyChildren = document.body.children;
  let reachedFooter = false;
  console.log(Array.from(bodyChildren));
  Array.from(bodyChildren).forEach((child) => {

    if (!reachedFooter && child.id && isVisible(child) && child.id !== "widget") {
      const option = document.createElement("option");
      option.value = child.id;
      option.textContent = child.id;
      sectionSelector.appendChild(option);
    }

    if (child.tagName.toLowerCase() === "footer") {
        reachedFooter = true;
    }

  });

  // Add an option for the body
  const wholeDocOption = document.createElement("option");
  wholeDocOption.value = "body";
  wholeDocOption.textContent = "body";
  sectionSelector.appendChild(wholeDocOption);
}

// Apply Background Color
function applyBackgroundColor() {
  const color = document.getElementById("color-picker").value;
  const section = document.getElementById("section-selector-bg").value;

  if (section === "body") {
    document.body.style.backgroundColor = color;
  } else {
    const target = document.getElementById(section);
    if (target) target.style.backgroundColor = color;
  }
  closeMenus();
}

// Apply Text Style (Font Style and Color)
function applyTextStyle() {
  const style = document.getElementById("font-style").value;
  const color = document.getElementById("text-color").value;
  const section = document.getElementById("section-selector-text").value;

  const target = section === "body" ? document.body : document.getElementById(section);
  if (target) {
    target.style.fontStyle = style === "italic" ? "italic" : "normal";
    target.style.fontWeight = style === "bold" ? "bold" : "normal";
    target.style.textDecoration = style === "underline" ? "underline" : "none";
    target.style.color = color;
  }
  closeMenus();
}

// Reset Styles (To Original)
function resetStyles(event) {
  event?.stopPropagation();
  const section = document.getElementById("reset-section-selector").value;

  if (section === "body") {
    const original = originalStyles["body"];
    for (let property in original) {
      document.body.style[property] = original[property];
    }
  } else {
    const target = document.getElementById(section);
    if (target && originalStyles[section]) {
      const original = originalStyles[section];
      for (let property in original) {
        target.style[property] = original[property];
      }
    }
  }
  closeMenus();
}

// Close all menus
function closeMenus() {
  document.querySelectorAll(".style-menu").forEach((menu) => menu.classList.add("hidden"));
  document.getElementById("options").style.display = "none";
}
