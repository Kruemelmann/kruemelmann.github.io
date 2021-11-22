package main

// https://github.com/golang/go/tree/master/src/syscall/js
import (
	"fmt"
	"math"
	"math/rand"
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

type Ball struct {
	Pos   Point
	Color string
}

func main() {
	ctx := setup()
	fmt.Println("Setup finished")
	resetBackground(ctx, "black")

	//starting point
	velocity := 10.0
	rad := 25.0
	spoint := Point{x: rad + 1, y: rad + 1}

	moveX := math.Cos(math.Pi/180*rad) * velocity
	moveY := math.Sin(math.Pi/180*rad) * velocity
	ball := Ball{
		Pos:   Point{x: spoint.x, y: spoint.y},
		Color: randomColor(),
	}

	//animation loop
	for {
		resetBackground(ctx, "black")

		if ball.Pos.x > (canvasSize.w-rad) || ball.Pos.x < rad {
			ball.Color = randomColor()
			moveX = -moveX
		}
		if ball.Pos.y > (canvasSize.h-rad) || ball.Pos.y < rad {
			ball.Color = randomColor()
			moveY = -moveY
		}
		ball.Pos.x += moveX
		ball.Pos.y += moveY

		ctx.Call("beginPath")
		ctx.Set("fillStyle", ball.Color)
		ctx.Call("arc", ball.Pos.x, ball.Pos.y, rad, 0, math.Pi*2, false)
		ctx.Call("fill")
		ctx.Call("closePath")

		time.Sleep(100 * time.Microsecond)
	}
}

var colors = []string{"red", "green", "yellow", "purple", "blue"}

func randomColor() string {
	return colors[rand.Intn(len(colors))]
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
