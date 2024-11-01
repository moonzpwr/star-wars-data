import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: string | JSX.Element;
  dataTestId?: string;
}

export const StyledButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  children,
  dataTestId = "button",
}) => {
  return (
    <Button
      sx={{
        backgroundColor: "rgba(144, 202, 249, 0.3)",
        color: "rgba(255, 238, 88, 1)",
      }}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
};
