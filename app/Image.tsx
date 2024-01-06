import { unstable_useViewTransitionState } from "@remix-run/react";

export const Image = ({
  data,
  style,
  url,
}: {
  data: any;
  style?: any;
  url: string;
}) => {
  const isTransitioning = unstable_useViewTransitionState(url);

  return (
    <img
      style={{
        ...(isTransitioning && {
          viewTransitionName: isTransitioning && data.name ? data.name : "",
        }),

        marginLeft: "400px",
        height: "200px",
        ...style,
      }}
      src={data?.image}
    />
  );
};
