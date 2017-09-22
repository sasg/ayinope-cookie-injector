getURLParameter = (name, search) => {
  let re = '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)';
  let result = new RegExp(re).exec(search) || [null, ''];
  let plusEncoded = result[1].replace(/\+/g, '%20'); 
  return decodeURIComponent(plusEncoded) || null;
};

setCookie = (cookie) => {
  chrome.cookies.set(cookie, (res) => {
    console.log(JSON.stringify(res));
  });
};

getDomain = (url) => {
  let domain = url.indexOf('://') > -1 ? url.split('/')[2] : url.split('/')[0];
  return domain.split(':')[0];
};

cookieValid = (cookie) => {
  let valid = true;
  for (let property in cookie) {
    if (cookie.hasOwnProperty(property)) {
      if (typeof cookie[property] == 'undefined' || cookie[property] == null) {
        valid = false;
      }
    }
  }
  return valid;
};

setCookieIfValid = (name, url, value) => {
  let cookie = {
    name: name,
    url: url,
    value: value
  };
  if (cookieValid(cookie)) {
    setCookie(cookie);
    let domain = getDomain(cookie.url);
    let notification = {
      type: 'basic',
      title: 'Cookie Set',
      message: domain,
      iconUrl: 'ayinope.png'
    };
    chrome.notifications.create('cookie set', notification, (id) => { });
    return cookie;
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let is_multi = getURLParameter('is_multi', request.search);
    let names = getURLParameter('cookie_name', request.search);
    let urls = getURLParameter('cookie_domain', request.search);
    let values = getURLParameter('cookie_value', request.search);
    if (is_multi) {
      names = JSON.parse(names);
      urls = JSON.parse(urls);
      values = JSON.parse(values);
      let cookies = []
      for (let i = 0; i < names.length; i++) {
        cookies.push(setCookieIfValid(names[i], urls[i], values[i]));
      }
      sendResponse(cookies);
    } else {
      setCookieIfValid(names, urls, values);
      sendResponse(cookie);
    }
  }
);
