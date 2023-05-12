import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useState, useEffect } from 'react';


export default function Home({ featuredProduct, newProducts }) {
  function MyMobileComponent() {
    return <h1 className="flex justify-center items-center min-h-screen min-w-screen bg-bgPrimary text-black " >Sorry this website can only be accessed by Desktop</h1>
  }
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, []);

  if (!isDesktop) return <MyMobileComponent />
  return (
    <>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </>
  )
}

export async function getServerSideProps() {
  const featuredProductId = '645cd08094bda36bef3ee40d';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}