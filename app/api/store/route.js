import Store from '../../models/Store';
import { mongooseConnect } from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await mongooseConnect();
    const store = await Store.findOne();
    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { message: 'Failed to fetch store' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await mongooseConnect();
    const {
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    } = await request.json();
    const newStore = new Store({
      name,
      description,
      currency,
      address,
      admins,
      ig,
      fb,
      yt,
      customLink,
    });
    await newStore.save();

    return NextResponse.json({ message: 'Store created successfully' });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json(
      { message: 'Failed to create store' },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    await mongooseConnect();
    const { _id, ...updatedFields } = await request.json();

    const store = await Store.findById(_id);

    if (!store) {
      return NextResponse.json({ message: 'Store not found' }, { status: 404 });
    }

    // Update the store if any fields have changed
    if (Object.keys(updatedFields).length > 0) {
      await Store.updateOne({ _id: _id }, updatedFields);
      return NextResponse.json({ message: 'Store edited successfully' });
    } else {
      return NextResponse.json({ message: 'No changes detected' });
    }
  } catch (error) {
    console.error('Error editing store:', error);
    return NextResponse.json(
      { message: 'Failed to edit store' },
      { status: 500 }
    );
  }
}
