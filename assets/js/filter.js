
//TODO document global
let activecategories = new Set();

function filterBlogPosts() {
    let searchbar = document.getElementById("searchbar");
    let postcontainer = document.querySelector(".blog-list");
    let arr = postcontainer.getElementsByTagName("li");

    for (let i = 0; i < arr.length; i++) {
        let str = arr[i].textContent || arr[i].innerText;

        //handle searchbar input
        if (str.toUpperCase().indexOf(searchbar.value.toUpperCase()) > -1) {
            arr[i].style.display = "";
        } else {
            arr[i].style.display = "none";
        }

        let tags = getTags(arr[i])
        let intersect = intersectArray(activecategories, tags)

        if (activecategories.size > 0 && intersect.length > 0) {
            //arr[i].style.display = "";
            console.log(intersect);
        } else {
            arr[i].style.display = "none";
        }

        if (activecategories.size == 0 && intersect.length == 0) {
            if (arr[i].style.display == "none") {
                console.log("s");
            }
        }

    }
}

function intersectArray(arr1, arr2) {
    let res = Array.from(arr1).filter(value => Array.from(arr2).includes(value));
    return res
}

function getTags(post) {
    let tagelems = post.getElementsByClassName("tag");
    let posttags = new Array;
    for (let j = 0, len = tagelems.length; j < len; j++) {
        posttags.push(tagelems[j].innerText);
    }
    return posttags
}


function toggleCategoryFilter(id, category_name) {
    let elem = document.getElementById(id);
    if (elem.classList.contains('active')) {
        elem.classList.remove('active');
        activecategories.delete(category_name)
    } else {
        elem.classList.add('active');
        activecategories.add(category_name)
    }
    filterBlogPosts()
}
