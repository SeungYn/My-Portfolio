export default function SideEmail() {
  return (
    <div className="fixed bottom-0 right-[30px] z-20 w-[30px] max-md:right-[10px] max-sm:hidden">
      <div className="flex flex-col items-center gap-4">
        <a
          href="mailto:kwls0407@gmail.com"
          className="vertical-rl text-base tracking-widest hover:-translate-y-2"
        >
          kwls0407@gmail.com
        </a>
        <div className="h-[120px] w-[1px] bg-light-slate"></div>
      </div>
    </div>
  );
}
