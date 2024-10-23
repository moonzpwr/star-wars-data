import { Button } from "@mui/material";

export const Error: React.FC = () => {
  return (
    <div>
      Something gone wrong...{" "}
      <Button onClick={() => window.location.reload()}>reload page</Button>
    </div>
  );
};
