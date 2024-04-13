import Orders from '../../../models/Orders';
import { mongooseConnect } from '../../../../lib/mongoose';
import { NextResponse } from 'next/server';

export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();

    const order = await Orders.findById(params.id);

    if (!order) {
      return new NextResponse(JSON.stringify({ message: 'Order not found' }), {
        status: 404,
      });
    }

    await Orders.findByIdAndDelete(order._id);

    return new NextResponse(JSON.stringify({ message: 'Order deleted' }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse('Internal error', { status: 500 });
  }
};
