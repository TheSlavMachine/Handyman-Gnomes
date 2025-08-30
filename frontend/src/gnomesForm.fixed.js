let pageState = 0;
let pageList = [];

// Event wiring
const formEl = document.querySelector("#applianceForm");
const contentsEl = formEl.querySelector(".FormContents");
const resultContainerEl = document.querySelector("#result-container");
const jsonOutputEl = document.querySelector("#json-output");

formEl.addEventListener("click", (e) => {
  if (e.target.closest(".next-button")) {
    e.preventDefault();
    getNextPage();
  } else if (e.target.closest(".prev-button")) {
    e.preventDefault();
    getPreviousPage();
  } else if (e.target.closest(".submit-button")) {
    e.preventDefault();
    handleSubmit();
  }
});

function toggleAlert(pageId, show) {
  const alertBox = contentsEl.querySelector(`#${pageId} .alert`);
  if (alertBox) alertBox.style.display = show ? "block" : "none";
}

// Validation for a step page
function verifyChoicePage(pageId) {
  const typeItems = Array.from(contentsEl.querySelectorAll(`#${pageId} .TypeItem`));
  const brandItems = Array.from(contentsEl.querySelectorAll(`#${pageId} .OptionItem`));
  const typeOK = typeItems.some((el) => el.checked);
  const brandOK = brandItems.some((el) => el.checked);
  return typeOK && brandOK;
}

// Build the ordered page flow based on selected appliances
function getAllPages() {
  toggleAlert("appliance-range", false);

  const checkList = Array.from(contentsEl.querySelectorAll(".ApplianceItem"));
  const applianceTypes = {
    cooktop: "cookTop-page",
    dishwasher: "dishwasher-page",
    dryer: "dryer-page",
  };

  const list = [contentsEl.querySelector("#appliance-range")];

  for (const cb of checkList) {
    if (cb.checked && applianceTypes[cb.name]) {
      list.push(contentsEl.querySelector(`#${applianceTypes[cb.name]}`));
    }
  }

  if (list.length === 1) {
    toggleAlert("appliance-range", true);
    return [];
  }

  list.push(contentsEl.querySelector("#account-page"));
  return list;
}

function updateWizardView() {
    pageList.forEach((page, index) => {
        if (index === pageState) {
            page.classList.add("active");
            
            const prevBtn = page.querySelector('.prev-button');
            const nextBtn = page.querySelector('.next-button');

            if(prevBtn) {
                prevBtn.style.display = pageState > 0 ? 'inline-block' : 'none';
            }
            if(nextBtn) {
                nextBtn.style.display = pageState < pageList.length - 1 ? 'inline-block' : 'none';
            }
        } else {
            page.classList.remove("active");
        }
    });

    if (pageList.length > 0) {
        pageList[pageState].scrollIntoView({ behavior: "smooth", block: "start" });
    }
}


// Navigation
function getNextPage() {
  if (pageState === 0) {
    pageList = getAllPages();
  }
  if (pageList.length === 0) return;

  if (pageState > 0) {
    const curId = pageList[pageState].id;
    const ok = verifyChoicePage(curId);
    toggleAlert(curId, !ok);
    if (!ok) {
      return;
    }
  }

  if (pageState < pageList.length - 1) {
    pageState++;
    updateWizardView();
  }
}

function getPreviousPage() {
    if (pageState > 0) {
        pageState--;
        updateWizardView();
    }
}

// Simple submit handler that gathers answers and logs them
function handleSubmit() {
  const payload = {
    appliances: Array.from(contentsEl.querySelectorAll(".ApplianceItem:checked")).map((el) => el.value),
    selections: {},
    account: {
      name: contentsEl.querySelector('#account-name')?.value?.trim() || "",
      email: contentsEl.querySelector('#account-email')?.value?.trim() || "",
    },
  };

  const pages = {
    "cookTop-page": "Cooktop",
    "dishwasher-page": "Dishwasher",
    "dryer-page": "Dryer",
  };

  for (const [pageId, label] of Object.entries(pages)) {
    if (!contentsEl.querySelector(`#${pageId}`)) continue;
    if (!pageList.find((p) => p.id === pageId)) continue; // not in flow
    const types = Array.from(contentsEl.querySelectorAll(`#${pageId} .TypeItem:checked`)).map((el) => el.value);
    const brands = Array.from(contentsEl.querySelectorAll(`#${pageId} .OptionItem:checked`)).map((el) => el.value);
    payload.selections[label] = { types, brands };
  }

  // Very light validation for account info
  const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.account.email);
  if (!payload.account.name || !emailOK) {
    alert("Please enter a valid name and email to submit.");
    return;
  }

  console.log("Handyman request:", payload);
  
  jsonOutputEl.textContent = JSON.stringify(payload, null, 2);
  resultContainerEl.style.display = "block";
  resultContainerEl.scrollIntoView({ behavior: 'smooth' });
  alert("Request captured! Check console for payload and scroll down to see JSON output.");
}
