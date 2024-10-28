import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ReactFlow, type Node, type Edge } from "@xyflow/react";
import { Error } from "../../components/Error/Error";
import { Paths } from "../../enums/Paths";
import { getNodes } from "../../helpers/getNodes";
import { getEdges } from "../../helpers/getEdges";
import { usePersonData } from "../../hooks/usePersonData";
import styles from "./DetailePage.module.css";
import "@xyflow/react/dist/style.css";
import { StyledButton } from "../../components/StyledButton/StyledButton";

export const DetailPage: React.FC = () => {
  const { data, isLoading, isError } = usePersonData();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

  //generate new nodes and edges for each person change
  useEffect(() => {
    if (data) {
      const generatedNotes = getNodes(data);
      const generatedEdges = getEdges(generatedNotes);
      setNodes(generatedNotes);
      setEdges(generatedEdges);
    }
  }, [data]);

  return (
    <div className={styles.rootContainer}>
      <StyledButton onClick={() => navigate(Paths.root)}>&#x276E;</StyledButton>
      {isError ? (
        <Error />
      ) : (
        <>
          {isLoading ? (
            <div className={styles.spinner} />
          ) : (
            data && (
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
