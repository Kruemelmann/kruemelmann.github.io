---

layout: blog
title: Nasa API Setup
published: true
tags: space nasa

---

In this article i would like to show you how you can play around with the nasa API.

## Requirements

To call the nasa API you need a valid API key available if not then you need to accept some limitations because internal i then use the "DEMO_KEY".
Please enter your API key in this input field and submit it by using the button:
<div>
    <script>
    function setAPItoCookie(e) {
        let form = new FormData(e.target);
        let apikey = form.get("apikey");
        console.log(apikey)
    }
    </script>
    <form onsubmit="setAPItoCookie(event)">
        <label for="apikey">Your nasa API-key:</label>
        <input type="text" id="apikey" name="apikey">
        <input type="submit" value="Set api key to cookie">
    </form>
</div>

Now that we got the requirements all setup we can start using the API.

## Example 1. Get the Picture of the day

Lets start with a very easy example.
In the following canvas you get the image of the day from the Nasa API.


<div>
    <img id="picoftheday" style="width: 100%; height=auto;">
    <div>
    <div>
        Title: <span id="picoftheday_title"></span>
    </div>
    <div>
        Copyright: <span id="picoftheday_copyright"></span>
    </div>
    </div>
    <script>
    (async () => {
    let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    let res_parsed = await response.json();

    document.getElementById("picoftheday").src=res_parsed.hdurl;
    //set some metadata about the image
    document.getElementById('picoftheday_copyright').innerText = res_parsed.copyright
    document.getElementById('picoftheday_title').innerText = res_parsed.title

    })();
    </script>
</div>



