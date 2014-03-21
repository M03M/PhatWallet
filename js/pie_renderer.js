var pie_renderer = {
	
	// Raphael canvas dimensions
	width : 500,
	height : 400,

	/* Circles are draw in the top left corner to show the parent pie charts. 
	   TODO: This function only draws this first parent slice, have it recursively
			 draw until it reaches the root. */
	drawDirectory : function(paper,pie,cnt) {

		// Coordinates
		var pad = pie_renderer.height / 100;
		var rad = pie_renderer.width / 20;
		var centerY = pie_renderer.height / 8;
		var centerX = pad + rad;

		if(pie.parent_slice != null)
			paper.circle(centerX*cnt,centerY,rad).attr({fill: pie.parent_slice.color, 'stroke-width':'0'});
	},

	/* Draws an arc from the center coordinates given the angles. */
	drawSlice : function(paper, startAngle, stopAngle, slice, laf) {

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


		// Drawing arc, view Raphael documentation for explanation on this syntax.
        var d = "M" + centerX + "," + centerY + " L" + x1 + "," + y1 + " A" + rad + "," + rad +" 0 " + laf + ",1 " + x2 + "," + y2 + " z";
        var arc = paper.path(d);
        arc.attr({fill:slice.color, "stroke-width":"0"});

        // Adds the newly drawn arc to the phatpie object.
        // We will later assign it event handlers.
        slice.svg = arc;
	},

	/* Draws pie chart on screen slice by slice then calls additional functions 
	   for more features e.g. labeling. */
	render : function(paper, pie) {

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
			pie_renderer.drawSlice(paper, start, stop, pie.slices[k], laf);
			start = stop;
		}

		// Additional drawing
		pie_labeler.label(paper, pie);
		pie_renderer.drawDirectory(paper,pie,1);
	}
}