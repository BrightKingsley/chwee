"use client";
import styles from "./styles.module.css";

export default function CircularProgress({
  color,
  radius = 20,
  value,
  showPercentage = false,
}: // value = 0,
{
  radius?: number;
  value?: number;
  color?: string;
  showPercentage?: boolean;
}) {
  if (!radius || value === undefined) return null;

  const arcLength = 2 * Math.PI * radius;
  const progress = (percent: number) => {
    const value = arcLength * ((100 - percent) / 100);
    return value;
  };

  return (
    <div className="w-fit h-fit rotate-90 text-white font-bold flex items-center justify-center relative py-1 pt-2 bg-red-400">
      {showPercentage && <p className="absolute -rotate-90">{value}%</p>}
      <svg
        className={styles.circleSVG}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={radius * (5 / 2)}
        height={radius * (5 / 2)}
      >
        {/* <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#10cfb0" />
            <stop offset="100%" stopColor="#07594b" />
          </linearGradient>
        </defs> */}
        <circle
          style={{
            strokeDasharray: arcLength,
            strokeWidth: radius * (1 / 4),
            strokeDashoffset: progress(value),
          }}
          className={`${styles.circle} stroke-gray-500`}
          cx={radius}
          cy={radius}
          r={radius}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
