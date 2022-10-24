const cnvs = document.getElementById("cnvs")
const ctx = cnvs.getContext('2d')

cnvs.width = window.innerWidth
cnvs.height = window.innerHeight
const cursorRad = 150
const pos = []
const specialPoints = []
const points = []

class Point {
	constructor({id}){
		const v = 3
		const theta = Math.random()*2*Math.PI;
		this.velocity = {
			x:v*Math.cos(theta),
			y:v*Math.sin(theta),
		}
		this.id=id
	}
	draw(){
		ctx.beginPath()
		ctx.fillStyle = "#0ff"
		ctx.arc(pos[this.id][0], pos[this.id][1], 2, 0 , 2*Math.PI)
		ctx.fill()
	}
	update(){
		if(pos[this.id][1]>=cnvs.height || pos[this.id][1]<=0){
			this.velocity.y*=-1
		}
		if(pos[this.id][0] <=0 || pos[this.id][0]>=cnvs.width){
			this.velocity.x*=-1
		}
		pos[this.id][0]+=this.velocity.x
		pos[this.id][1]+=this.velocity.y
		
		this.draw()
	}
}
const combinations = (arr) =>{
	const tempArr = [...specialPoints, ...arr]
	const ret = []
	for(let i = 0; i< 1; i++){
		let count = 0;
		for(let j = i+1;j<tempArr.length;j++){
			if(Math.abs(tempArr[i][0]-tempArr[j][0])<cursorRad && Math.abs(tempArr[i][1]-tempArr[j][1])<cursorRad){
				//if(count>=2){
					//break
				//}
				ret.push([tempArr[i], tempArr[j]])
				count++
			}
		}
	}
	return ret
}

const animate = () => {
	ctx.fillStyle="#000"
	ctx.fillRect(0, 0, innerWidth, innerHeight)
	points.map(point=>{
		point.update()
	})
	ctx.strokeStyle="rgba(0, 255, 255, 0.2)"
	ctx.strokeWidth="1"
	const lines = combinations(pos);
	lines.map(line=>{
		ctx.moveTo(...line[0])
		ctx.lineTo(...line[1])
		ctx.stroke()
	})

	window.requestAnimationFrame(animate)
	//setTimeout(animate, 1000/40)
}

window.onload = () => {
	for(let i = 0 ; i<300; i++){
		coords=[Math.random()*cnvs.width, Math.random()*cnvs.height]
		pos.push(coords)
		points.push(new Point({id:pos.length-1}))
	}
	animate()
}
function clickPos(e) {
	const rect = cnvs.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top
	return [x, y]
}

cnvs.addEventListener('mousemove',(e)=>{
	const coords = clickPos(e)
	specialPoints[0]=coords
	//points.push(new Point({id:pos.length-1}))

})
cnvs.addEventListener('click',(e)=>{
	console.log(1)
	const coords = clickPos(e)
	pos.push(coords)
	points.push(new Point({id:pos.length-1}))

})
