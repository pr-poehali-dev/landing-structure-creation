// Волнистый разделитель между крупными блоками секций.
// bg — цвет фона ПРЕДЫДУЩЕЙ секции (заливка всего разделителя).
// color — цвет заливки волны, совпадает с фоном СЛЕДУЮЩЕЙ секции.
// flip — отразить волну по вертикали (для чередования направления).
interface WaveDividerProps {
  bg?: string;
  color?: string;
  flip?: boolean;
}

export default function WaveDivider({ bg = "transparent", color = "#fbf4ea", flip = false }: WaveDividerProps) {
  return (
    <div className="wave-divider" aria-hidden="true" style={{ background: bg }}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path
          d="M0,32 C150,60 350,0 600,24 C850,48 1050,4 1200,28 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}