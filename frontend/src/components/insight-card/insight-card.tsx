import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Insight } from "@/schemas"; // replace with your actual Insight type

export const InsightCard = (props: Insight) => {
	const { id, observation, timestamp, category } = props;

	return (
		<Card key={id} className="w-full my-2">
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
				<p className="text-sm">{observation}</p>
			</CardContent>
			<CardFooter>
				<small className="text-muted-foreground">Insight ID: {id}</small>
			</CardFooter>
		</Card>
	);
};
