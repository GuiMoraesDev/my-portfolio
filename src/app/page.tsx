import { Github, Hamburger, LinkedIn } from "@/assets/icons";

export default function Home() {
  return (
    <main className="flex h-[100dvh] w-full flex-col items-center justify-center p-24 gap-3 bg-plum-900">
      <Github />
      <Hamburger />
      <LinkedIn />
    </main>
  );
}
