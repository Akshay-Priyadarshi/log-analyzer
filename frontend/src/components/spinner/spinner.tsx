import React from "react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";
type Variant = "ring" | "dot" | "pulse";

export interface SpinnerProps {
	size?: Size;
	variant?: Variant;
	colorClass?: string; // e.g. "text-blue-600" or "border-teal-500"
	label?: string; // optional visible label
}

const sizeMap: Record<Size, string> = {
	sm: "w-4 h-4 border-2",
	md: "w-6 h-6 border-2",
	lg: "w-8 h-8 border-4",
	xl: "w-12 h-12 border-4",
	"2xl": "w-24 h-24 border-4",
};

export function Spinner({
	size = "md",
	variant = "ring",
	colorClass = "border-blue-600",
	label,
}: SpinnerProps) {
	const base = sizeMap[size];

	if (variant === "dot") {
		return (
			<span
				role="progressbar"
				aria-live="polite"
				className="inline-flex items-center space-x-2"
			>
				<span
					className={`${base} rounded-full inline-block animate-pulse ${
						colorClass.replace("border-", "bg-") || "bg-blue-600"
					}`}
					aria-hidden="true"
				/>
				<span className="sr-only">{label ?? "Loading…"}</span>
			</span>
		);
	}

	if (variant === "pulse") {
		return (
			<span
				role="progressbar"
				aria-live="polite"
				className="inline-flex items-center space-x-2"
			>
				<span
					className={`${base} rounded-full border-4 border-transparent ${colorClass} animate-pulse`}
					aria-hidden="true"
				/>
				<span className="sr-only">{label ?? "Loading…"}</span>
			</span>
		);
	}

	// default: ring spinner (border-top colored)
	// ensure we have a lighter border for contrast
	return (
		<span
			role="progressbar"
			aria-live="polite"
			className="inline-flex items-center space-x-2"
		>
			<span
				className={`${base} rounded-full border-gray-200 ${colorClass.replace("text-", "border-")} border-t-transparent animate-spin`}
				style={{ borderTopColor: undefined }} // keep classes in control
				aria-hidden="true"
			/>
			{label ? (
				<span className="text-sm">{label}</span>
			) : (
				<span className="sr-only">Loading…</span>
			)}
		</span>
	);
}
