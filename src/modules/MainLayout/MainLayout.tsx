import { ReactNode } from "react";
import Navbar from "../../components/Navbar/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
  </div>
);

export default MainLayout;
