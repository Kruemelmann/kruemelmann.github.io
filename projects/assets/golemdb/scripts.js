var fetchStats = () => {
  fetch('https://api.github.com/repos/kruemelmann/golemdb')
    .then(response => response.json())
    .then(data => {
      var elem = document.querySelector("#github-stars")
      elem.innerHTML = data.stargazers_count

      var elem = document.querySelector("#github-watchers")
      elem.innerHTML = data.subscribers_count
    });

  //TODO add dockerhub downloads to stats
      //id = dockerhub-downloads
}
fetchStats()

