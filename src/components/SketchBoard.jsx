import React, { useRef, useEffect, useState } from 'react';

const SketchBoard = () => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000');
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
      if (!isDrawing) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
      isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [color, lineWidth]);

  const changeTool = (newTool) => {
    setTool(newTool);
    if (newTool === 'eraser') {
      setColor('#FFF');
      setLineWidth(10);
    } else {
      setColor('#000');
      setLineWidth(2);
    }
  };

  const handleColorChange = (e) => setColor(e.target.value);
  const handleLineWidthChange = (e) => setLineWidth(e.target.value);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'sketch.png'; // Filename for the downloaded image
    link.href = canvas.toDataURL('image/png'); // Convert canvas content to data URL
    link.click(); // Initiate download
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex flex-wrap justify-center space-x-4 mb-4">
        <button   className={`px-4 py-2 rounded hover:bg-gray-300 ${
            tool === 'pen' ? 'bg-yellow-400' : 'bg-gray-200'
          }`} onClick={() => changeTool('pen')}>Pen</button>
        <button  className={`px-4 py-2 rounded hover:bg-gray-300 ${
            tool === 'eraser' ? 'bg-yellow-400' : 'bg-gray-200'
          }`} onClick={() => changeTool('eraser')}>Eraser</button>
        <input type="color" value={color} onChange={handleColorChange} />
        <input type="range" min="1" max="10" value={lineWidth} onChange={handleLineWidthChange} />
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={clearCanvas}>Clear</button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 mt-2 md:mt-0"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg shadow-lg bg-white mb-4 overflow-hidden w-80 md:w-full">
        <canvas ref={canvasRef} width={1500} height={750} />
      </div>
    </div>
  );
};

export default SketchBoard;



