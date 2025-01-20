import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMouseSelector } from '../calcsFuncs/calcsQuotes/myHook';
import { testMyHookSlice } from '../redux/testMyHookSlice';
export function TestMyHook() {
  const onPointerUp = (selectionBox) => {
    // console.log('>>>>>', selectionBox);
    setResult(JSON.stringify(selectionBox));
  };

  const [result, setResult] = useState('');

  const {
    divRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    selectionBox,
  } = useMouseSelector(onPointerUp);

  return (
    <div
      style={{
        border: '1px solid, black',
        width: '600px',
        height: '400px',
        margin: '40px',
        position: 'relative',
      }}
      ref={divRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {result}
      {selectionBox !== null && (
        <div
          style={{
            position: 'absolute',
            left: `${selectionBox.x * 100}%`,
            top: `${selectionBox.y * 100}%`,
            width: `${selectionBox.width * 100}%`,
            height: `${selectionBox.height * 100}%`,
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            border: '1px dashed #007bff',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
}
