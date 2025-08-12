import Link from "next/link";

export const Sidebar = () => {
	return (
		<nav className="h-full w-1/5 bg-sidebar p-8 flex flex-col gap-8">
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
		</nav>
	);
};
