import { useLayoutEffect, useRef, useState } from 'react';

 export function MeasuredBox() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Сразу после рендера, до paint, замерим высоту
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
      // Можем сразу обновить стили или state, чтобы
      // браузер сразу отрисовал корректные размеры
      console.log('MeasuredBox', '🎶', rect)
      //передвигаем на 300px вниз  до отрисовки компонента синхроннно 
      ref.current.style.marginTop = '10vh';
    }
    console.log('MeasuredBox', '👌🏾', ref)
  }, []); // срабатывает один раз после монтирования
console.log( ref)
  return (
    <div>
      <div ref={ref}>
        Содержимое, размер которого нужно узнать
      </div>
      <p>Высота блока: {height}px</p>
    </div>
  );
}