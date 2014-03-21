// Generates a random color using Raphael function.
var generateColor = function() {
	return Raphael.rgb(	(25 + Math.random()*205), 
						(25 + Math.random()*205), 
						(25 + Math.random()*205));
}

// A 6th degree tree.
function PhatPie (name="NULL", value=0) {
	
	//Values
	this.remaining_value = value;
	this.total_value = value;
	this.slices = [];
	this.name = name;
	this.svg;
	this.parent_slice;

	//First slice does not subtract from total value
	this.slices[0] = this;

	//Randomly selected color
	this.color = generateColor();
}

PhatPie.prototype.addSlice = function (slice) {
	//Error handling
	if(this.remaining_value < slice.total_value)
		alert("You do not have enough funds!");
	else if(this.slices.length > 5)
		alert("Too many slices!");
	else if(slice.total_value > 0)
	{
		this.remaining_value -= slice.total_value;
		this.slices.push(slice);
	}
}
