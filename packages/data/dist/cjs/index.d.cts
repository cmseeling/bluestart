import { z } from 'zod';

declare const DateRangeSchema: z.ZodObject<{
    start: z.ZodDate;
    end: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    start: Date;
    end: Date;
}, {
    start: Date;
    end: Date;
}>;
type DateRange = z.infer<typeof DateRangeSchema>;

declare const ScheduledCommandSchema: z.ZodObject<z.objectUtil.extendShape<{
    outdoorTemp: z.ZodNumber;
    tempAboveBelow: z.ZodEnum<["above", "below"]>;
    tempUnits: z.ZodEnum<["F", "C"]>;
    location: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>>;
    hvacTemp: z.ZodNumber;
    defrost: z.ZodBoolean;
    heatedFeatures: z.ZodBoolean;
}, {
    activationTime: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    outdoorTemp: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
    hvacTemp: number;
    defrost: boolean;
    heatedFeatures: boolean;
    activationTime: string;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
}, {
    outdoorTemp: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
    hvacTemp: number;
    defrost: boolean;
    heatedFeatures: boolean;
    activationTime: string;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
}>;
type ScheduledCommand = z.infer<typeof ScheduledCommandSchema>;
declare const SchedledCommandWithIdSchema: z.ZodObject<z.objectUtil.extendShape<{
    outdoorTemp: z.ZodOptional<z.ZodNumber>;
    tempAboveBelow: z.ZodOptional<z.ZodEnum<["above", "below"]>>;
    tempUnits: z.ZodOptional<z.ZodEnum<["F", "C"]>>;
    location: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>>>;
    hvacTemp: z.ZodOptional<z.ZodNumber>;
    defrost: z.ZodOptional<z.ZodBoolean>;
    heatedFeatures: z.ZodOptional<z.ZodBoolean>;
    activationTime: z.ZodOptional<z.ZodString>;
}, {
    id: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: string;
    outdoorTemp?: number | undefined;
    tempAboveBelow?: "above" | "below" | undefined;
    tempUnits?: "F" | "C" | undefined;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
    hvacTemp?: number | undefined;
    defrost?: boolean | undefined;
    heatedFeatures?: boolean | undefined;
    activationTime?: string | undefined;
}, {
    id: string;
    outdoorTemp?: number | undefined;
    tempAboveBelow?: "above" | "below" | undefined;
    tempUnits?: "F" | "C" | undefined;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
    hvacTemp?: number | undefined;
    defrost?: boolean | undefined;
    heatedFeatures?: boolean | undefined;
    activationTime?: string | undefined;
}>;
type ScheduledCommandWithId = z.infer<typeof SchedledCommandWithIdSchema>;

declare const StartClimateCommandSchema: z.ZodObject<{
    outdoorTemp: z.ZodNumber;
    tempAboveBelow: z.ZodEnum<["above", "below"]>;
    tempUnits: z.ZodEnum<["F", "C"]>;
    location: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
    }, {
        latitude: number;
        longitude: number;
    }>>;
    hvacTemp: z.ZodNumber;
    defrost: z.ZodBoolean;
    heatedFeatures: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    outdoorTemp: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
    hvacTemp: number;
    defrost: boolean;
    heatedFeatures: boolean;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
}, {
    outdoorTemp: number;
    tempAboveBelow: "above" | "below";
    tempUnits: "F" | "C";
    hvacTemp: number;
    defrost: boolean;
    heatedFeatures: boolean;
    location?: {
        latitude: number;
        longitude: number;
    } | undefined;
}>;
type StartClimateCommand = z.infer<typeof StartClimateCommandSchema>;

export { DateRangeSchema, SchedledCommandWithIdSchema, ScheduledCommandSchema, StartClimateCommandSchema };
export type { DateRange, ScheduledCommand, ScheduledCommandWithId, StartClimateCommand };
