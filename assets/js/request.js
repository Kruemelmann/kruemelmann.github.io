//TODO
// add a cache to the get so if i call an api like nasa for example the pic of the day. I don't waist API-calls on loading the same image over and over again.

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

