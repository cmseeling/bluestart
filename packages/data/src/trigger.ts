import { z } from 'zod';

export const TriggerSchema = z.object({
  time: z.string().time(),
  timeOffset: z.number(),
  tempThreshold: z.number(),
  tempAboveBelow: z.enum(['above', 'below']),
  tempUnits: z.enum(['F', 'C'])
});

export type Trigger = z.infer<typeof TriggerSchema>;

export const OptionalTriggerSchema = TriggerSchema.partial();
export type OptionalTrigger = z.infer<typeof OptionalTriggerSchema>;
