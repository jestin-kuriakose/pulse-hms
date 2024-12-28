import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { fabric } from "fabric";
import {
  Button,
  Slider,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Brush } from "@mui/icons-material";

const ImageMarker = forwardRef(({ imageUrl }, ref) => {
  const canvasEl = useRef(null);
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#FF0000");
  const [width, setWidth] = useState(1);
  const [isErasing, setIsErasing] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const initCanvas = () => {
      canvasRef.current = new fabric.Canvas(canvasEl.current);

      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({ crossOrigin: "anonymous" });
        img.scaleToWidth(canvasRef.current.width);
        img.scaleToHeight(canvasRef.current.height);
        canvasRef.current.setBackgroundImage(
          img,
          canvasRef.current.renderAll.bind(canvasRef.current)
        );
      });

      setDrawingBrush();

      canvasRef.current.on("object:added", () => setIsModified(true));
      canvasRef.current.on("object:removed", () => setIsModified(true));
      canvasRef.current.on("object:modified", () => setIsModified(true));
    };

    initCanvas();

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
        canvasRef.current.isDrawingMode = false;
        canvasRef.current.on("object:selected", removeObject);
      } else {
        canvasRef.current.isDrawingMode = true;
        canvasRef.current.freeDrawingBrush = new fabric.PencilBrush(
          canvasRef.current
        );
        canvasRef.current.freeDrawingBrush.color = color;
        canvasRef.current.freeDrawingBrush.width = width;
        canvasRef.current.off("object:selected", removeObject);
      }
    }
  };

  const removeObject = (e) => {
    if (e.target) {
      canvasRef.current.remove(e.target);
      canvasRef.current.renderAll();
    }
  };

  useImperativeHandle(ref, () => ({
    getImageData: () =>
      canvasRef.current ? canvasRef.current.toDataURL() : null,
    isModified: () => isModified,
    resetModifiedState: () => setIsModified(false),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md">
      <Typography variant="h6" className="mb-4">
        Image Marker
      </Typography>
      <div className="flex items-center justify-between mb-4">
        <FormControlLabel
          control={
            <Switch
              checked={isErasing}
              onChange={() => setIsErasing(!isErasing)}
            />
          }
          label={isErasing ? "Erasing" : "Drawing"}
        />
        {!isErasing && (
          <div className="flex items-center">
            <Typography variant="body2" className="mr-2">
              Color:
            </Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 border-none"
            />
          </div>
        )}
      </div>
      {/* <div className="mb-4">
        <Typography variant="body2" gutterBottom>
          Stroke Width
        </Typography>
        <Slider
          value={width}
          onChange={(_, newValue) => setWidth(newValue)}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          min={1}
          max={50}
        />
      </div> */}
      <canvas
        ref={canvasEl}
        width={700}
        height={300}
        className="border border-gray-300 rounded"
      />
      <div className="mt-4 flex justify-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<Brush />}
          onClick={() => setIsErasing(!isErasing)}
        >
          {isErasing ? "Switch to Drawing" : "Switch to Erasing"}
        </Button>
      </div>
    </div>
  );
});

export default ImageMarker;
