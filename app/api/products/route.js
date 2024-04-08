import Product from '../../models/Product';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

const updateIndexes = async () => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    for (let i = 0; i < products.length; i++) {
      products[i].index = i;
      await products[i].save();
    }
    console.log('Indexes updated successfully');
  } catch (error) {
    console.error('Error updating indexes:', error);
  }
};

// Call the function to update indexes
updateIndexes();

export async function GET(req) {
  try {
    await mongooseConnect();
    const products = await Product.find();
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
  const products = await Product.find();
  try {
    const {
      name,
      description,
      category,
      price,
      expenses,
      images,
      colors,
      sizes,
    } = await request.json();
    const newProduct = new Product({
      name,
      description,
      price,
      expenses,
      category,
      images,
      colors,
      sizes,
      index: products.length,
    });
    await newProduct.save();

    return NextResponse.json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Failed to create product' },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    await mongooseConnect();
    const formData = await request.formData();

    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const expenses = formData.get('expenses');
    const category = formData.get('category');
    const colors = formData.getAll('colors');
    const colorsArray = colors.flatMap((colorString) => colorString.split(','));
    const sizes = formData.getAll('sizes');
    const sizesArray = sizes.flatMap((sizesString) => sizesString.split(','));
    const _id = formData.get('_id');

    const images = formData.getAll('images');

    const imagesArray = images.flatMap((imageString) => imageString.split(','));

    await Product.updateOne(
      { _id: _id },
      {
        name,
        description,
        price,
        expenses,
        category,
        sizes: sizesArray,
        colors: colorsArray,
        images: imagesArray,
      }
    );
    await updateIndexes();
    return NextResponse.json({ message: 'Product Edited successfully' });
  } catch (error) {
    console.error('Error Editing product:', error);
    return NextResponse.json(
      { message: 'Failed to edit product' },
      { status: 500 }
    );
  }
}
