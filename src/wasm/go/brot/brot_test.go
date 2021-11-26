package brot_test

import (
	"testing"

	"github.com/kruemelmann/kruemelmann.github.io/go/brot"
)

func TestMandelBrot_DrawToImage(t *testing.T) {
	max_iter := 1000
	width := 1920
	height := 1080
	m := brot.NewMandelBrot(max_iter, width, height)
	m.DrawToImage()
}
