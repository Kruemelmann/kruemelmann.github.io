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

## Example Get the Picture of the day

Lets start with a very easy example.
In the following canvas you get the image of the day from the Nasa API.


<div>
    <img id="picoftheday" style="width: 100%; height=auto;">
    <div id="videooftheday-container" style="position: relative;padding-bottom: 56.25%; /* 16:9 */height: 0;" >
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

        switch (res_parsed.media_type) {
            case "image":
                document.getElementById("picoftheday").src=res_parsed.hdurl;
                document.getElementById("videooftheday-container").style.display="none";
                document.getElementById("picoftheday").style.display="";
                break;
            case "video":
                document.getElementById("videooftheday").src=res_parsed.url;
                document.getElementById("picoftheday").style.display="none";
                document.getElementById("videooftheday-container").style.display="";
                break;
            default:
                console.log("Error loading maybe to many requests")
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


## Programmatically access

If you set your API key to the cookie you can make ca ~1000 Requests per hour and per IP.
If you did not set the key I internally use the 'DEMO_KEY' which can call the API 30 times
per hour per IP.

```javascript
let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
//parse the response
let res_parsed = await response.json();
```

This code snippet fetches a JSON object from NASA's API. Depending on the media_type which
can be found inside this JSON object you either get a picture or a video.

```javascript
switch (res_parsed.media_type) {
  case "image":
  case "video":
}
```
You can switch-case this so you can handle the image in a different way than the video.
All in all if you came to this point you get a positive response from the API so everything that I will show now is completely optional.

```javascript
document.getElementById('picoftheday_title').innerText = res_parsed.title
if(res_parsed.copyright != undefined) {
    document.getElementById('picoftheday_copyright').innerText = res_parsed.copyright
} else {
    document.getElementById('picoftheday_copyright').innerText = "none"
}
```
Independently of the media_type you get a 'title' entry in the JSON. Plus if the media
has a copyright you get an entry for this as well.

## Query Parameters
### 'api_key'-Parameter

The api_key is the most important parameter of them all:) if you don't set it you will get
no valid response from the API. Like mentioned above you can generate it [here](https://api.nasa.gov/)

#### Example
```javascript
let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
```

### 'data'-Parameter

If you want a specific 'picture of the day' you can get this as well. You just need to
add a query parameter to your request and the API will give you the image/video of this day.

#### Example
```javascript
let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2021-01-01');
```

### 'count'-Parameter

If you want to get a random selection of images of the day than you can add the count
parameter to you request and you get a selection of images. The parameter is called
count because the selection has *count* elements.

#### Example
```javascript
let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5');
```


### Other Parameters

The parameter above are just the three in my opinion most interesting once but there are more:)
you can find the others [here](https://api.nasa.gov/#apod).

---
**Fun Fact**

I dont know if this is documented somewhere but if you want to scroll down on the
api.nasa.gov page you can add for example an *#apod* anchor to the route and a
script will try to scroll down 1/2 second after you open the page.
I found this by reading the source code:) and think this is very handy.

---
