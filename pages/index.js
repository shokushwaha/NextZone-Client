import Featured from '@/components/Featured'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';


export default function Home({ product }) {
  return (
    <>
      <Header />
      <Featured product={product} />
    </>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '645a19c80c7b341575ee4ec6';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}