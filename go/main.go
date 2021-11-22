package main

// https://github.com/golang/go/tree/master/src/syscall/js
import (
	"fmt"
	"math"
	"syscall/js"
	"time"
)

var (
	// js.Value can be any JS object/type/constructor
	window, doc, body, document, canvas js.Value
	windowSize                          struct{ w, h float64 }
	canvasSize                          struct{ w, h float64 }
)

type Point struct {
	x, y float64
}

func main() {
	ctx := setup()
	fmt.Println("Setup finished")
	resetBackground(ctx, "black")

	//starting point
	velocity := 3.0
	rad := 25.0
	spoint := Point{x: rad + 1, y: rad + 1}

	moveX := math.Cos(math.Pi/180*rad) * velocity
	moveY := math.Sin(math.Pi/180*rad) * velocity
	ball := Point{x: spoint.x, y: spoint.y}

	fmt.Println("Running")
	//animation loop
	for {
		resetBackground(ctx, "black")

		if ball.x > (canvasSize.w-rad) || ball.x < rad {
			//moveX = math.Acos(math.Pi/180) * velocity
			moveX = -moveX
		}
		if ball.y > (canvasSize.h-rad) || ball.y < rad {
			//moveY = math.Asin(math.Pi/180) * velocity
			moveY = -moveY
		}
		ball.x += moveX
		ball.y += moveY

		ctx.Call("beginPath")
		ctx.Set("fillStyle", "red")
		ctx.Call("arc", ball.x, ball.y, rad, 0, math.Pi*2, false)
		ctx.Call("fill")
		ctx.Call("closePath")

		time.Sleep(100 * time.Microsecond)
	}
}

func setup() js.Value {
	window = js.Global()
	doc = window.Get("document")
	body = doc.Get("body")

	windowSize.h = window.Get("innerHeight").Float()
	windowSize.w = window.Get("innerWidth").Float()

	canvas = doc.Call("getElementById", "stars-container")
	canvasSize.h = canvas.Get("offsetHeight").Float()
	canvasSize.w = canvas.Get("offsetWidth").Float()
	canvas.Set("height", canvasSize.h)
	canvas.Set("width", canvasSize.w)

	ctx := canvas.Call("getContext", "2d")
	return ctx
}

//utils
func resetBackground(ctx js.Value, backgroundcolor string) {
	ctx.Set("fillStyle", backgroundcolor)
	ctx.Call("fillRect", 0, 0, canvasSize.w, canvasSize.h)
}
