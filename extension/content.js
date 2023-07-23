let enabled = false;
let refreshEnabled = false;
let delay = 1000; // Default delay time in milliseconds
let refreshIntervalId;

function snipeitem() {
  const buttons = document.querySelectorAll('button');
  const buyButton = Array.from(buttons).find(button => button.textContent === 'Buy');
  const itemPrice = document.querySelector('div.item-price-value span.text');

  if (enabled && buyButton && itemPrice && itemPrice.textContent === 'Free') {
    buyButton.click();
  }
}

function refreshItems() {
  const refreshButton = document.querySelector('span#refresh-details-button');

  if (refreshButton && refreshEnabled) {
    refreshButton.click();
  }
}

chrome.runtime.onMessage.addListener(function(request) {
  if (request.enabled !== undefined) {
    enabled = request.enabled;
  }
  if (request.refreshEnabled !== undefined) {
    refreshEnabled = request.refreshEnabled;
    if (!refreshEnabled && refreshIntervalId) {
      clearInterval(refreshIntervalId); // Stop the refresh action when disabled
      refreshIntervalId = null;
    } else if (refreshEnabled && !refreshIntervalId) {
      refreshIntervalId = setInterval(refreshItems, delay); // Start the refresh action if enabled
    }
  }
  if (request.delay !== undefined) {
    delay = request.delay;
    if (refreshEnabled && refreshIntervalId) {
      clearInterval(refreshIntervalId); // Clear the previous interval
      refreshIntervalId = setInterval(refreshItems, delay); // Start a new interval with the updated delay
    }
  }
});

setInterval(snipeitem, 100); // Run snipeitem function without delay

