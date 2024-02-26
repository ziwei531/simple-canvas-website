import React, { useEffect, useRef } from "react";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function startDrawing(e: MouseEvent) {
            if (!canvas) return;

            isDrawing = true;
            [lastX, lastY] = [
                e.clientX - canvas.getBoundingClientRect().left,
                e.clientY - canvas.getBoundingClientRect().top,
            ];
        }

        function draw(e: MouseEvent) {
            if (!isDrawing || !context || !canvas) return;

            const x = e.clientX - canvas.getBoundingClientRect().left;
            const y = e.clientY - canvas.getBoundingClientRect().top;

            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.strokeStyle = "black";
            context.stroke();

            [lastX, lastY] = [x, y];
        }

        function stopDrawing() {
            isDrawing = false;
        }

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseout", stopDrawing);
        };
    }, []);

    return (
        <>
            <div
                className="container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <canvas
                    id="CANVAS"
                    ref={canvasRef}
                    width={1000}
                    height={500}
                    style={{
                        margin: "auto",
                        padding: "0", // Adjusted padding to 0
                        display: "block",
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                />
            </div>

            <div className="input-container">
                <input
                    id="slider"
                    style={{
                        margin: "auto",
                        width: "50%",
                    }}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    onChange={(e) => {
                        const value = e.target.value;
                    }}
                />
            </div>
        </>
    );
}

export default App;
