import Layout from '../components/Layout';
import Topbar from '../components/Topbar';
import Settings from '../components/Settings';
export default function Home() {
  return (
    <Layout>
      <div className="w-full h-screen flex flex-col">
        <Topbar title={'Settings'} />
        <Settings />
      </div>
    </Layout>
  );
}
