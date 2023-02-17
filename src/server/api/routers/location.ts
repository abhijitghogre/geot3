/* eslint-disable */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const locationRouter = createTRPCRouter({
  get: publicProcedure.input(z.object({
    id: z.string()
  })).query(({input, ctx }) => {
    return ctx.prisma.location.findUnique({
      where: {
        id: input.id
      }
    });
  }),
  save: publicProcedure
    .input(z.object({
      lat: z.string(),
      lng: z.string(),
      id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.location.upsert({
        where: {
          id: input.id
        },
        create: {
          lat: input.lat,
          lng: input.lng,
          id: input.id
        },
        update: {
          lat: input.lat,
          lng: input.lng
        }
      });
    })
});
