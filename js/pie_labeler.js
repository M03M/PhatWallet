var pie_labeler = {
	// Labeling options
	onSlice : true,			// Label the values on their pie slice
	includeLegend : true,	// Create a legend
	showNames : true,
	showValues: true,
	cnt : 0,

	drawText : function(ctx, txt) {
			var x = ctx.canvas.width * (11/20);
			var y = ctx.canvas.height / 4;
			var hpad = 40;
			var vpad = 20;
			var colIndex = 0;
			var subtxt = txt;

			//Main value is not indented
			if(pie_labeler.cnt == 0)
				ctx.fillText(txt, x, y+(vpad*pie_labeler.cnt));
			else
				ctx.fillText(txt, x+hpad, y+(vpad*pie_labeler.cnt));

//			while(txt.substr())

	//		for(var k=0; k<txt.length; k+=12)
	//		{
	//			var end = (txt.substr(k,txt.length-1).length >= 12) ? k+12 : txt.length-1;
	//			if(pie_labeler.cnt == 0)
	//				ctx.fillText(txt, x, y+(pad*(pie_labeler.cnt+k));
	//			else
	//				ctx.fillText(txt.substr(k,end), x+pad, y+(pad*(pie_labeler.cnt+k));
	//		}
	},

	drawValue : function(ctx, txt) {
		var x = ctx.canvas.width * (11/20);
		var y = ctx.canvas.height / 4;
		var hpad = ctx.canvas.width / 8;
		var vpad = 20;

		//Main value is not indented
	//	if(pie_labeler.cnt <= 1)
	//		ctx.fillText("$"+txt, x+hpad, y+(vpad*(pie_labeler.cnt-1)));
	//	else
			ctx.fillText("$"+txt, x+hpad+hpad, y+(vpad*(pie_labeler.cnt)));
	},

	label : function(ctx, pie) {
		
		if(pie_labeler.onSlice)
		{
			ctx.fillStyle = "#FFFFFF";
			ctx.font = 'italic 24px sans-serif';
			ctx.textBaseline = 'top';
			ctx.fillText  ('Hello world!', 0, 0);
		}
		
		if(pie_labeler.includeLegend)
		{
			var x = ctx.canvas.width * (3/4);
			var y = ctx.canvas.height / 4;
			var pad = 40;
			var colIndex = 0;

			ctx.font = '18px sans-serif';
			ctx.textBaseline = 'top';

			pie_labeler.cnt = 0;
			for(var k=0; k<pie.slices.length; k++) 
			{
				ctx.fillStyle = pie.slices[k].color;
				
				if(pie_labeler.showNames)
					pie_labeler.drawText(ctx, pie.slices[k].name);
				if(pie_labeler.showValues)
					pie_labeler.drawValue(ctx, pie.slices[k].remaining_value);

				pie_labeler.cnt++;
			}
		}
	}
}