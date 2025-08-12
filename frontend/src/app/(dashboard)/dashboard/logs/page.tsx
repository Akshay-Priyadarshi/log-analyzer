"use client";

import { useEffect, useMemo, useState } from "react";
import { LogCard } from "@/components";
import type { Log } from "@/schemas";

const levels = ["INFO", "WARN", "ERROR", "DEBUG", "CRITICAL"];

const DashboardLogs = () => {
	const [insights, setInsights] = useState<Log[]>([]);
	const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// Filters
	const [levelFilter, setLevelFilter] = useState<string>("");
	const [sourceFilter, setSourceFilter] = useState<string>("");
	const [hostFilter, setHostFilter] = useState<string>("");
	const [environmentFilter, setEnvironmentFilter] = useState<string>("");
	const [appIdFilter, setAppIdFilter] = useState<string>("");
	const [errorCodeFilter, setErrorCodeFilter] = useState<string>("");

	// Date range filters (strings in yyyy-MM-dd format)
	const [startDateFilter, setStartDateFilter] = useState<string>("");
	const [endDateFilter, setEndDateFilter] = useState<string>("");

	// Helper to get unique sorted options for a given key in logs
	const getUniqueOptions = (key: keyof Log) => {
		const options = new Set<string>();
		for (const log of insights) {
			const val = log[key];
			if (val && typeof val === "string") options.add(val);
		}
		return Array.from(options).sort();
	};

	const sourceOptions = getUniqueOptions("source");
	const hostOptions = getUniqueOptions("host");
	const environmentOptions = getUniqueOptions("environment");
	const appIdOptions = getUniqueOptions("application_id");
	const errorCodeOptions = getUniqueOptions("error_code");

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logs`);
				if (!res.ok) throw new Error("Failed to fetch logs");
				const data: Log[] = await res.json();
				setInsights(data);
				setFilteredLogs(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchLogs();
	}, []);

	useEffect(() => {
		let filtered = insights;

		if (levelFilter) {
			filtered = filtered.filter((log) => log.level === levelFilter);
		}

		if (sourceFilter) {
			filtered = filtered.filter((log) => log.source === sourceFilter);
		}

		if (hostFilter) {
			filtered = filtered.filter((log) => log.host === hostFilter);
		}

		if (environmentFilter) {
			filtered = filtered.filter(
				(log) => log.environment === environmentFilter,
			);
		}

		if (appIdFilter) {
			filtered = filtered.filter((log) => log.application_id === appIdFilter);
		}

		if (errorCodeFilter) {
			filtered = filtered.filter((log) => log.error_code === errorCodeFilter);
		}

		if (startDateFilter) {
			filtered = filtered.filter(
				(log) => new Date(log.timestamp) >= new Date(startDateFilter),
			);
		}

		if (endDateFilter) {
			filtered = filtered.filter(
				(log) => new Date(log.timestamp) <= new Date(endDateFilter),
			);
		}

		setFilteredLogs(filtered);
	}, [
		levelFilter,
		sourceFilter,
		hostFilter,
		environmentFilter,
		appIdFilter,
		errorCodeFilter,
		startDateFilter,
		endDateFilter,
		insights,
	]);

	const memoisedFilteredLogsLength = useMemo(
		() => filteredLogs.length,
		[filteredLogs],
	);

	if (loading) return <div>Loading logs...</div>;
	if (error) return <div>Failed to load logs: {error}</div>;

	return (
		<div className="w-full">
			<h1 className="bg-background text-xl font-bold mb-4">Logs</h1>

			{/* Filters */}
			<div className="mb-6 flex flex-wrap gap-4">
				{/* Level */}
				<select
					value={levelFilter}
					onChange={(e) => setLevelFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Levels</option>
					{levels.map((lvl) => (
						<option key={lvl} value={lvl}>
							{lvl}
						</option>
					))}
				</select>

				{/* Source */}
				<select
					value={sourceFilter}
					onChange={(e) => setSourceFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Sources</option>
					{sourceOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* Host */}
				<select
					value={hostFilter}
					onChange={(e) => setHostFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Hosts</option>
					{hostOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* Environment */}
				<select
					value={environmentFilter}
					onChange={(e) => setEnvironmentFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Environments</option>
					{environmentOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* Application ID */}
				<select
					value={appIdFilter}
					onChange={(e) => setAppIdFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Application IDs</option>
					{appIdOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* Error Code */}
				<select
					value={errorCodeFilter}
					onChange={(e) => setErrorCodeFilter(e.target.value)}
					className="border rounded p-2"
				>
					<option value="">All Error Codes</option>
					{errorCodeOptions.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>

				{/* Date range */}
				<div className="flex gap-2 items-center">
					<label>
						From:{" "}
						<input
							type="date"
							value={startDateFilter}
							onChange={(e) => setStartDateFilter(e.target.value)}
							className="border rounded p-2"
						/>
					</label>
					<label>
						To:{" "}
						<input
							type="date"
							value={endDateFilter}
							onChange={(e) => setEndDateFilter(e.target.value)}
							className="border rounded p-2"
						/>
					</label>
				</div>
			</div>
			<div className="m-2">
				<p>
					Count: <span>{memoisedFilteredLogsLength}</span>
				</p>
			</div>
			<ul className="w-full overflow-y-scroll max-h-[600px] flex flex-col gap-4">
				{filteredLogs.length === 0 ? (
					<div>No logs found matching filters.</div>
				) : (
					filteredLogs.map((log) => <LogCard key={log.id} {...log} />)
				)}
			</ul>
		</div>
	);
};

export default DashboardLogs;
