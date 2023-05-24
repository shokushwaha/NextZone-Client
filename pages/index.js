import { CartContext } from '@/components/CartContext';
import Featured from '@/components/Featured'
import Header from '@/components/Header'
import NewProducts from '@/components/NewProducts';
import Navbar from '@/components/Navbar';
import PleaseLogin from '@/components/PleaseLogin';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { useState, useEffect, useContext } from 'react';

export default function Home({ featuredProduct, newProducts }) {
  const { loggedIn } = useContext(CartContext);
  return (
    <>
      {loggedIn ?
        <div div className='overflow-x-hidden'>
          <Navbar />
          {/* <Header /> */}
          <Featured product={featuredProduct} />
          <NewProducts products={newProducts} />

        </div>
        :
        <>
          <PleaseLogin />
        </>
      }
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