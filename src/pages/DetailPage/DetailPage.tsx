import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactFlow, type Node, type Edge } from "@xyflow/react";
import { ErrorView } from "../../components/ErrorView/ErrorView";
import { Paths } from "../../enums/Paths";
import { getNodes } from "../../helpers/getNodes";
import { getEdges } from "../../helpers/getEdges";
import styles from "./DetailePage.module.css";
import "@xyflow/react/dist/style.css";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { Person } from "../../interfaces/Person";
import { getFilms, getPerson, getStarships } from "../../helpers/api";

export const DetailPage: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { personId } = useParams(); //person id from url
  const navigate = useNavigate();

  useEffect(() => {
    getPerson(Number(personId))
      .then((person) => {
        const filmsPromise = getFilms(person.films);
        const starshipsPromise = getStarships(person.starships);
        Promise.all([filmsPromise, starshipsPromise]).then((values) => {
          const films = values[0].results;
          const starships = values[1].results;
          setPerson({
            ...person,
            films,
            starships,
          });
          setIsLoading(false);
        });
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [personId]);

  //generate new nodes and edges for each person change
  useEffect(() => {
    if (person) {
      const generatedNotes = getNodes(person);
      const generatedEdges = getEdges(generatedNotes);
      setNodes(generatedNotes);
      setEdges(generatedEdges);
    }
    //data clearing so that previous data does not appear when switching to DetailPage
    return () => {
      setNodes([]);
      setEdges([]);
    };
  }, [person]);

  return (
    <div className={styles.rootContainer}>
      <StyledButton
        onClick={() => navigate(Paths.root)}
        dataTestId="back-button"
      >
        &#x276E;
      </StyledButton>
      {isError ? (
        <ErrorView />
      ) : (
        <>
          {isLoading ? (
            <div className={styles.spinner} />
          ) : (
            person && (
              <div className={styles.nodesContainer}>
                <ReactFlow nodes={nodes} edges={edges} />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};
