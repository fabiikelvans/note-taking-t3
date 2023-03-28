import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

export const noteRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), topicId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          topicId: input.topicId,
          content: input.content,
        }
      })
    }),

  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.prisma.note.findMany({
      where: {
        topicId: input.topicId,
      },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        }
      })
    })


})