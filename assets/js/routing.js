'use strict'

function startHashRouting() {
    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        //komodo
        if (hash == "komodo") {
            window.location.href = '2022/05/01/komodo.html';
        }
        //tmux-iconbar
        if (hash == "tmuxiconbar") {
            window.location.href = '2021/11/19/tmux-iconbar.html';
        }
        //pathfind
        if (hash == "pathfind") {
            window.location.href = '2021/11/19/pathfind.vim.html';
        }
        //golemdb
        if (hash == "golemdb") {
            window.location.href = '/projects/golemdb.html';
        }
    }
}

//instandly trigger
startHashRouting()
