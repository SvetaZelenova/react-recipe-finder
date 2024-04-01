import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNavigation/MainNavigation";

const Root = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Root;
