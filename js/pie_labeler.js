var pie_labeler = {
	
	/* Labeling option variables */
	onSlice : true,			// Label the values on their pie slice
	includeLegend : true,	// Create a legend
	showNames : true,		//
	showValues: true,		//
	cnt : 0,				//

	// Draws the name of a slice, the first slice is not indented. 	
	drawName : function(paper, txt, col) {
		var vpad = 20;
		var x = (pie_labeler.cnt == 0) ? (pie_renderer.width * (11/20)) : (pie_renderer.width * (12/20));
		var y = (pie_renderer.height/4) + (vpad*pie_labeler.cnt);

		// Drawing name
		paper.text(x, y, txt).attr({'font-size': '18px', 'fill': col});
	},

	// Draws the value of hte slice.
	drawValue : function(paper, txt, col) {
		var vpad = 20;
		var x = (pie_renderer.width*(15/20));
		var y = (pie_renderer.height/4) + (vpad*pie_labeler.cnt);

		// Drawing value
		paper.text(x, y, '$'+txt).attr({'font-size': '18px', 'fill': col});
	},

	// Labels the pie chart based on option variables.
	label : function(paper, pie) {

		// TODO: Draws text on the pie slices if able to fit.
		if(pie_labeler.onSlice)
		{
			paper.text(50,50, "Raphael slice!");
		}
		
		// Draws text to the side of the pie chart
		if(pie_labeler.includeLegend)
			for(var k=0; k<pie.slices.length; k++) 
			{
				pie_labeler.cnt = k;

				if(pie_labeler.showNames)
					pie_labeler.drawName(paper, pie.slices[k].name, pie.slices[k].color);
				if(pie_labeler.showValues)
					pie_labeler.drawValue(paper, pie.slices[k].remaining_value, pie.slices[k].color);
			}
	}
}