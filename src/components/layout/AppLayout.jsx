import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { StickyNavbar } from "./StickyNavbar";
import { Footer } from "./Footer";
import { LoginModal } from "../auth/LoginModal";
import { RegisterModal } from "../auth/RegisterModal";
import { ToastViewport } from "../ui/ToastViewport";
import { useUI } from "../../context/UIContext";

export function AppLayout() {
  const { toasts } = useUI();

  return (
    <div className="app-shell">
      <Header />
      <StickyNavbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <LoginModal />
      <RegisterModal />
      <ToastViewport toasts={toasts} />
    </div>
  );
}

