function getURLParameter(name, search) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function setCookie(name, site, value) {
  chrome.cookies.set({"name": name, "url": site, "value": value},function (cookie){
    console.log(JSON.stringify(cookie));
  });
}

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    cookie = getURLParameter("cookie_name", request.search);
    site = decodeURI(getURLParameter("site", request.search));
    value = getURLParameter("cookie_value", request.search);
    setCookie(cookie, site, value);
    sendResponse([cookie, site, value]);
    var domain = extractDomain(site);
    var successOptions = {
      type: "basic",
      title: "Cookie Set",
      message: domain,
      iconUrl: "ayinope.png"
    };
    var failureOptions = {
      type: "basic",
      title: "Cookie Not Set",
      message: "Cookie data incorrect or not found",
      iconUrl: "ayinope.png"
    };
    var options = domain !== "null" ? successOptions : failureOptions;
    chrome.notifications.create("cookie set", options, function(id) {
    });
  }
);