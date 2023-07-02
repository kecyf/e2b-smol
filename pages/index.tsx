import { GetServerSideProps } from 'next';
import { useMutation } from 'react-query';
import { trpc } from '../utils/trpc';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function Home() {
  const mutation = useMutation(async () => {
    const data = await trpc.fetchQuery('hello');
    return data;
  });

  return (
    <div className="container mx-auto px-4">
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 text-lg bg-gray-100 rounded-md">
            pages/index.tsx
          </code>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await trpc.fetchQuery('hello');
  return { props: { data } };
};