---

layout: blog
title: jekyll-setup
published: true
tags: jekyll golang bazel

---

In this article i would like to show you how to install the required tools to build this blog.

> The installation process is obsolete if i am finished writing my jekyll bazel rule. Then you only need to have bazel installed but for now that is the way to build this jekyll page.

## Requirements

On MacOs you need to run be:
```bash
xcode-select --install
```

After this add the following line to your terminal configuration file (in my case ~/.zshrc):
```bash
export SDKROOT=$(xcrun --show-sdk-path)
```

## Installation

### Ruby installation and setup
1. Install Ruby

Use [brew](https://brew.sh) to install ruby:
```bash
brew install ruby
```
2. Adding ruby and gems paths to the PATH variable

In my case zsh:
```bash
echo 'export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH"' >> ~/.zshrc
```
3. (On mojave you need to have openssl installed)
```bash
brew install openssl
```


4. (on certain versions of MacOs you need to install the bundler and the jekyll gem by hand)
Like the following:

```bash
gem install bundler jekyll
```

### golang installation

This project uses golang to play around with webassembly. So in order to get ide/editor support for the code you need go installed.
(You only need it for your local tools if you only want to build the page you don't need to install go since I use bazel to build this page)

1. Go to the download page of Golang
[Download page](https://go.dev/doc/install)

The installation is straight forward :) so just follow the instructions.


### bazel installation

In the future i want to use bazel as my main buildsystem but for now it can only build my go/webassembly part.
For the management of the bazel version i use [bazelisk](https://www.url.com).
bazelisk wrapps around bazel and manage its versions for you. (comparable to nvm in node)
In the project you can find the bazelisk configuration file. So you only need to install it and it does all the rest for you.

1. Install bazelisk using brew
```bash
brew install bazelisk
```

## Conclusion

Now all tools you need are installed and you are able to work on this blog:) Lets have some fun... :)

