
//TODO document global
let activecategories = new Set();

function filterBlogPosts() {
    let searchbar = document.getElementById("searchbar");
    let postcontainer = document.querySelector(".blog-list");
    let arr = postcontainer.getElementsByTagName("li");

    let matchcount = 0;
    for (let i = 0; i < arr.length; i++) {
        //handle search bar input
        let str = arr[i].textContent || arr[i].innerText;
        let wordfound = false;
        if (str.toUpperCase().indexOf(searchbar.value.toUpperCase()) > -1) {
            wordfound = true;
        }

        //handle tag filter
        let intersect = intersectArray(activecategories, getTags(arr[i]))
        let matchtags = false;
        if (activecategories.size <= intersect.length) {
            matchtags = true;
        }

        if (wordfound == true && matchtags == true) {
            arr[i].style.display = "";
            matchcount++;
        } else {
            arr[i].style.display = "none";
        }
    }
    document.getElementById("results_count").innerText = matchcount;
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
