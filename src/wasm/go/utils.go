package main

import (
	"math/rand"
	"syscall/js"
)

func resetBackground(ctx js.Value, backgroundcolor string) {
	ctx.Set("fillStyle", backgroundcolor)
	ctx.Call("fillRect", 0, 0, canvasSize.w, canvasSize.h)
}

//random color
var colors = []string{"red", "green", "yellow", "purple", "blue"}

func randomColor() string {
	return colors[rand.Intn(len(colors))]
}
