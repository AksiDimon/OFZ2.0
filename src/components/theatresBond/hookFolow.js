import {useRef, useState} from 'react'
export function useFollow (points) {
    const [hoverX, setHoverX] = useState(null) // Позиция мыши по оси X
    const [hoverPoint, setHoverPoint] = useState(null) // Ближайшая точка на графике
    const divRef = useRef(null);

    
const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect()// Границы графика
    const mouseX = e.clientX - rect.left; // Позиция мыши относительно графика
    const graphWidth = rect.width;

    // Нормализуем позицию мыши (от 0 до 1)
    const xRatio = mouseX / graphWidth;

    // Находим ближайшую точку на графике
    const closestPoint = points.reduce((prev, curr) => {
        // console.log(prev, curr)
        return Math.abs(curr.x - xRatio) < Math.abs(prev.x - xRatio) ? curr : prev
    }
        
    );
    // console.log(closestPoint, '🌈')
    setHoverX(mouseX); // Сохраняем позицию мыши
    setHoverPoint(closestPoint); // Сохраняем ближайшую точку
};

const handleMouseLeave = () => {
    setHoverX(null); // Скрываем курсор
    setHoverPoint(null);
};

return {divRef,hoverX, hoverPoint, handleMouseMove, handleMouseLeave}
}
   