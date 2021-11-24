package ball

/*
type Point struct {
	x, y float64
}

type Ball struct {
	Pos   Point
	Color string
}

func BallFunc() {
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
*/
