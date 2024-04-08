import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';
import Category from '../../models/Category';
import Product from '../../models/Product';

export async function GET(req) {
  try {
    await mongooseConnect();
    const products = await Category.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  await mongooseConnect();
  const categories = await Category.find();
  try {
    const { name, images } = await request.json();
    const newCategory = new Category({
      name,
      images,
      index: categories.length,
    });
    await newCategory.save();

    return NextResponse.json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating Category:', error);
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  await mongooseConnect();
  try {
    const { name, images, _id } = await request.json();

    // Update the category
    await Category.updateOne({ _id: _id }, { name, images });

    // Update products with the new category name
    await Product.updateMany({ category: name }, { category: name });

    return NextResponse.json({ message: 'Category Edited successfully' });
  } catch (error) {
    console.error('Error Editing category:', error);
    return NextResponse.json(
      { message: 'Failed to edit category' },
      { status: 500 }
    );
  }
}
