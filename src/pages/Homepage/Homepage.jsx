import { useSelector } from "react-redux";
import AdminPanel from "./AdminPanel";
import PublicHome from "../PublicHome/PublicHome";

export default function Homepage() {
  const { user } = useSelector((state) => state.authentication);
  const component =
    user?.email === "admin@admin.com" ? <AdminPanel /> : <PublicHome />;
  return component;
}
