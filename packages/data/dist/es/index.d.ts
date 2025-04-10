import { z } from 'zod';

declare const TriggerSchema: z.ZodObject<{
    time: z.ZodString;
    timeOffset: z.ZodNumber;
    tempThreshold: z.ZodNumber;
    tempAboveBelow: z.ZodEnum<["above", "below"]>;
    tempUnits: z.ZodEnum<["F", "C"]>;
}, "strip", z.ZodTypeAny, {
    time: string;
    timeOffset: number;
    tempThreshold: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
}, {
    time: string;
    timeOffset: number;
    tempThreshold: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
}>;
type Trigger = z.infer<typeof TriggerSchema>;

export { TriggerSchema };
export type { Trigger };
