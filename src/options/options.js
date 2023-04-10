const CHROME_SYNC_STORAGE_KEY = "ops-buddy-4633f243"; // unique key name to use storage

// Saves options to chrome.storage
const saveOptions = () => {
  const qa_sites = document.getElementById("qa_sites").value;
  const prod_sites = document.getElementById("prod_sites").value;

  chrome.storage.sync.set(
    {
      [CHROME_SYNC_STORAGE_KEY]: { qa_sites: qa_sites, prod_sites: prod_sites },
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { [CHROME_SYNC_STORAGE_KEY]: { qa_sites: "", prod_sites: "" } },
    (items) => {
      document.getElementById("prod_sites").value =
        items[CHROME_SYNC_STORAGE_KEY]["prod_sites"];
      document.getElementById("qa_sites").value =
        items[CHROME_SYNC_STORAGE_KEY]["qa_sites"];
    }
  );
  console.info("ops-buddy Options loaded");
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
