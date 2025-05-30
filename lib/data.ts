import { components, paths } from "@/lib/schema";

export function getPath<PathKey extends keyof paths>(path: PathKey): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}
//types
export type CreateOrder = components["schemas"]["CreateOrder"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type Order = components["schemas"]["Order"];
export type OrderLine = components["schemas"]["OrderLine"];
export type Product = components["schemas"]["Product"];
export type Stock = components["schemas"]["Stock"];
export type ValidTypes = components["schemas"]["ValidTypes"];
