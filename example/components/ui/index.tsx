interface AspectRatioProps {
  ratio: number
}

export const AspectRatio: React.FC<AspectRatioProps> = ({ children, ratio }) => (
  <div className="relative" style={{ paddingBottom: `${ratio * 100}%` }}>
    <div className="absolute w-full h-full">{children}</div>
  </div>
);
