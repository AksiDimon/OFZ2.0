import { useState, useRef } from "react";

export function useMouseSelector(onPointerUp) {
  const [startPosition, setStartPosition] = useState(null); //запоминаю начальную координату выделения
  const [selectionBox, setSelectionBox] = useState(null);
  const divRef = useRef(null);
  
  function getCordinates(event) {
    const rect = divRef.current.getBoundingClientRect();

    // console.log(rect, '🎃')
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    return { x, y };
  }
  function handlePointerDown(event) {
    // console.log(getCordinates(event), '||||')
    const position = getCordinates(event);
    setStartPosition(position);

   
    setSelectionBox({ x: position.x, y: position.y, width: 0, height: 0 }); // Начальная область
  }

  function handlePointerMove(event) {
    if (!startPosition) {
      return;
    }
    const currentPosition = getCordinates(event);
    // console.log(currentPosition, '💄')
    const x = Math.min(startPosition.x, currentPosition.x);
    const y = Math.min(startPosition.y, currentPosition.y);
    const width = Math.abs(currentPosition.x - startPosition.x); // делаю Mathc.abs что бы всегда было положительным число, и не уходило в отрицательность
    const height = Math.abs(currentPosition.y - startPosition.y);

   
    setSelectionBox({ x: x, y: y, width, height });
    
  }

  function handlePointerUp(event) {

    onPointerUp(selectionBox);


    setStartPosition(null);
  }


  return { divRef, handlePointerDown, handlePointerMove, handlePointerUp, selectionBox: startPosition === null ? null : selectionBox };
}