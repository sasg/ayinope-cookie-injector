# AYINOPE Cookie Injector

This is a simple interface for manually injecting cookies via query params. This is useful for transferring cookies to a Chrome session from another source.

## Usage

This extension looks for the presence of three specific query parameters:

`cookie_domain`: The domain to inject a cookie into. This can be a full URL (https://github.com/kfichter) or just a domain (github.com).

`cookie_name`: Name of the cookie to inject.

`cookie_value`: Value of the cookie to inject.

*NOTE*: These cookies *must* be [URL encoded](https://meyerweb.com/eric/tools/dencoder/). You'll make a broken URL if they aren't.

## Example

For example, if trying to inject `"ayinope_test_cookie_name": "ayinope_test_cookie_value"` into `github.com`, you might add:

```
cookie_domain=https%3A%2F%2Fgithub.com&cookie_name=ayinope_test_cookie_name&cookie_value=ayinope_test_cookie_value
```

to the query string.

A full example URL:

```
https://github.com/kfichter?cookie_domain=https%3A%2F%2Fgithub.com&cookie_name=ayinope_test_cookie_name&cookie_value=ayinope_test_cookie_value
```