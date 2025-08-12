import { z } from "zod";

// Log schema
export const LogSchema = z.object({
	id: z
		.string()
		.uuid()
		.optional()
		.default(() => crypto.randomUUID()),
	level: z.enum(["INFO", "WARN", "ERROR", "DEBUG", "CRITICAL"]),
	message: z.string(),
	timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid ISO date string",
	}),
	source: z.string().optional().nullable(),
	host: z.string().optional().nullable(),
	application_id: z.string().optional().nullable(),
	thread_id: z.string().optional().nullable(),
	environment: z.string().optional().nullable(),
	error_code: z.string().optional().nullable(),
	stack_trace: z.string().optional().nullable(),
	context: z.record(z.string(), z.string()).optional().nullable(),
});

export type Log = z.infer<typeof LogSchema>;
