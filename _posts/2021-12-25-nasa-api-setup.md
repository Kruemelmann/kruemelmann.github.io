---

layout: blog
title: Nasa API Setup
published: true
tags: space nasa

---

In this article i would like to show you how you can play around with the nasa API.

## Requirements

<div>
    <style>
    .nasaform{
        border: solid white 1px;
        padding: 10px;
    }
    </style>
    <script>
    function setAPItoCookie(e) {
        let form = new FormData(e.target);
        let apikey = form.get("apikey");
        console.log(apikey)
    }
    </script>
    <form class="nasaform" onsubmit="setAPItoCookie(event)">
    <div>
    To call the nasa API you need a valid API key available if not then you need to accept some limitations because internal i then use the "DEMO_KEY".
    Please enter your API key in this input field and submit it by using the button:
    </div>
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
    <div style="position: relative;padding-bottom: 56.25%; /* 16:9 */height: 0;" >
        <iframe id="videooftheday" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"></iframe>
    </div>
    <div>
        <div>Title: <span id="picoftheday_title"></span></div>
        <div>Copyright: <span id="picoftheday_copyright"></span></div>
    </div>
    <script>
    (async () => {
        let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        let res_parsed = await response.json();

        if (res_parsed.media_type == "image") {
            document.getElementById("picoftheday").src=res_parsed.hdurl;
            document.getElementById("videooftheday").style.display="none";
            document.getElementById("picoftheday").style.display="";
        } else if (res_parsed.media_type == "video") {
            document.getElementById("videooftheday").src=res_parsed.url;
            document.getElementById("picoftheday").style.display="none";
            document.getElementById("videooftheday").style.display="";
        }

        //set some metadata about the image
        document.getElementById('picoftheday_title').innerText = res_parsed.title
        if(res_parsed.copyright != undefined) {
            document.getElementById('picoftheday_copyright').innerText = res_parsed.copyright
        } else {
            document.getElementById('picoftheday_copyright').innerText = "none"
        }
    })();
    </script>
</div>



