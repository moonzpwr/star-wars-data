import { Route, Routes } from "react-router-dom";
import { Paths } from "./enums/Paths";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { DetailPage } from "./pages/DetailPage/DetailPage";

export const AppRoutes: React.FC = () => {
  const { root, person } = Paths;
  return (
    <Routes>
      <Route path={root} element={<HomePage />}></Route>
      <Route path={`${person}:personId`} element={<DetailPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};
