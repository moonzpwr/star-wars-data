import { Link } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useEffect, useState } from "react";
import { getPeople } from "../../helpers/api/getPeople";
import { Button, Skeleton } from "@mui/material";
import { Error } from "../../components/Error/Error";
import { useQuery } from "react-query";

export const HomePage: React.FC = () => {
  const [pageCount, setPageCount] = useState<number>(1);

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
    <table>
      <tbody>
        {Array(10)
          .fill(0)
          .map((el, i) => (
            <tr key={i}>
              <td>
                <Skeleton variant="rectangular" width={210} height={50} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <div>
      home
      {isError ? (
        <Error />
      ) : (
        <>
          {isLoading ? (
            tableSkeleton
          ) : (
            <ul>
              {peopleData?.map(({ name, id }) => (
                <li key={id}>
                  <Link to={`${Paths.person}${id}`}>{name}</Link>
                </li>
              ))}
            </ul>
          )}
          {pageCount !== 1 && (
            <Button
              variant="contained"
              onClick={handlePreviousPage}
              disabled={isLoading}
            >
              prev page
            </Button>
          )}
          {!(peopleData && peopleData.length < 10) && (
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={isLoading}
            >
              next page
            </Button>
          )}
        </>
      )}
    </div>
  );
};
