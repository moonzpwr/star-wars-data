export interface Node {
  id: string;
  data: { label: string };
  style: { border: string; padding: number };
  position: { x: number; y: number };
}
