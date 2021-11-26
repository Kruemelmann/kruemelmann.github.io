
jekyll:
	bundle exec jekyll serve --livereload

wasm:
	GOOS=js GOARCH=wasm go build -o ./assets/wasm/game.wasm ./go/
