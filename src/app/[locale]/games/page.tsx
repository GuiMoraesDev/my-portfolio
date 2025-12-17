import { Spheres } from "@/components/atoms/Spheres";
import { Header } from "@/components/organisms/Header";

export default async function Games() {
  return (
    <main className="relative container flex w-full flex-col items-center">
      <Header />
      <Spheres />
    </main>
  );
}
