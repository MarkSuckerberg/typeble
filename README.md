# Typeble

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MarkSuckerberg/typeble/tests.yml?label=tests)](https://github.com/MarkSuckerberg/typeble/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/MarkSuckerberg/typeble/branch/master/graph/badge.svg?token=0MTQNK5RUP)](https://codecov.io/gh/MarkSuckerberg/typeble)
[![GitHub](https://img.shields.io/github/license/MarkSuckerberg/typeble?logo=license)](LICENSE)
[![GitHub search hit counter](https://img.shields.io/github/search/MarkSuckerberg/typeble/any%20language:TypeScript?color=red&label=uses%20of%20any&logo=typescript)](https://github.com/search?q=repo%3AMarkSuckerberg%2Ftypeble+language%3ATypeScript+any&type=code)

Typeble is an unofficial Tumblr API library written entirely in typescript to fill the gap left by the [official Tumblr JS lib](https://github.com/tumblr/tumblr.js) that doesn't supply type information nor seems to support the OAuth2 standard. It's still heavily WIP, but many of the important endpoints of the API are covered.

## ⚠️ Notice ⚠️

This library is **NOT** official, endorsed, sponsored by, or otherwise associated with Tumblr in any way, shape, or form.

It was built using the API reference documents, and like any other project built using the API (including those made using this library) should conform to the [Tumblr Application Developer and API License Agreement](https://www.tumblr.com/docs/en/api_agreement). Be sure you also follow it.

## How to use

Not available on any package managers yet, nor will it work from the repo as the compiled javascript files aren't pushed. Sorry! But if it *did* work, it'd go something like this:

1. Install the package into your project with NPM
2. Import the functions you need for your project as you would any library, full documentation [here](https://marksuckerberg.github.io/typeble/)
3. Obtain an OAuth 2 token for tumblr using [my tumblr authentication library](https://github.com/MarkSuckerberg/tumblr-auth) or some other method
4. DON'T SHARE THE TOKEN WITH ANYONE! It will expire (unless it has the offline_access scope) but someone could do damage to your account if they get access to the token.
5. Pass the token as the first argument to any of the functions

## Contributing

First and foremost, once again, make sure to honour the [Tumblr Application Developer and API License Agreement](https://www.tumblr.com/docs/en/api_agreement). Don't try to bypass any rate limits, and make sure that this project isn't in any way percievable as officially endorsed by Tumblr.

Code that is not documented, is poorly documented, or is "hacky" in some way, especially parts close to the API, will likely not be added to the codebase. Code that isn't at least somewhat covered by unit tests is heavily discouraged.

### Testing

Local testing is WIP!

Truth be told, CI (tests) will likely only run on master as there is a chance of destructive actions being taken using the bot used for testing. If you want to run CI on your own fork, be sure to set the following github secrets:

- `SECRETS_ACCESS_TOKEN`: A [github PAT](https://github.com/settings/personal-access-tokens/new) (can be fine-grained) with write access to your fork's secrets (used to update the refresh token)
- `TUMBLR_CLIENT_ID`: The client ID from your Tumblr OAuth App (Can just be a normal environment variable, but oh well)
- `TUMBLR_CLIENT_SECRET`: The client secret from your Tumblr OAuth App
- `TUMBLR_REFRESH_TOKEN`: A refresh token from a successful login to a Tumblr OAuth App with the `offline_access` scope, you can use [my tumblr authentication library](https://github.com/MarkSuckerberg/tumblr-auth) from the command line with the scope parameter set to include `offline_access` and the json option set to get the full response (which includes the refresh token)

## Roadmap

- [Cover all (documented) endpoints](https://github.com/MarkSuckerberg/typeble/issues/3)
- Add support for OAuth1/plain access token authentication where possible
- Release on NPM
- Starter template using this project

## Other Resources

- [Tumblr API Documentation](https://www.tumblr.com/docs/en/api/v2)
- [Tumblr OAuth Apps](https://www.tumblr.com/oauth/apps)
- [Tumblr API Console](https://api.tumblr.com/console)
