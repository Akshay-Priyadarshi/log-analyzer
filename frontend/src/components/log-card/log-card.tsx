import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // adjust import path if needed
import type { Log } from "@/schemas";

export const LogCard = (props: Log) => {
	const {
		id,
		message,
		timestamp,
		level,
		application_id,
		source,
		environment,
		error_code,
		host,
	} = props;

	return (
		<Card key={id} className="w-full">
			<CardHeader>
				<CardTitle className="flex justify-between items-center">
					<span className="font-semibold text-sm uppercase">
						{level ?? "INFO"}
					</span>
					<time className="text-xs text-muted-foreground" dateTime={timestamp}>
						{new Date(timestamp).toLocaleString()}
					</time>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col">
				<p>Message: {message}</p>
				<p className="text-muted-foreground">Log ID: {id}</p>
				<p className="text-muted-foreground">
					Application Id: {application_id}
				</p>
				<p className="text-muted-foreground">Environment: {environment}</p>
				<p className="text-muted-foreground">Error Code: {error_code}</p>
				<p className="text-muted-foreground">Host: {host}</p>
				<p className="text-muted-foreground">Source: {source}</p>
			</CardContent>
		</Card>
	);
};
