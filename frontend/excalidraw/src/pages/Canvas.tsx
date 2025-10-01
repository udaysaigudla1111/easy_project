import { useEffect, useRef } from "react"
import initDraw from "../draw"

const Canvas = ()=>{

    let canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current)
        {
            initDraw(canvasRef)
        }
    },[canvasRef])

    return (
        <div>
        <canvas ref={canvasRef} height={1000} width={1000}></canvas>
        </div>
    )
}

export default Canvas