class Ball{
	constructor(aa){
		this.x=0;
		this.y=0;
		this.vy=0;
		this.vx=0;
		this.r=20;
		this.strokeStyle='rgba(55,255,55,1)';
		this.fillStyle='rgb(100,55,255)';
		this.scaleX=1;
		this.scaleY=1;
		Object.assign(this,aa);
		return this;
	}
	draw(can){
		let{x,y,r,vy,vx,strokeStyle,fillStyle,scaleX,scaleY}=this;
		/*let(i=0;i<arr.length;i++){
			x=arr[i].x;
			y=arr[i].y;*/
			can.save();
			can.fillStyle = fillStyle;
			can.strokeStyle = strokeStyle;
			can.scale(scaleX,scaleY);
			can.translate(x,y);
			can.beginPath();
			can.arc(0,0,r,0,2*Math.PI);
			can.fill();
			can.stroke();
			can.restore();
			return this;
		//}
	}
}