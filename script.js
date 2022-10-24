const cnvs = document.getElementById("cnvs")
const ctx = cnvs.getContext('2d')

cnvs.width = window.innerWidth
cnvs.height = window.innerHeight

const pos = [[100, 100], [200, 200]]

const points = []

class Point {
	constructor({position, id}){
		this.velocity = {
		x:Math.random()*5,
		y:Math.random()*5,
	}
		this.id=id
	}
	draw(){
		ctx.beginPath()
		ctx.fillStyle = "red"
		ctx.arc(pos[this.id][0], pos[this.id][1], 5, 0 , 2*Math.PI)
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
	const ret = []
	for(let i = 0; i< arr.length-1; i++){
		for(let j = i+1;j<arr.length;j++){
			ret.push([arr[i], arr[j]])
		}
	}
	return ret
}

const p1 = new Point({id:0})
const p2 = new Point({id:1})

const animate = () => {
	ctx.fillStyle="#000"
	ctx.fillRect(0, 0, innerWidth, innerHeight)
	points.map(point=>{
		point.update()
	})
	ctx.strokeStyle="#0f0"
	ctx.strokeWidth="2"
	const lines = combinations(pos);
	lines.map(line=>{
		ctx.moveTo(...line[0])
		ctx.lineTo(...line[1])
		ctx.stroke()
		ctx.closePath()
	})

	ctx.strokeStyle="rgba(0,0,0,0)"
	window.requestAnimationFrame(animate)
}

window.onload = () => {
	for(let i = 0; i< pos.length; i++){
		points.push(new Point({
			id:i
		}))
	}	
	animate()
}
function clickPos(e) {
    const rect = cnvs.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
	return [x, y]
}

cnvs.addEventListener('click',(e)=>{
	const coords = clickPos(e)
	pos.push(coords)
	points.push(new Point({id:pos.length-1}))

})
