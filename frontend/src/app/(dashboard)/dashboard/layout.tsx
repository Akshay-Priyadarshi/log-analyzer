import type { PropsWithChildren } from "react";
import { Providers } from "@/app/providers";
import { Sidebar } from "@/components";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<Providers>
			<div className="w-screen h-screen flex flex-row">
				<Sidebar />
				<main className="flex-1 h-screen p-8 overflow-y-hidden">
					{children}
				</main>
			</div>
		</Providers>
	);
};

export default DashboardLayout;
