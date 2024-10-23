import { Link } from "react-router-dom";
import { Paths } from "../../enums/Paths";
import { useEffect, useState } from "react";
import { getPeople } from "../../helpers/api/getPeople";
import { Button, Skeleton } from "@mui/material";
import { Error } from "../../components/Error/Error";
import { Person } from "../../interfaces/Person";

export const HomePage: React.FC = () => {
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getPeople(pageCount);
        setPeopleData(result);
      } catch (error) {
        setIsFailed(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pageCount]);

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
      {isFailed ? (
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
