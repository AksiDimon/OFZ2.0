import { Outlet } from "react-router-dom";
import { Header } from "./header";
export function Layout() {
  return (
    <div>
      <Header /> {/* Шапка будет отображаться на всех страницах */}
      <main>
        <Outlet /> {/* Здесь будут рендериться дочерние маршруты */}
      </main>
    </div>
  );
}
