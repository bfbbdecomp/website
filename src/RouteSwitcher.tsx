import { Route, Routes } from "react-router-dom";
import { OverallProgress } from "./OverallProgress";
import { About } from "./About";
import { Functions } from "./Functions";

export const RouteSwitcher = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404 Not Found.</div>} />
      <Route path="/" element={<OverallProgress />} />
      <Route path="/progress" element={<OverallProgress />} />
      <Route path="/functions" element={<Functions />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};
