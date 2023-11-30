---
title: "Including html in Markdown"
date: 2023-06-11
draft: false
tags: ["web"]
---


In the last few weeks I had many issues and problems to inlcude html into this blog posts.
I was looking for a cleaner way to do it than in my last blog and so I came up with the following idea.


## Step 1. Find the html

First step is to find the locations where the html should be included in the markdown.
To find the "mounting-points" of the html documents I wrote a custom html attribute called 'kruemel-include-html'.

```markdown
Hello Markdown
...
<div kruemel-include-html="dummy.html"></div>
...
```
So first of all I activated html in markdown so that I can add the div-element to the markdown document.
In the declaration of the div-element you can see the custom attribute 'kruemel-include-html'.

## Step 2. Insert the included document

The next step in the process is to find all elements of the DOM that are tagged with our attribute and load the documents that are referenced by the attribute.

```js
function kruemelincludeHTML() {
    var custom_htmlattr = "kruemel-include-html"
    var z, i, elmnt, file, xhttp;
    /* List of all elements in DOM*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for custom_htmlattr */
        file = elmnt.getAttribute(custom_htmlattr);
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        /* FIXME error with script blocks */
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute(custom_htmlattr);
                    kruemelincludeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}
```

Now we just need to run the function at the buttom of our page and we are finished, or are we?

```html
<script>
    kruemelincludeHTML();
</script>
```

In this you can see the FIXME comment. The first idear is to just set the innerHTML to the content of the document. BUT wait the idear is good but after some tests I found a problem with html script-Blocks.
The Problem is that script-Blocks are not executed when they are appended to the DOM.
So if we just add them to innerHTML they are rendered in the DOM but not executed.



## Step 3 Solve the problem with script-Tags

After countless hours of fiddeling around I found a solution to the problem.
The following code is a modifyed version of the first code.
The new part is the function setInnerHTML() which searches for script blocks in the appended element.
If it finds a script block it simply reappend the block to the DOM but as a script block inside the DOM.
This causes the DOM parser to execute the script.

```js
function kruemelincludeHTML() {
    var custom_htmlattr = "kruemel-include-html"
    var z, i, elmnt, file, xhttp;
    /* List of all elements in DOM*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for custom_htmlattr */
        file = elmnt.getAttribute(custom_htmlattr);
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        setInnerHTML(elmnt, this.responseText)
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    elmnt.removeAttribute(custom_htmlattr);
                    kruemelincludeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

function setInnerHTML(elm, html) {
    elm.innerHTML = html;

    Array.from(elm.querySelectorAll("script"))
        .forEach( oldScriptEl => {
            const newScriptEl = document.createElement("script");
            Array.from(oldScriptEl.attributes).forEach( attr => {
                newScriptEl.setAttribute(attr.name, attr.value)
            });
            newScriptEl.appendChild(document.createTextNode(oldScriptEl.innerHTML));
            oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });
}
```

You can see that this is an absolute pain so in order to find a better and nativ way to this problem I proposed a change this the "insertAdjacentHTML"-Funktion.
At the moment I have no response to this but we will see, I will update this blog post if [the proposal](https://github.com/w3c/DOM-Parsing/issues/76) is getting some response.
