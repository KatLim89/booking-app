import { Button } from "react-bootstrap";

export default function IconButton({
  isTop,
  isBottom,
  className,
  onClick,
  text,
}) {
  let margin = "light rounded-pill";

  if (isTop) {
    margin = "light rounded-pill my-4";
  } else if (isBottom) {
    margin = "warning rounded mt-auto mb-4 fw-bold";
  }

  const iconMargin = text ? " me-3" : " ";

  return (
    <Button variant={margin} style={{ marginBottom: "7px" }} onClick={onClick}>
      <i
        className={className + iconMargin}
        style={{
          fontSize: isTop ? "36px" : "24px",
          color: isTop ? "orange" : "black",
        }}
      />
      {text}
    </Button>
  );
}
