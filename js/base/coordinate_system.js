var CoordSys = fabric.util.createClass(fabric.Group, {
  type: "coordSys",

  initialize: function(options) {
    options || (options = {});

    this.set("colorX", options.colorX || "black");
    this.set("colorY", options.colorY || "black");
    this.set("width", options.width || 100);
    this.set("height", options.height || 100);
    this.set("selectable", options.selectable || false);
    this.set("strokeWidth", options.strokeWidth || 4);

    this.set(
      "axisX",
      new Axis({
        length: this.width,
        strokeWidth: this.strokeWidth,
        color: this.colorX
      }).set({
        angle: 90,
        left: this.width / 2,
        top: this.height / 2,
        originY: "center",
        originX: "center"
      })
    );

    this.set(
      "axisY",
      new Axis({
        length: this.height,
        strokeWidth: this.strokeWidth,
        color: this.colorY
      }).set({
        left: this.width / 2,
        top: this.height / 2,
        originY: "center",
        originX: "center"
      })
    );

    this.set(
      "labelX",
      new fabric.Text("x", {
        fill: this.colorX,
        fontSize: 8 * this.strokeWidth,
        fontFamily: "Quicksand",
        originX: "right",
        originY: "top",
        left: this.width,
        top: this.height / 2
      })
    );

    this.set(
      "labelY",
      new fabric.Text("y", {
        fill: this.colorY,
        fontSize: 8 * this.strokeWidth,
        fontFamily: "Quicksand",
        originX: "right",
        originY: "top",
        left: this.width / 2 - 1.5 * this.axisY.arrow.width,
        top: 0
      })
    );

    this.callSuper(
      "initialize",
      [this.axisX, this.labelX, this.axisY, this.labelY],
      options
    );
  }
});
