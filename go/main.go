package main

// https://github.com/golang/go/tree/master/src/syscall/js
import (
	"fmt"
	"syscall/js"
)

var (
	// js.Value can be any JS object/type/constructor
	window, doc, body, canvas, laserCtx js.Value
	windowSize                          struct{ w, h float64 }
)

func main() {
	setup()
	fmt.Println("Setup finished")
}

func setup() {
	window = js.Global()
	doc = window.Get("document")
	body = doc.Get("body")

	windowSize.h = window.Get("innerHeight").Float()
	windowSize.w = window.Get("innerWidth").Float()

	canvas = doc.Call("getElementById", "stars-container")

	// red 🔴 laser dot canvas object
	laserCtx = canvas.Call("getContext", "2d")
	laserCtx.Set("fillStyle", "red")
	laserCtx.Set("fillRect", "red")
}
