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

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let cookie = {
      name: getURLParameter('cookie_name', request.search),
      url: getURLParameter('cookie_domain', request.search),
      value: getURLParameter('cookie_value', request.search)
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
      sendResponse(cookie);
    }
  }
);
