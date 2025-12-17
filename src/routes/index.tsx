import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import HeroTitle from "@/components/HeroTitle";
import Techstack from "@/components/Techstack";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  loader: async () => {
    const { data: about } = await supabase
      .from("about_me")
      .select("description")
      .eq("id", 1)
      .single();
    const { data: services } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });
    const { data: projects } = await supabase.from("projects").select("*");
    return { about, services, projects };
  },
  component: App,
});

function App() {
  const { about, services, projects } = Route.useLoaderData();

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-10 sm:py-16 md:py-20"
      >
        <HeroTitle />
        <Techstack />
        <AboutMe description={about?.description ?? ""} />
        <Services services={services ?? []} />
        <Projects projects={projects ?? []} />
      </motion.div>
      <Footer />
    </>
  );
}
