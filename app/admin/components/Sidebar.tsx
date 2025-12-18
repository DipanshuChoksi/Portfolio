import { adminNavLinks } from "@/consts";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="bg-accent w-1/5 h-screen">
      <h2 className="text-2xl">
        {" "}
        <Link href={"/"}>{"<Dipanshu />"}</Link>
      </h2>
      <div className="flex flex-wrap flex-col mt-5">
        {adminNavLinks.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="px-5 py-3 hover:bg-accent-foreground/20 cursor-pointer"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
