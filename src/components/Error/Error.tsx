import { StyledButton } from "../StyledButton/StyledButton";
import styles from "./Error.module.css";

export const Error: React.FC = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.textBlock}>Something gone wrong...</div>
      <StyledButton onClick={() => window.location.reload()}>
        reload page
      </StyledButton>
    </div>
  );
};
