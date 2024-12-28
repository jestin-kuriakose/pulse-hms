import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const ImageMarker = ({ imageUrl }) => {
  const canvasEl = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState("red");
  const [width, setWidth] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const initCanvas = () => {
      canvasRef.current = new fabric.Canvas(canvasEl.current);

      // Load the image and set it as the background
      fabric.Image.fromURL(imageUrl, (img) => {
        img.scaleToWidth(canvasRef.current.width);
        img.scaleToHeight(canvasRef.current.height);
        canvasRef.current.set("backgroundImage", img);
        canvasRef.current.renderAll();
      });

      // Set initial drawing brush
      setDrawingBrush();
    };

    initCanvas();

    // Cleanup function to dispose of the canvas
    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    setDrawingBrush();
  }, [color, width, isErasing]);

  const setDrawingBrush = () => {
    if (canvasRef.current) {
      if (isErasing) {
        // Set canvas to erasing mode
        canvasRef.current.isDrawingMode = false;

        // Remove objects on mouse down
        canvasRef.current.off("mouse:down", removeObject); // Remove previous listener if any
        canvasRef.current.on("mouse:down", removeObject);
      } else {
        // Set canvas to drawing mode
        canvasRef.current.isDrawingMode = true;
        canvasRef.current.freeDrawingBrush = new fabric.PencilBrush(
          canvasRef.current
        );
        canvasRef.current.freeDrawingBrush.color = color;
        canvasRef.current.freeDrawingBrush.width = width;

        canvasRef.current.off("mouse:down", removeObject); // Remove erasing listener
      }
    }
  };

  const removeObject = (e) => {
    if (!isErasing || !e.target) return;

    canvasRef.current.remove(e.target);
  };

  return (
    <div>
      <div className='bg-sec-100 w-2/4 lg:w-full px-4 py-2 mb-2'>
        <button
          className='font-main font-medium text-pry'
          onClick={() => setIsErasing(!isErasing)}
        >
          {isErasing ? "Switch to Drawing" : "Switch to Erasing"}
        </button>
      </div>

      <div className='flex gap-6 items-start'>
        <>
          {!isErasing && (
            <div className='flex flex-col '>
              <label className='font-main font-medium text-pry' htmlFor='color'>
                Choose stroke color
              </label>
              <input
                id='color'
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          )}
          <div className='flex flex-col w-2/4'>
            <label className='font-main font-medium text-pry' htmlFor='width'>
              Select stroke width
            </label>
            <input
              className='w-2/4'
              id='width'
              type='range'
              min='1'
              max='50'
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </div>
        </>
      </div>
      <canvas ref={canvasEl} width={700} height={300} />
    </div>
  );
};

export default ImageMarker;
