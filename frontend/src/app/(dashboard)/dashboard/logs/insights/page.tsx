"use client";

import { useEffect, useState } from "react";
import { InsightCard } from "@/components";
import type { Insight, InsightList } from "@/schemas";

const DashboardLogsInsights = () => {
	const [insights, setInsights] = useState<Insight[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInsights = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/insights`,
				);
				if (!res.ok) throw new Error("Failed to fetch insights");
				const data: InsightList = await res.json();
				setInsights(data.insights);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchInsights();
	}, []);

	if (loading) return <div>Loading insights...</div>;
	if (error) return <div>Failed to load insights: {error}</div>;

	return (
		<div className="w-full">
			<h1 className="bg-background text-xl font-bold">Insights</h1>
			<ul className="w-full overflow-y-scroll">
				{insights.map((insight) => (
					<InsightCard key={insight.id} {...insight} />
				))}
			</ul>
		</div>
	);
};

export default DashboardLogsInsights;
