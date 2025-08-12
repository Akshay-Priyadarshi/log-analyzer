"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { InsightCard, Spinner } from "@/components";
import type { Insight, InsightList } from "@/schemas";

const severityOptions = ["low", "medium", "high", "critical"] as const;
const categoryOptions = [
	"performance",
	"security",
	"availability",
	"anomaly",
] as const;

const fetchInsights = async (): Promise<Insight[]> => {
	try {
		const res = await axios.get<InsightList>(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/insights`,
		);
		return res.data.insights;
	} catch (error) {
		throw new Error("Failed to fetch insights");
	}
};

const DashboardLogsInsights = () => {
	// React Query fetch
	const {
		data: insights = [],
		isLoading,
		error,
	} = useQuery<Insight[], Error>({
		queryKey: ["insights"],
		queryFn: fetchInsights,
	});

	// Filters state
	const [selectedSeverity, setSelectedSeverity] = useState<string | "">("");
	const [selectedCategory, setSelectedCategory] = useState<string | "">("");
	const [tagFilter, setTagFilter] = useState<string>("");

	const [confidenceMin, setConfidenceMin] = useState<number | "">("");
	const [confidenceMax, setConfidenceMax] = useState<number | "">("");

	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	// Filter insights based on selected filters
	const filteredInsights = useMemo(() => {
		return insights.filter((insight) => {
			if (selectedSeverity && insight.severity !== selectedSeverity)
				return false;
			if (selectedCategory && insight.category !== selectedCategory)
				return false;

			if (
				tagFilter &&
				(!insight.tags ||
					!insight.tags.some((tag) =>
						tag.toLowerCase().includes(tagFilter.toLowerCase()),
					))
			)
				return false;

			if (
				(confidenceMin !== "" &&
					(insight.confidence === null ||
						insight.confidence === undefined ||
						insight.confidence < confidenceMin)) ||
				(confidenceMax !== "" &&
					(insight.confidence === null ||
						insight.confidence === undefined ||
						insight.confidence > confidenceMax))
			)
				return false;

			if (startDate) {
				const insightDate = new Date(insight.timestamp);
				const start = new Date(startDate);
				if (insightDate < start) return false;
			}

			if (endDate) {
				const insightDate = new Date(insight.timestamp);
				const end = new Date(endDate);
				if (insightDate > end) return false;
			}

			return true;
		});
	}, [
		insights,
		selectedSeverity,
		selectedCategory,
		tagFilter,
		confidenceMin,
		confidenceMax,
		startDate,
		endDate,
	]);

	if (isLoading)
		return (
			<div className="absolute top-[50%] left-[50%]">
				<Spinner size="2xl" />
			</div>
		);
	if (error) return <div>Failed to load insights: {error.message}</div>;

	return (
		<div className="w-full">
			<h1 className="bg-background text-xl font-bold mb-4">Insights</h1>

			{/* Filters UI */}
			<div className="mb-6 flex flex-wrap gap-4 items-end">
				{/* Severity */}
				<div>
					<label
						htmlFor="severity"
						className="block text-sm font-medium text-gray-700"
					>
						Severity
					</label>
					<select
						id="severity"
						value={selectedSeverity}
						onChange={(e) => setSelectedSeverity(e.target.value)}
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					>
						<option value="">All</option>
						{severityOptions.map((level) => (
							<option key={level} value={level}>
								{level.charAt(0).toUpperCase() + level.slice(1)}
							</option>
						))}
					</select>
				</div>

				{/* Category */}
				<div>
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700"
					>
						Category
					</label>
					<select
						id="category"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					>
						<option value="">All</option>
						{categoryOptions.map((cat) => (
							<option key={cat} value={cat}>
								{cat.charAt(0).toUpperCase() + cat.slice(1)}
							</option>
						))}
					</select>
				</div>

				{/* Tag filter */}
				<div>
					<label
						htmlFor="tagFilter"
						className="block text-sm font-medium text-gray-700"
					>
						Tag Contains
					</label>
					<input
						type="text"
						id="tagFilter"
						value={tagFilter}
						onChange={(e) => setTagFilter(e.target.value)}
						placeholder="Search tags"
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					/>
				</div>

				{/* Confidence Min */}
				<div>
					<label
						htmlFor="confidenceMin"
						className="block text-sm font-medium text-gray-700"
					>
						Confidence Min
					</label>
					<input
						type="number"
						id="confidenceMin"
						min={0}
						max={1}
						step={0.01}
						value={confidenceMin}
						onChange={(e) =>
							setConfidenceMin(
								e.target.value === "" ? "" : Number(e.target.value),
							)
						}
						placeholder="0.0"
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					/>
				</div>

				{/* Confidence Max */}
				<div>
					<label
						htmlFor="confidenceMax"
						className="block text-sm font-medium text-gray-700"
					>
						Confidence Max
					</label>
					<input
						type="number"
						id="confidenceMax"
						min={0}
						max={1}
						step={0.01}
						value={confidenceMax}
						onChange={(e) =>
							setConfidenceMax(
								e.target.value === "" ? "" : Number(e.target.value),
							)
						}
						placeholder="1.0"
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					/>
				</div>

				{/* Date range */}
				<div>
					<label
						htmlFor="startDate"
						className="block text-sm font-medium text-gray-700"
					>
						Start Date
					</label>
					<input
						type="date"
						id="startDate"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					/>
				</div>

				<div>
					<label
						htmlFor="endDate"
						className="block text-sm font-medium text-gray-700"
					>
						End Date
					</label>
					<input
						type="date"
						id="endDate"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="mt-1 block w-full rounded border-gray-300 shadow-sm"
					/>
				</div>

				{/* Reset Filters */}
				<div>
					<button
						type="button"
						onClick={() => {
							setSelectedSeverity("");
							setSelectedCategory("");
							setTagFilter("");
							setConfidenceMin("");
							setConfidenceMax("");
							setStartDate("");
							setEndDate("");
						}}
						className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					>
						Reset Filters
					</button>
				</div>
			</div>
			<div className="my-2">
				<p>
					Count: <span>{filteredInsights.length}</span>
				</p>
			</div>

			{/* Insights list */}
			<ul className="w-full overflow-y-scroll max-h-[600px] flex flex-col gap-2">
				{filteredInsights.length === 0 ? (
					<li>No insights match the selected filters.</li>
				) : (
					filteredInsights.map((insight) => (
						<InsightCard key={insight.id} {...insight} />
					))
				)}
			</ul>
		</div>
	);
};

export default DashboardLogsInsights;
