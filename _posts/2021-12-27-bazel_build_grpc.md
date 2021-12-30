---

layout: blog
title: how you can build grpc with bazel
published: true
tags: bazel golang
---

In this article I show how I am building grpc and golang
with bazel and still have the option to work with an editor
like vim.

---
**Disclaimer**

Status: Draft this article is not finished yet

The following article covers an idea of mine:) so please if you think thats a bad one open an issue and we can talk about.
Dont hate or insult thats not the way how this works;)

---

## Table of Contents

1. [General](#general)
2. [Ideas](#ideas)

## General
First of all I would like to say if you get to this problem.
There are other ideas that are much better than mine.
For example if you search a bit you will find an [issue](https://github.com/bazelbuild/rules_go/issues/512) about
this problem on github in rules_go.
If you find a good solution to this problem please open an issue
as well, i would be happy to get this problem out of the way.
For all that don't know what I am talking about I quickly
explain the problem. For example you have a go-based
microservice and want to communicate via grpc you need to
compile your proto files to go code in order to use them inside your source code.
You can build the grpc files with the method [go_proto_libary](https://github.com/bazelbuild/rules_go/blob/master/proto/core.rst#go_proto_library)
declared and documented in the [rules_go](https://github.com/bazelbuild/rules_go/blob/master/proto/core.rst#go-protocol-buffers)
Two ways of working with proto buffer and bazel are described in
the documentation.

The first is to generate to code at build time that's the
"cleanest" way of doing this. Why you ask? Simply because if
bazel builds your proto buffers you get all the benefits of
bazel like hermetic, fast builds etc. This works of course *but*
If you let bazel build the files they are encapsulated from your
editor or IDE. So you get no code completion or syntax
highlighting. That's painful especially if you are working on
a bigger microservice than hello world or a small chat:)

The second way that is described in the docs is to pregenerate
the files by hand and disable gazelle on this files.
That easy but you lose many of the advantages of bazel in my
opinion. If you check the into git you waste space since
you don't need the generated code because everyone can
generate it locally from the .proto files.
Also you indirectly  break the hermetic builds because
not bazel is building the files but the one that is compiling
the proto file with all its local settings and configurations.
The advantage of this way is that you get code completion and
all the nice editor/IDE features.

## Ideas
Now I will show how I am doing it. I am not happy about this
but for now there is no other way as far as I know.

### Generate proto-Files by hand
This is similar to the second way mentioned above.

In the root of my project I put a bash script that is called
*rebuild_pb_grpc.sh*.
So if others builds it, everyone uses the same build command.

```bash
#!/bin/bash

#Build the xyz
protoc -I=. --go_out=. --go-grpc_out=. pkg/pb/xyz.proto
```

All the .proto files are located in the pkg/pb/ folder.
Next I put a BUILD file into the folder which excludes all the
.proto files. It only contains one line to instruct gazelle
to not generate build targets for it.

```python
# gazelle:exclude *.proto
```

In the .proto file I configure where the grpc files should be
stored. To easily find them I generate a folder next to the
proto files that have the same name as these file.

```proto
syntax = "proto3";
option go_package = "pkg/pb/xyz;xyz";
```

After that i call gazelle which finds the new folder and
generates targets for it.

```bash
bazel run //:gazelle
```

Now you can import it with the full path and bazel is able to
cache them just as normal go files.

(Optionally you can create a .gitignore and ignore the folders
but I check them into git so that only the once who want to
work on the .proto files need the compiler locally and
all others don't need it.)


### Use the go_proto_checkedin_test

TODO before I write about this I have to test this so:) WIP

[example](https://github.com/bazelbuild/buildtools/blob/master/build_proto/BUILD.bazel)

### Use a gopackage driver

TODO before I write about this I have to test this so:) WIP

[pull-request](https://github.com/bazelbuild/rules_go/pull/2858)

[docs](https://github.com/bazelbuild/rules_go/wiki/Editor-and-tool-integration)

