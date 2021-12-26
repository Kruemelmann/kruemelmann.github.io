function searchPost() {
    let searchbar = document.getElementById("searchbar");
    let postcontainer = document.querySelector(".blog-list");
    let arr = postcontainer.getElementsByTagName("li");
    for (i = 0; i < arr.length; i++) {
        str = arr[i].textContent || arr[i].innerText;
        if (str.indexOf(searchbar.value) > -1) {
            arr[i].style.display = "";
        } else {
            arr[i].style.display = "none";
        }
    }
}

