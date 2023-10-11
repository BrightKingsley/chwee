"use client";

import Media from "react-media";

export default function ScreenWidth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Media queries={{ small: { maxWidth: 640 } }}>
    {/* <Media queries={{ small: { maxWidth: 1200 } }}> */}
      {(matches) => {
        return matches.small ? children : <div>Screen Too big</div>;
      }}
    </Media>
  );
}
