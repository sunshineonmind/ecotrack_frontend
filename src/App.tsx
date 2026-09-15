import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { PracticesPage } from "./pages/PracticesPage";
import { PracticeDetailPage } from "./pages/PracticeDetailPage";
import { NewPracticePage } from "./pages/NewPracticePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/practices" element={<PracticesPage />} />
          <Route path="/practices/:id" element={<PracticeDetailPage />} />
          <Route path="/practices/new" element={<NewPracticePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
