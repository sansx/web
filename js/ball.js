class Ball{
	constructor(prop){
		this.x=0;
		this.y=0;
		this.vy=0;
		this.vx=0;
		this.r=20;
		this.strokeStyle='rgba(55,255,55,1)';
		this.fillStyle='rgb(100,55,255)';
		this.scaleX=1;
		this.scaleY=1;
		Object.assign(this,prop);
		return this;
	}
	paint(can){
		let{r,x,y,scaleX,scaleY,fillStyle,strokeStyle} = this;
		can.save();
		can.translate(x,y);
		can.scale(scaleX,scaleY);
		can.fillStyle = fillStyle;
		can.strokeStyle = strokeStyle;
		can.beginPath();
		can.arc(0,0,r,0,Math.PI*2);
		can.fill();
		can.stroke();
		can.restore();
		return this;

	}
}