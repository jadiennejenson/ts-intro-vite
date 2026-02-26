import React, { useEffect, useRef } from "react";
import type { Project } from "../models/project";
import { projects } from "../data/projects";

type StatusTone = "green" | "yellow" | "red";

function getTone(status: Project["status"]): StatusTone {
	switch (status) {
		case "active":
			return "green";
		case "blocked":
			return "red";
		default:
			return "yellow";
	}
}

function applyStatusClasses(el: HTMLDivElement, tone: StatusTone): void {
	// Only manage status classes here; do NOT remove highlight classes.
	el.classList.remove(
		"border-green-500",
		"bg-green-50",
		"text-green-800",
		"border-yellow-500",
		"bg-yellow-50",
		"text-yellow-800",
		"border-red-500",
		"bg-red-50",
		"text-red-800"
	);
	if (tone === "green") el.classList.add("border-green-500", "bg-green-50", "text-green-800");
	if (tone === "yellow") el.classList.add("border-yellow-500", "bg-yellow-50", "text-yellow-800");
	if (tone === "red") el.classList.add("border-red-500", "bg-red-50", "text-red-800");
}

const highlightClasses = ["ring-2", "ring-indigo-500", "ring-offset-2", "ring-offset-white"] as const;

export function ProjectDashboard(): React.ReactElement {
	const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
	const statusRefs = useRef<Array<HTMLSpanElement | null>>([]);

	useEffect(() => {
		projects.forEach((p, i) => {
			const cardEl = cardRefs.current[i];
			const statusEl = statusRefs.current[i];
			if (!cardEl || !statusEl) return;

			const tone = getTone(p.status);
			applyStatusClasses(cardEl, tone);

			cardEl.setAttribute("data-project-status", String(p.status));
			cardEl.setAttribute("data-status-tone", tone);

			const extra = tone === "red" ? " (needs attention)" : "";
			statusEl.textContent = `Status: ${String(p.status)}${extra}`;
		});
	}, []);

	function toggleHighlight(index: number): void {
		const cardEl = cardRefs.current[index];
		if (!cardEl) return;

		// Toggle each class in our highlight set
		highlightClasses.forEach((c) => cardEl.classList.toggle(c));

		// Decide the final state by checking ONE class
		const isHighlighted = cardEl.classList.contains("ring-2");
		cardEl.setAttribute("data-highlighted", String(isHighlighted));
	}

	return (
		<section className="mx-auto max-w-5xl p-6">
			<h1 className="mb-4 text-2xl font-semibold text-slate-900">Project Dashboard</h1>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{projects.map((p, i) => (
					<div
						key={p.id}
						ref={(el) => {
							cardRefs.current[i] = el;
						}}
						data-project-id={p.id}
						className="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 shadow-sm"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="text-lg font-semibold">{p.name}</h2>
								<span
									ref={(el) => {
										statusRefs.current[i] = el;
									}}
									className="mt-2 inline-block text-xs text-slate-700"
								>
									Status: {p.status}
								</span>
							</div>

							<button
								type="button"
								className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
								aria-pressed={false}
								onClick={(e) => {
									toggleHighlight(i);

									// Update aria-pressed to match the DOM state after toggling
									const cardEl = cardRefs.current[i];
									const isHighlighted = Boolean(cardEl?.classList.contains("ring-2"));
									(e.currentTarget as HTMLButtonElement).setAttribute(
										"aria-pressed",
										String(isHighlighted)
									);
								}}
							>
								Toggle highlight
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
