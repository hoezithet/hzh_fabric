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

        this.set('arrow', this.drawArrow(this.color, 4 * this.strokeWidth));
        this.set('line', this.drawLine(this.arrow.height, this.length - this.strokeWidth,this.color, this.strokeWidth));
        
        
        this.set('tickSize', options.tickSize || 10);
        this.set('tickWidth', options.tickWidth || 2);
        this.set('tickStartValue', options.tickStartValue || -10);
        this.set('tickEndValue', options.tickEndValue || 10);
        this.set('numTicks', options.numTicks || 10);
        this.set('tickPositions', options.tickPositions || this.getTickPositions(this.tickStartValue, this.tickEndValue, this.numTicks));
        this.set('tickLabelEvery', options.tickLabelEvery || 2);
        this.set('tickLabelAngle', options.tickLabelAngle || 0);
        this.set('tickLabelShift', options.tickLabelShift || - 2 * this.tickSize);
        this.set('labeledTicks', options.labeledTicks || this.getLabeledTicks(this.tickPositions, this.tickLabelEvery));
        
        var ticksAndLabels = this.drawTicksAndLabels(this.tickStartValue, this.tickEndValue, this.tickPositions, this.tickSize, this.tickWidth, this.labeledTicks, this.tickLabelShift, this.tickLabelAngle);
        this.set('ticks', new fabric.Group(ticksAndLabels[0]));
        this.set('tickLabels', new fabric.Group(ticksAndLabels[1]));
        
        this.callSuper('initialize', [
            this.ticks, this.tickLabels,
            this.line, this.arrow
        ],
        options);
    },

    drawArrow: function(color, width) {
        var arrow = new fabric.Path('m 137.69625,25.852538 4.66865,-12.695951 4.6686,12.695951 c -2.75635,-2.02828 -6.5275,-2.01659 -9.33725,0 z', {
            left: 0,
            top: 0,
            originX: 'center',
            originY: 'top',
            fill: color,
            stroke: color,
            strokeLineJoin: 'round'
        });
        
        arrow.scaleToWidth(width);
        return arrow;
    },

    drawLine: function(startY, endY, color, strokeWidth) {
        return new fabric.Line([0, startY, 0, endY], {
            originX: 'center',
            originY: 'center',
            stroke: color,
            strokeWidth: strokeWidth,
            strokeLineCap: 'round'            
        })
    },

    drawTicksAndLabels: function(tickStartValue, tickEndValue, tickPositions, tickSize, tickWidth, labeledTicks, tickLabelShift, tickLabelAngle) {
        var ticks = [];
        var tickLabels = [];
        var tickStartPos = this.line.y2 - this.arrow.height;
        var tickEndPos = this.line.y1  + 2*this.arrow.height;
        
        for (var i = 0; i < tickPositions.length; i++) {
            var tickValue = tickPositions[i];
            var valRange = tickEndValue - tickStartValue;
            var tickRange = tickEndPos - tickStartPos;
            var tickPos = tickStartPos + (tickValue - tickStartValue) / valRange * tickRange;
            
            var tick = new fabric.Line([
                - tickSize / 2, tickPos,
                tickSize / 2, tickPos
            ],
            {
                originX: 'center',
                originY: 'top',
                stroke: this.color,
                strokeWidth: tickWidth,
                strokeLineCap: 'round'
            });
            
            if (labeledTicks.includes(tickValue)) {
                var tickLabel = new fabric.Text(tickValue.toString(), {
                    left: tickLabelShift,
                    top: tickPos,
                    originX: 'center',
                    originY: 'center',
                    fill: this.color,
                    angle: tickLabelAngle,
                    fontSize: 4 * this.strokeWidth,
                    fontFamily: 'Quicksand'
                });
                tickLabels.push(tickLabel);
            }
            
            ticks.push(tick);
        }

        return [ticks, tickLabels];
    },
    
    getTickPositions: function(startValue, endValue, numTicks) {
        var tickPositions = [];
        for (var i = startValue; i <= endValue; i += (endValue - startValue) / numTicks) {
            tickPositions.push(i);
        }
        return tickPositions;
    },

    getLabeledTicks: function(tickPositions, tickLabelEvery) {
        var labeledTicks = [];
        
        for (var i = 0; i < tickPositions.length; i += tickLabelEvery) {
            labeledTicks.push(tickPositions[i]);
        }
        return labeledTicks;
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