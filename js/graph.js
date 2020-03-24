var canvas = new fabric.Canvas("c");
canvas.setHeight(500);
canvas.setWidth(500);
canvas.setBackgroundColor("white");
canvas.hoverCursor = "default";
canvas.selection = false; // disable group selection

var x_color = "#ff6300";
var y_color = "#19a974";

canvas.add(
  new CoordSys({
    colorX: x_color,
    colorY: y_color,
    width: 300,
    height: 250,
    left: 250,
    top: 250,
    originX: "center",
    originY: "center"
  })
);
