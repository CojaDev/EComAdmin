import Topbar from '../../components/Topbar';
import NewProductsForm from '../../components/NewProductsForm';
import Layout from '../../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col">
        <Topbar title={'New Product'} />
        <NewProductsForm />
      </div>
    </Layout>
  );
}
