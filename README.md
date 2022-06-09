kruemelmann.github.io
=====================

This is my little blog about weird and hacky stuff;)

You can find it
---------------

[kruemelmann.github.io](https://kruemelmann.github.io)

TODOs
--------
* add conditional requests to golem (github has a request limit)
    https://docs.github.com/en/rest/overview/resources-in-the-rest-api#conditional-requests
* filter function does not work after grid refactoring on blog overview

Building
--------

You can build the page by running:
```bash
bazel build  //:site
```

Build wasm:
```bash
bazel build //:wasm
```


Usage
-----

To start the website locally in your browser:
```bash
bazel run //:site
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
