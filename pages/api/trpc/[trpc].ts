import { createRouter } from '@trpc/server';
import { TRPCResponse } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '../../utils/prisma';

const router = createRouter()
  .query('getHello', {
    resolve: () => 'hello world',
  });

export default createNextApiHandler({
  router,
  createContext: createContext,
  onError({ error }) {
    console.error(error);
  },
  onNoMatch(req, res) {
    res.status(404).json({
      error: {
        message: `No \`${req.method}\`-route matched \`${req.url}\``,
        code: 'TRPC_ERROR_ROUTE_NOT_FOUND',
      },
    });
  },
  onResponse({ res, response }) {
    if (response.status === 200) {
      res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }
  },
});