import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@mui/material";
import { ReactFlow, type Node, type Edge } from "@xyflow/react";
import { Error } from "../../components/Error/Error";
import { Paths } from "../../enums/Paths";
import { getNodes } from "../../helpers/getNodes";
import { getEdges } from "../../helpers/getEdges";
import { usePersonData } from "../../hooks/usePersonData";
import "@xyflow/react/dist/style.css";

export const DetailPage: React.FC = () => {
  const { data, isLoading, isError } = usePersonData();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const generatedNotes = getNodes(data);
      const generatedEdges = getEdges(generatedNotes);
      setNodes(generatedNotes);
      setEdges(generatedEdges);
    }
  }, [data]);

  const skeleton = <Skeleton variant="rectangular" width={210} height={50} />;

  return (
    <div>
      <Button onClick={() => navigate(Paths.root)}>back</Button>
      {isError ? (
        <Error />
      ) : (
        <>
          {isLoading
            ? skeleton
            : data && (
                <div
                  style={{
                    width: "1500px",
                    height: "600px",
                    backgroundColor: "red",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <ReactFlow nodes={nodes} edges={edges} />
                </div>
              )}
        </>
      )}
    </div>
  );
};
