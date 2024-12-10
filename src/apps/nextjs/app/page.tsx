import {redirect} from "next/navigation";

export default function Home() {
    redirect("/game/wood");
    return null;
}
