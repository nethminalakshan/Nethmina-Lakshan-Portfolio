import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn } from "../../utils/helpers";
import "./Button.css";

export default function Button({
  href,
  to,
  variant = "primary",
  className,
  type,
  children,
  ...rest
}) {
  const classes = cn(
    "btn",
    variant === "ghost" ? "btnGhost" : "btnPrimary",
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "ghost"]),
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};
