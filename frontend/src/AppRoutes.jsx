import { Routes, Route } from "react-router-dom";
import App from "./App";
import AssistantPage from "./AssistantPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path="assistant/:id" element={<AssistantPage />} />
      </Route>
      <Route
        path="*"
        element={
          <h1
            style={{
              color: "#fff",
            }}
          >
            Page Not Found
          </h1>
        }
      />
    </Routes>
  );
}
