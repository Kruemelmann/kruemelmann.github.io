package main

// https://github.com/golang/go/tree/master/src/syscall/js
import (
	"encoding/base64"
	"fmt"
	"syscall/js"

	"github.com/kruemelmann/kruemelmann.github.io/go/brot"
)

var (
	// js.Value can be any JS object/type/constructor
	window, doc, body, document, canvas js.Value
	windowSize                          struct{ w, h float64 }
	canvasSize                          struct{ w, h float64 }
)

func main() {
	ctx := setup()
	resetBackground(ctx, "black")

	man := brot.NewMandelBrot(10, int(canvasSize.w), int(canvasSize.h))
	arr := man.MandelBrotFunc()

	ctx.Call("beginPath")

	//copy arr to image
	fmt.Println("Calc begin")
	img_buf := brot.GetImage(int(canvasSize.w), int(canvasSize.h), arr)
	enc_str := base64.StdEncoding.EncodeToString(img_buf.Bytes())
	fmt.Println("Calc end")

	var jsImg js.Value
	jsImg = js.Global().Call("eval", "new Image()")
	jsImg.Set("src", "data:image/png;base64,"+enc_str)
	ctx.Call("drawImage", jsImg, 0, 0)

	fmt.Println("Draw finished")
	//ctx.Call("closePath")

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
