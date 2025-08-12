import { z } from "zod";

// Insight schema
export const InsightSchema = z.object({
	id: z
		.string()
		.uuid()
		.optional()
		.default(() => crypto.randomUUID()),
	observation: z.string(),
	severity: z.enum(["low", "medium", "high", "critical"]).optional().nullable(),
	category: z
		.enum(["performance", "security", "availability", "anomaly"])
		.optional()
		.nullable(),
	related_logs: z.array(z.string().uuid()).optional().nullable(),
	timestamp: z
		.string()
		.optional()
		.default(() => new Date().toISOString()),
	recommendation: z.string().optional().nullable(),
	confidence: z.number().min(0).max(1).optional().nullable(),
	tags: z.array(z.string()).optional().nullable(),
});

export type Insight = z.infer<typeof InsightSchema>;

// InsightList schema
export const InsightListSchema = z.object({
	insights: z.array(InsightSchema),
});

export type InsightList = z.infer<typeof InsightListSchema>;
