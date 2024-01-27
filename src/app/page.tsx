import { Github, Hamburger, LinkedIn } from "@/assets/icons";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-24 gap-3">
      <Hamburger />
      <Github />
      <LinkedIn />
    </main>
  );
}
