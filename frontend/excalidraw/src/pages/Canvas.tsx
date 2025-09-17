import { useEffect, useRef } from "react"

const Canvas = ()=>{

    let canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current)
        {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d")!;
            let x=0;
            let y=0;
            let width=0;
            let height=0;
            let clicked=false;
            canvas.addEventListener('mousedown',(e)=>{
                clicked=true;
                x=e.clientX;
                y=e.clientY;
            })
              canvas.addEventListener('mouseup',(e)=>{
                clicked=false;
            })
            canvas.addEventListener('mousemove',(e)=>{
                if(clicked)
                {
                    width=e.clientX-x;
                    height=e.clientY-y;
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    ctx?.strokeRect(x,y,width,height);
                }
               
            })
          
            if(ctx)
            {
                // ctx.strokeRect(25,0,100,100) // (x-axis,y-axis,width,height)
            }
        }
    },[canvasRef])

    return (
        <div>
        <canvas ref={canvasRef} height={1000} width={1000}></canvas>
        </div>
    )
}

export default Canvas