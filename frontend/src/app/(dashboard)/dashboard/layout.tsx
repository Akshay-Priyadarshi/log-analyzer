import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="w-screen h-screen flex flex-row">
			<Sidebar />
			<main className="flex-1 h-screen p-8 overflow-y-scroll">{children}</main>
		</div>
	);
};

export default DashboardLayout;
