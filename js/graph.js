var canvas = new fabric.Canvas("c");
canvas.setHeight(500);
canvas.setWidth(500);
canvas.setBackgroundColor('white');
canvas.hoverCursor = 'default';
canvas.selection = false; // disable group selection

var x_color = '#ff6300';
var y_color = '#19a974';

var Axis = fabric.util.createClass(fabric.Group, {
    type: 'axis',
    
    initialize: function(options) {
        options || (options = { });
        
        this.set('color', options.color || 'black');
        this.set('strokeWidth', options.strokeWidth || 4);
        this.set('length', options.length || 100);
        this.set('selectable', options.selectable || false);
        this.set('arrow', new fabric.Path('m 137.69625,25.852538 4.66865,-12.695951 4.6686,12.695951 c -2.75635,-2.02828 -6.5275,-2.01659 -9.33725,0 z', {
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'top',
            fill: this.color,
            stroke: this.color,
            strokeLineJoin: 'round'
        }));
        
        this.arrow.scaleToWidth(4 * this.strokeWidth);
        
        this.set('line', new fabric.Line([0, this.arrow.height, 0, this.length - this.strokeWidth], {
            originX: 'center',
            originY: 'center',
            stroke: this.color,
            strokeWidth: this.strokeWidth,
            strokeLineCap: 'round'            
        }));
        
        var ticks = [];
        
        var tickSize = 10;
        var tickWidth = 2;
        var startValue = -20;
        var endValue = 20;
        var tickPositions = [-20, -15, -10, -5, 0, 5, 10, 15, 20];
        var tickStartPos = this.line.y2;
        var tickEndPos = this.line.y1;
        
        var tick = new fabric.Line([- tickSize / 2, (this.line.y2 + this.arrow.y2)/2, tickSize / 2, (this.line.y2 + this.arrow.y2)/2], {
            originX: 'center',
            originY: 'top',
            stroke: this.color,
            strokeWidth: tickWidth,
            strokeLineCap: 'round'
        });
        ticks.push(tick);
        
        this.set('ticks', new fabric.Group(ticks));
        
        this.callSuper('initialize', [this.ticks, this.line, this.arrow],
        options);
    }
});

var CoordSys = fabric.util.createClass(fabric.Group, {
    type: 'coordSys',
    
    initialize: function(options) {
        options || (options = { });
        
        this.set('colorX', options.colorX || 'black');
        this.set('colorY', options.colorY || 'black');
        this.set('width', options.width || 100);
        this.set('height', options.height || 100);
        this.set('selectable', options.selectable || false);
        this.set('strokeWidth', options.strokeWidth || 4);
        
        this.set('axisX', new Axis({
            length: this.width,
            strokeWidth: this.strokeWidth,
            color: this.colorX
        }).set({
            angle: 90,
            left: this.width / 2,
            top: this.height / 2,
            originY: 'center',
            originX: 'center'
        }));
        
        this.set('axisY', new Axis({
            length: this.height,
            strokeWidth: this.strokeWidth,
            color: this.colorY
        }).set({
            left: this.width / 2,
            top: this.height / 2,
            originY: 'center',
            originX: 'center'
        }));
        
        
        this.set('labelX', new fabric.Text('x', {
            fill: this.colorX,
            fontSize: 8 * this.strokeWidth,
            fontFamily: 'Quicksand',
            originX: 'right',
            originY: 'top',
            left: this.width,
            top: this.height / 2
        }));
        
        this.set('labelY', new fabric.Text('y', {
            fill: this.colorY,
            fontSize: 8 * this.strokeWidth,
            fontFamily: 'Quicksand',
            originX: 'right',
            originY: 'top',
            left: this.width / 2 - 1.5 * this.axisY.arrow.width,
            top: 0
        }));
        
        this.callSuper('initialize', [this.axisX, this.labelX, this.axisY, this.labelY],
        options)
    }
});

canvas.add(new CoordSys({
    colorX: x_color,
    colorY: y_color,
    width: 300,
    height: 250,
    left: 250,
    top: 250,
    originX: 'center',
    originY: 'center'
}));