import { Github, Hamburger } from "@/assets/icons";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-24">
      <Hamburger />
      <Github />
    </main>
  );
}
