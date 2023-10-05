import type { LinksFunction, MetaFunction } from "@remix-run/node";
import BoxShadow from "./box-shadow";
import Box,{links as box} from "~/components/BoxShadow/Box";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
 <div><Box/></div>

  );
}
export const links: LinksFunction = () => {
  return [...box()]
}