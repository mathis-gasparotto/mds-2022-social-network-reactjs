import { Outlet } from "react-router";
import { Header } from "./layouts/Header";

export function AppLayout() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}