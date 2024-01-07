import { Link, LinkProps } from "@remix-run/react";
import {
  ImageWithTransition,
  ImageWithTransitionProps,
} from "./ImageWithTransition";

interface LinkAndImageTransitionProps extends LinkProps {
  withTitle?: boolean;
  imgProps: Omit<ImageWithTransitionProps, "to">;
}

const LinkAndImageTransition = ({
  to,
  className,
  imgProps,
  withTitle = false,
}: LinkAndImageTransitionProps) => {
  return (
    <Link to={to} className={className} unstable_viewTransition>
      <ImageWithTransition to={to} {...imgProps} />
      {withTitle && (
        <h2 className="text-lg font-semibold">{imgProps.transitionName}</h2>
      )}
    </Link>
  );
};

export { LinkAndImageTransition };
