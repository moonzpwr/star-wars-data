import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Person } from "../../interfaces/Person";
import { getPerson } from "../../helpers/api/getPerson";
import { Button, Skeleton } from "@mui/material";
import { Error } from "../../components/Error/Error";
import { Paths } from "../../enums/Paths";
import "@xyflow/react/dist/style.css";
import { ReactFlow } from "@xyflow/react";
import { getNodes } from "../../helpers/api/getNodes";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

export const DetailPage: React.FC = () => {
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const { personId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (personId) {
        setIsLoading(true);
        try {
          const result = await getPerson(Number(personId));
          setPerson(result);
        } catch (error) {
          setIsFailed(true);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [personId]);

  const skeleton = <Skeleton variant="rectangular" width={210} height={50} />;

  return (
    <div>
      detail page
      <Button onClick={() => navigate(Paths.root)}>back</Button>
      {isFailed ? (
        <Error />
      ) : (
        <>{isLoading ? skeleton : person && <ul>{person?.name}</ul>}</>
      )}
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "red",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onEdgesChange={() => {}}
          onNodesChange={() => {}}
        />
      </div>
    </div>
  );
};
