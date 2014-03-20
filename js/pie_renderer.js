var pie_renderer = {
	//Default values
	colors : ["#FD0006","#FF8B00","#086CA2","#0ACF00","#FFDF00","#C9007A","#33CDC7","#BF7F30"],
	width : 500,
	height : 400,

	//Draws a slice of the pie chart
	drawSlice : function(ctx, start, stop, col) {
		var pad = ctx.canvas.width / 100;
		var rad = ctx.canvas.width / 4;
		var y	= ctx.canvas.height/ 2;
		var x	= pad + rad;

		ctx.beginPath();
		ctx.fillStyle = col;//pie_renderer.colors[col];
		ctx.arc(x, y, rad, start, stop, false);
		ctx.lineTo(x,y);
		ctx.closePath();
		ctx.fill();
	},

	render : function(ctx, pie) {

		//Calculating sum
		var sum = pie.slices[0].total_value;

		//Drawing pie slices
		var start = 0;
		var stop  = 0;
		for(var k=0; k<pie.slices.length; k++)
		{
			var percentage = pie.slices[k].remaining_value / sum;
			var pi_percentage = (Math.PI*2) * percentage;
			
			stop = start + pi_percentage;
			pie_renderer.drawSlice(ctx, start, stop, pie.slices[k].color);
			start = stop;
		}

		pie_labeler.label(ctx, pie);
	},

	drawSliceSVG : function(paper, startAngle, stopAngle, slice, laf) {

		// Coordinates
		var pad = pie_renderer.height / 100;
		var rad = pie_renderer.width / 4;
		var centerY = pie_renderer.height / 2;
		var centerX = pad + rad;

		// Math.cos and Math.sin take input in radians. Converting from degrees to radians. 
		// 1 deg = pi/180 rad	so 		X deg = X * PI/180 rad
		var	x1 = parseInt(centerX + rad*Math.cos(Raphael.rad(startAngle)));
        var y1 = parseInt(centerY + rad*Math.sin(Raphael.rad(startAngle)));

		var x2 = parseInt(centerX + rad*Math.cos(Raphael.rad(stopAngle)));
		var y2 = parseInt(centerY + rad*Math.sin(Math.PI*stopAngle/180)); 


		//Modify 180,180. Too big.
        var d = "M" + centerX + "," + centerY + " L" + x1 + "," + y1 + " A" + rad + "," + rad +" 0 " + laf + ",1 " + x2 + "," + y2 + " z"; //1 means clockwise
        var arc = paper.path(d);
        arc.attr({fill:slice.color, "stroke-width":"0"});

        // Adds the Raphael element to the phatpie object
        slice.svg = arc;
        slice.svg.click(function () { 
			alert(slice.name + " total costs $" + slice.total_value);
		});
},

	renderSVG : function(paper, pie) {

		//Calculating sum
		var sum = pie.slices[0].total_value;

		//Drawing pie slices
		var start = 0;
		var stop  = 0;
		for(var k=0; k<pie.slices.length; k++)
		{
			var percentage = pie.slices[k].remaining_value / sum;
			var angle = Math.ceil(360*percentage);
		
			// The large-arc-flag parameter must be set to 1 when angles are > 180 so that their 
			// slice is drawn around the center and not beside it.
			var laf = (percentage > 0.5) ? "1" : "0";

			stop = start + angle;
			pie_renderer.drawSliceSVG(paper, start, stop, pie.slices[k], laf);
			start = stop;
		}

//		pie_labeler.label(ctx, pie);
	}
}