var generateColor = function() {
	return Raphael.rgb(	(25 + Math.random()*205), 
						(25 + Math.random()*205), 
						(25 + Math.random()*205));
}

function PhatPie (name="NULL", value=0) {
	
	//Values
	this.remaining_value = value;
	this.total_value = value;
	this.slices = [];
	this.name = name;
	this.svg;

	//First slice does not subtract from funds
	this.slices[0] = this;

	//Randomly selected color
	this.color = generateColor();


	this.onTouch = function () { 
		alert(this.name + " total costs $" + this.total_value);
	}
}

PhatPie.prototype.addSlice = function (slice) {
	//Error handling
	if(this.remaining_value < slice.total_value)
		alert("You do not have enough funds!");
	else if(this.slices.length > 5)
		alert("Too many slices!");
	else
	{
		this.slices.push(slice);
		this.remaining_value -= slice.total_value;
	}
}
