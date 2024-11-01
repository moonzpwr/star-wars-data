import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useEffect, useState } from "react";
import { Skeleton, List, ListItem, ListItemText } from "@mui/material";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import styles from "./HomePage.module.css";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { RawPerson } from "../../interfaces/Person";
import { getPeople } from "../../helpers/api";

export const HomePage: React.FC = () => {
  const [people, setPeople] = useState<RawPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getPeople(pageCount)
      .then(({ results }) => {
        setPeople(results);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [pageCount]);

  const handleNextPage = () => {
    setPageCount((prevState) => (prevState += 1));
  };
  const handlePreviousPage = () => {
    setPageCount((prevState) => (prevState -= 1));
  };

  const skeleton = (
    <List data-testid="skeleton">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <ListItem key={i}>
            <Skeleton
              variant="rectangular"
              width={638}
              height={48}
              sx={{ bgcolor: "rgba(144, 202, 249, 0.2)" }}
            />
          </ListItem>
        ))}
    </List>
  );

  return (
    <div className={styles.rootContainer}>
      {isError ? (
        <ErrorView />
      ) : (
        <>
          <img
            className={styles.logoImage}
            src="https://www.ozziecollectables.com/cdn/shop/files/IKO2001--StarWars-Logo-Neon-Sign-1.png?v=1724185198"
            alt="star wars logo"
          />
          {isLoading ? (
            skeleton
          ) : (
            <List>
              {people?.map(({ name, id }) => (
                <ListItem key={id}>
                  <button
                    className={styles.listItemButton}
                    onClick={() => navigate(`${Paths.person}${id}`)}
                    data-testid={`redirect-button-${name}`}
                  >
                    <ListItemText primary={name} />
                  </button>
                </ListItem>
              ))}
            </List>
          )}
          <div className={styles.buttonsContainer}>
            {pageCount !== 1 && (
              <StyledButton
                onClick={handlePreviousPage}
                dataTestId="previous-page"
              >
                &#x276E;
              </StyledButton>
            )}
            <div
              className={styles.pageCounterContainer}
              data-testid="page-count"
            >
              {pageCount}
            </div>
            {!(people && people.length < 10) && (
              <StyledButton onClick={handleNextPage} dataTestId="next-page">
                &#x276F;
              </StyledButton>
            )}
          </div>
        </>
      )}
    </div>
  );
};
