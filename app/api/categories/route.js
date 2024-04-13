import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';
import Category from '../../models/Category';
import Product from '../../models/Product';
const updateIndexes = async () => {
  try {
    const products = await Category.find().sort({ _id: 1 });
    for (let i = 0; i < products.length; i++) {
      products[i].index = i;
      await products[i].save();
    }
  } catch (error) {
    console.error('Error updating indexes:', error);
  }
};

export async function GET(req) {
  try {
    await mongooseConnect();
    await updateIndexes();
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
    const updatedCategory = await Category.findByIdAndUpdate(_id, {
      name,
      images,
    });

    if (!updatedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    // Find products with the old category name
    const productsToUpdate = await Product.find({
      category: updatedCategory.name,
    });

    // Update category for products
    await Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = name; // Update to the new category name
        await product.save();
      })
    );

    return NextResponse.json({ message: 'Category Edited successfully' });
  } catch (error) {
    console.error('Error Editing category:', error);
    return NextResponse.json(
      { message: 'Failed to edit category' },
      { status: 500 }
    );
  }
}
