kruemelmann.github.io
=====================

This is my little blog about weird and hacky stuff;)

Location
--------

[kruemelmann.github.io](https://kruemelmann.github.io)

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


Testing
-------

<!--TODO add more information-->
The project uses cypress for e2e tests

```bash
bazel test //:e2e
```

Show Go Code Coverage
```bash
bazel coverage //:wasm
```

Run Go Unittests
```bash
bazel test //:wasm
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
