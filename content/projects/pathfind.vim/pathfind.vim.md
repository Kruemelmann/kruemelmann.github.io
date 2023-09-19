---
title: "Pathfind.vim"
date: 2023-06-11T05:19:37+02:00
draft: false
tags: ["foo", "bar"]
---


pathfind is my first small Vim Plugin. It wrapps around grep and searches all underlying files for a specific pattern.


Using [vim-plug](https://github.com/junegunn/vim-plug):

```vim
Plug 'kruemelmann/pathfind.vim'
```

## Usage

### Mappings

- `<leader>F` if you highlighted a word with `*` it will search for the highlighted pattern
- `<leader>F` if nothing is highlighted or you turned of with `:nohl` you get a input promt

---
**NOTE**

Watch out where you are running this. Takes long if it searches many files.
You can stop it by pressing `<cr>c`.

---


