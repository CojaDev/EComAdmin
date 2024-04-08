import Category from '../../../models/Category';
import Product from '../../../models/Product';
import { mongooseConnect } from '../../../../lib/mongoose';
import { NextResponse } from 'next/server';

export const DELETE = async (req, { params }) => {
  try {
    await mongooseConnect();

    const category = await Category.findById(params.id);

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: 'Category not found' }),
        { status: 404 }
      );
    }

    // Find products with the category being deleted
    const productsToUpdate = await Product.find({ category: category.name });

    // Update category for products
    await Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = 'No Category';
        await product.save();
      })
    );

    // Delete the category
    await Category.findByIdAndDelete(category._id);

    return new NextResponse(JSON.stringify({ message: 'Category deleted' }), {
      status: 200,
    });
  } catch (err) {
    console.log('[categoryId_DELETE]', err);
    return new NextResponse('Internal error', { status: 500 });
  }
};
