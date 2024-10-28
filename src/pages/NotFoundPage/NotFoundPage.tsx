import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import styles from "./NotFoundPage.module.css";
import { Paths } from "../../enums/Paths";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.rootContainer}>
      <div className={styles.textBlock}>Not found</div>
      <StyledButton onClick={() => navigate(Paths.root)}>home</StyledButton>
    </div>
  );
};
