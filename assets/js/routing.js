'use strict'

function startHashRouting() {
    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        if (hash == "komodo") {
            window.location.href = '2022/05/01/komodo.html';
        }
    }
}

//instandly trigger
startHashRouting()
