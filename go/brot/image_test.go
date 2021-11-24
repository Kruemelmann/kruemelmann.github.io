package brot_test

import (
	"image/color"
	"math/rand"
	"testing"
	"time"

	"github.com/kruemelmann/kruemelmann.github.io/go/brot"
)

func TestDrawImage(t *testing.T) {
	width := 1920
	height := 397
	brot.DrawImage(width, height, randomColorArray(width, height))
}

//utils
func randomColorArray(width, height int) [][]color.RGBA {
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)

	m := make([][]color.RGBA, height)
	for r := range m {
		m[r] = make([]color.RGBA, width)
		for i := 0; i < width; i++ {
			m[r][i] = color.RGBA{
				uint8(r1.Intn(254) + 1),
				uint8(r1.Intn(254) + 1),
				uint8(r1.Intn(254) + 1),
				0xff,
			}
		}
	}
	return m
}
