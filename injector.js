chrome.runtime.sendMessage({ search: location.search }, (response) => {
  console.log(response);
});
