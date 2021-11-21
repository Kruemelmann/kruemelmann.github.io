
start: wasm jekyll

jekyll:
	bundle exec jekyll serve --livereload

wasm:
	GOOS=js GOARCH=wasm go build -o ./assets/js/game.wasm ./go/main.go
