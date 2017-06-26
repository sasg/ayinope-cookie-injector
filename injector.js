chrome.runtime.sendMessage({search: location.search}, function(response) {
    console.log(response);
});