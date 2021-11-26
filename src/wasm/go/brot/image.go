package brot

import (
	"bytes"
	"image"
	"image/color"
	"image/png"
	"log"
	"os"
)

func DrawImage(width, height int, imearr [][]color.RGBA) {
	upLeft := image.Point{0, 0}
	lowRight := image.Point{width, height}

	img := image.NewRGBA(image.Rectangle{upLeft, lowRight})

	for x := 0; x < width; x++ {
		for y := 0; y < height; y++ {
			img.Set(x, y, imearr[y][x])
		}
	}

	// Encode as PNG.
	f, _ := os.Create("image.png")
	png.Encode(f, img)
}

//
func GetImage(width, height int, imearr [][]color.RGBA) bytes.Buffer {
	buf := new(bytes.Buffer)

	upLeft := image.Point{0, 0}
	lowRight := image.Point{width, height}

	img := image.NewRGBA(image.Rectangle{upLeft, lowRight})

	for x := 0; x < height; x++ {
		for y := 0; y < width; y++ {
			img.Set(y, x, imearr[x][y])
		}
	}
	err := png.Encode(buf, img)
	if err != nil {
		log.Fatalf("error encoding png %s", err)
	}
	return *buf
}
