import { Routes, Route } from "react-router-dom";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default app;