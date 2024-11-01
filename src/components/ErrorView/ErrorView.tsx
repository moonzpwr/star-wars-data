import { StyledButton } from "../StyledButton/StyledButton";
import styles from "./ErrorView.module.css";

export const ErrorView: React.FC = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.textBlock}>Something gone wrong...</div>
      <StyledButton onClick={() => window.location.reload()}>
        reload page
      </StyledButton>
    </div>
  );
};
