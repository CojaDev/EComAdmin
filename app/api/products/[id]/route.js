import Product from '../../../models/Product';
import { mongooseConnect } from '../../../../lib/mongoose';
import { NextResponse } from 'next/server';
export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();

    const product = await Product.findById(params.id);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: 'Product not found' }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    return new NextResponse(JSON.stringify({ message: 'Product deleted' }), {
      status: 200,
    });
  } catch (err) {
    console.log('[productId_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
