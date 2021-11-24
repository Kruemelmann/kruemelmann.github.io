package main

// https://github.com/golang/go/tree/master/src/syscall/js
import (
	"fmt"
	"syscall/js"
)

var (
	// js.Value can be any JS object/type/constructor
	window, doc, body, document, canvas js.Value
	windowSize                          struct{ w, h float64 }
	canvasSize                          struct{ w, h float64 }
)

func main() {
	ctx := setup()
	fmt.Println("Setup finished")
	resetBackground(ctx, "black")

	//man := brot.NewMandelBrot(10, int(canvasSize.w), int(canvasSize.h))
	//arr := man.MandelBrotFunc()
	fmt.Println("Calc finished")

	//var r, g, b, a uint8
	//var col string
	ctx.Call("beginPath")
	for i := 0; i < int(canvasSize.w); i++ {
		for j := 0; j < int(canvasSize.h); j++ {
			//r = arr[i][j].R
			//g = arr[i][j].G
			//b = arr[i][j].B
			//a = 0xff
			//col = fmt.Sprintf("rgba(\"%s\",\"%s\",\"%s\",\"+%s+\")", r, g, b, a/255)
			ctx.Set("fillStyle", "rgba(255,0,100,1)")
			ctx.Call("fillRect", i, j, 1, 1)
		}
	}
	ctx.Call("closePath")
	fmt.Println("Draw finished")
	//time.Sleep(100 * time.Microsecond)

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
