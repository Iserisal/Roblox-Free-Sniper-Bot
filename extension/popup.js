document.addEventListener('DOMContentLoaded', function() {
  var scriptCheckbox = document.getElementById('scriptCheckbox');
  var refreshCheckbox = document.getElementById('refreshCheckbox');
  var delayInput = document.getElementById('delayInput');

  scriptCheckbox.addEventListener('change', function() {
    var enabled = scriptCheckbox.checked;
    sendMessageToActiveTab({ enabled: enabled });
  });

  refreshCheckbox.addEventListener('change', function() {
    var enabled = refreshCheckbox.checked;
    sendMessageToActiveTab({ refreshEnabled: enabled });
  });

  delayInput.addEventListener('change', function() {
    var delay = parseInt(delayInput.value, 10);
    sendMessageToActiveTab({ delay: delay });
  });

  document.getElementById('discordButton').addEventListener('click', function() {
    window.open('https://discord.gg/E4bz45gMtp', '_blank');
  });

  function sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
