import { createRouter, TRPCResponse } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { httpErrors } from '@trpc/server';
import { z } from 'zod';
import { prisma } from './prisma';

export const router = createRouter()
  .query('getPosts', {
    resolve: async () => {
      return await prisma.post.findMany();
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      content: z.string().optional(),
    }),
    resolve: async ({ input }) => {
      const post = await prisma.post.create({
        data: {
          title: input.title,
          content: input.content || '',
        },
      });
      return post;
    },
  });

export type AppRouter = typeof router;

export async function handle(req: NextApiRequest, res: NextApiResponse<any>) {
  const result = await router.route(req, res);
  if (result.type === 'data') {
    res.json(result);
  } else {
    const error = result;
    const status = error.shape?.status || 500;
    res.status(status);
    if (process.env.NODE_ENV === 'production') {
      res.json({ error: httpErrors[status] });
    } else {
      res.json(error);
    }
  }
}