import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Insight } from "@/schemas";

export const InsightCard = (props: Insight) => {
	const {
		id,
		observation,
		timestamp,
		category,
		severity,
		recommendation,
		confidence,
		tags,
		related_logs,
	} = props;

	return (
		<Card key={id} className="w-full border">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					<span className="font-semibold text-sm uppercase">
						{category ?? "GENERAL"}
					</span>
					<time className="text-xs text-muted-foreground" dateTime={timestamp}>
						{new Date(timestamp).toLocaleString()}
					</time>
				</CardTitle>
			</CardHeader>

			<CardContent>
				<p className="text-sm mb-2 font-medium">Observation:</p>
				<p className="text-sm mb-4">{observation}</p>

				{recommendation && (
					<>
						<p className="text-sm mb-1 font-medium">Recommendation:</p>
						<p className="text-sm mb-4 italic">{recommendation}</p>
					</>
				)}

				<div className="flex flex-wrap gap-4 text-xs items-center">
					{severity && (
						<span
							className={`px-2 py-1 rounded font-semibold ${
								{
									low: "bg-green-100 text-green-800",
									medium: "bg-yellow-100 text-yellow-800",
									high: "bg-orange-100 text-orange-800",
									critical: "bg-red-100 text-red-800",
								}[severity] || "bg-gray-100 text-gray-800"
							}`}
						>
							Severity: {severity.toUpperCase()}
						</span>
					)}

					{confidence !== null && confidence !== undefined && (
						<span>Confidence: {(confidence * 100).toFixed(1)}%</span>
					)}

					{tags && tags.length > 0 && (
						<span>
							Tags:{" "}
							{tags.map((tag, i) => (
								<small
									key={tag}
									className="mr-1 rounded bg-blue-100 px-1 py-0.5 text-blue-800"
								>
									{tag}
								</small>
							))}
						</span>
					)}
				</div>
			</CardContent>

			{related_logs && related_logs.length > 0 && (
				<CardFooter className="text-xs text-muted-foreground">
					Related Logs IDs:{" "}
					<div className="flex flex-row gap-2 overflow-x-scroll">
						{related_logs.map((logId, i) => (
							<code key={i} className="mr-2 w-fit bg-secondary">
								{logId}
							</code>
						))}
					</div>
				</CardFooter>
			)}
		</Card>
	);
};
