import Introduce from "@/components/Introduce/Introduce";
import AboutMe from "@/components/aboutme/AboutMe/AboutMe";
import Contact from "@/components/contact/Contact/Contact";
import Header from "@/components/header/Header";
import MainProjects from "@/components/main-projects/MainProjects/MainProjects";
import SideEmail from "@/components/side/SideEmail/SideEmail";
import SideSocial from "@/components/side/SideSocial/SideSocial";
import Skills from "@/components/skills/Skills/Skills";
import SubProjects from "@/components/sub-projects/SubProjects/SubProjects";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-screen-xl px-20">
        <div className=" mx-auto max-w-[1000px]">
          <Introduce />
          <AboutMe />
          <Skills />
          <MainProjects />
          <SubProjects />
          <Contact />
        </div>
      </div>
      <SideSocial />
      <SideEmail />
    </main>
  );
}
