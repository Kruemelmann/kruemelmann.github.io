package brot_test

import (
	"fmt"
	"image/color"
	"math/rand"
	"testing"
	"time"

	"github.com/kruemelmann/kruemelmann.github.io/go/brot"
)

func TestDrawImageMandel(t *testing.T) {
	width := 1920
	height := 1080

	mandel := brot.NewMandelBrot(100, width, height)
	imearr := mandel.MandelBrotFunc()

	brot.DrawImage(width, height, imearr)
}

func TestDrawImage(t *testing.T) {
	width := 1920
	height := 1080
	arr := randomColorArray(width, height)

	fmt.Println("width", len(arr))
	fmt.Println("height", len(arr[0]))

	brot.DrawImage(width, height, arr)
}

//utils
func randomColorArray(width, height int) [][]color.RGBA {
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)

	m := make([][]color.RGBA, width)
	for k := 0; k < len(m); k++ {
		m[k] = make([]color.RGBA, height)
	}

	for j := 0; j < width; j++ {
		for i := 0; i < height; i++ {
			m[j][i] = color.RGBA{
				uint8(r1.Intn(254) + 1),
				uint8(r1.Intn(254) + 1),
				uint8(r1.Intn(254) + 1),
				0xff,
			}
		}
	}

	return m
}
