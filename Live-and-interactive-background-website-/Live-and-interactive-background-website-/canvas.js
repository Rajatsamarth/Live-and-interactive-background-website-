let canvas=document.querySelector("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c=canvas.getContext('2d');
console.log(canvas)

//making the canvas responsive

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})





//creating a javascript objects
var mouse={
    x:undefined,
    y:undefined
}
window.addEventListener("mousemove",(event)=>{
    // console.log(event)
    mouse.x= event.x
    mouse.y= event.y
    // console.log(mouse)
})

var max_radius=40
var min_radius=3

colorArray =[
    "red",
    "green",
    "blue",
    "yellow",
    "pink"
]



let Mycircle=function(x,y,dx,dy,radius){
this.x=x
this.y=y
this.dx=dx
this.dy=dy
this.radius=radius
this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
this.min_radius=this.radius
this.max_radius=40

this.draw=function(){
    c.beginPath()
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
    c.fillStyle=this.color
    c.fill()
   
}
 this.update=function(){

     if(this.x>=(innerWidth)-this.radius||this.x<=0+this.radius){
         this.dx=-this.dx
        }

     if(this.y>=innerHeight-this.radius||this.y<=0+this.radius){
            this.dy=-this.dy
        }
        this.x += this.dx
        this.y += this.dy
//interactivity
//its based on the refernce point hwre sign convention is used considering cursor as refrence point
if(mouse.x - this.x < 50 && mouse.x-this.x > -50 && mouse.y-this.y <50 && mouse.y-this.y>-50) {
  if(this.radius<this.max_radius)
    this.radius += 1;

}
else if(this.radius>this.min_radius){
    this.radius-=1
}

        this.draw()
 }


}


var ball_array=[]
function init(){
    ball_array=[];
    for(let i=0;i<800;i++){
    let radius=(Math.random()*3 +1)
    let x=Math.random()*((innerWidth)-radius*2)+radius
    let y=Math.random()*(innerHeight-radius*2)+radius
    let dx=Math.floor(Math.random()*10)*0.25
    let dy=Math.floor(Math.random()*10)*0.25
    ball_array.push(new Mycircle(x,y,dx,dy,radius))
}
}




function animate(){
    window.requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(let i=0;i<ball_array.length;i++){
        ball_array[i].update()
    }
    
}
init()
animate()