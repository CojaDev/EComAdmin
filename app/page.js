import DashCards from './components/DashCards';
import Layout from './components/Layout';
import Topbar from './components/Topbar';

export default function Home() {
  return (
    <Layout>
      <div className=" w-full h-screen flex flex-col items-center">
        <Topbar />
        <DashCards />
      </div>
    </Layout>
  );
}
