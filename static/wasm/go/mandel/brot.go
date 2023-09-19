package main

import (
	"image/color"
	"math/cmplx"
)

func NewMandelBrot(max_iteration int, width int, height int) MandelBrot {
	res := MandelBrot{}
	res.MaxIteration = max_iteration
	res.CurIteration = 0
	res.Width = width
	res.Height = height
	return res
}

type MandelBrot struct {
	MaxIteration  int
	CurIteration  int
	Width, Height int
}

func (m *MandelBrot) DrawToImage() {
	img := m.MandelBrotFunc()
	DrawImage(m.Width, m.Height, img)
}

func (m *MandelBrot) MandelBrotFunc() [][]color.RGBA {
	img := generateImgArr(m.Width, m.Height)
	re_start := -2.2
	re_end := 1.0
	im_start := -1.0
	im_end := 1.0

	for i := 0; i < m.Width; i++ {
		for j := 0; j < m.Height; j++ {
			x := float64(i)
			y := float64(j)
			img_part := im_start + (y/float64(m.Height))*(im_end-im_start)
			rel_part := re_start + (x/float64(m.Width))*(re_end-re_start)
			ret := pixelcolor(complex(rel_part, img_part), m.MaxIteration)

			//blue inverted
			col := ret * 255 / m.MaxIteration

			//yellow and colorful
			//col := 255 - int(ret*255/m.MaxIteration)

			//TODO think about this its only for design resons
			if col == 0xff {
				col = 0x00
			}

			img[j][i] = color8BitToRGBA(uint8(col))
		}

	}
	return img
}

func pixelcolor(c complex128, maxiter int) int {
	var z complex128 = 0
	n := 0

	for cmplx.Abs(z) <= 2 && n < maxiter {
		z = z*z + c
		n += 1
	}
	return n
}

func generateImgArr(width, height int) [][]color.RGBA {
	m := make([][]color.RGBA, height)
	for r := range m {
		m[r] = make([]color.RGBA, width)
	}
	return m
}

// move to utils
func color8BitToRGBA(c uint8) color.RGBA {
	return color.RGBA{
		R: (c >> 5) * 32,
		G: ((c & 28) >> 2) * 32,
		B: (c & 3) * 64,
		A: 0xff,
	}
}
