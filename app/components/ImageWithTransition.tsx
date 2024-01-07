import { LinkProps, unstable_useViewTransitionState } from "@remix-run/react";

export interface ImageWithTransitionProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  transitionName: string;
  to: LinkProps["to"];
}

export const ImageWithTransition = ({
  transitionName,
  style,
  to,
  src,
  ...props
}: ImageWithTransitionProps) => {
  const isTransitioning = unstable_useViewTransitionState(to);

  return (
    <img
      {...props}
      style={{
        ...(isTransitioning && {
          viewTransitionName: transitionName,
        }),
        height: "200px",
        ...style,
      }}
      src={src}
    />
  );
};
