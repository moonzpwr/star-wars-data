import { useNavigate } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useEffect, useState } from "react";
import { getPeople } from "../../helpers/api/getPeople";
import { Button, Skeleton, List, ListItem, ListItemText } from "@mui/material";
import { Error } from "../../components/Error/Error";
import { useQuery } from "react-query";
import styles from "./HomePage.module.css";

export const HomePage: React.FC = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();

  const {
    data: peopleData,
    isLoading,
    isError,
  } = useQuery(["peopleList", pageCount], () => getPeople(pageCount));

  useEffect(() => {}, [pageCount]);

  const handleNextPage = () => {
    setPageCount((prevState) => (prevState += 1));
  };
  const handlePreviousPage = () => {
    setPageCount((prevState) => (prevState -= 1));
  };

  const tableSkeleton = (
    <List>
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
        <Error />
      ) : (
        <>
          {isLoading ? (
            tableSkeleton
          ) : (
            <>
              <img
                className={styles.logoImage}
                src="https://www.ozziecollectables.com/cdn/shop/files/IKO2001--StarWars-Logo-Neon-Sign-1.png?v=1724185198"
                alt="star wars logo"
              />
              <List>
                {peopleData?.map(({ name, id }) => (
                  <ListItem key={id}>
                    <button
                      className={styles.listItemButton}
                      onClick={() => navigate(`${Paths.person}${id}`)}
                    >
                      <ListItemText primary={name} />
                      {/* <img
                      src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                      alt={name}
                      style={{ width: 40 }}
                    /> */}
                    </button>
                  </ListItem>
                ))}
              </List>
            </>
          )}
          <div className={styles.buttonsContainer}>
            {pageCount !== 1 && (
              <Button
                sx={{
                  backgroundColor: "rgba(144, 202, 249, 0.3)",
                  color: "rgba(255, 238, 88, 1)",
                }}
                variant="contained"
                onClick={handlePreviousPage}
                disabled={isLoading}
              >
                &#x276E;
              </Button>
            )}
            {!(peopleData && peopleData.length < 10) && (
              <Button
                sx={{
                  backgroundColor: "rgba(144, 202, 249, 0.3)",
                  color: "rgba(255, 238, 88, 1)",
                }}
                variant="contained"
                onClick={handleNextPage}
                disabled={isLoading}
              >
                &#x276F;
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
