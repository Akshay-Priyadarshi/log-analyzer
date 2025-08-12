import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback } from "../ui";

export const Sidebar = () => {
	return (
		<nav className="h-screen w-1/5 bg-sidebar p-8 flex flex-col gap-8">
			<h1 className="p-1 text-3xl w-fit font-light border-2 border-foreground">
				LA
			</h1>
			<ul className="flex flex-col gap-2">
				<li>
					<Link href={"/dashboard/logs"} className="text-lg">
						Logs
					</Link>
				</li>
				<li>
					<Link href={"/dashboard/logs/insights"} className="text-lg">
						Insights
					</Link>
				</li>
			</ul>
			<div className="flex flex-row items-center justify-between mt-auto">
				<Avatar className="size-12">
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
};
