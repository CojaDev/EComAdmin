import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import tinycolor from 'tinycolor2';
import { toast } from 'react-hot-toast';
const EditProductsForm = ({
  name,
  description,
  price,
  expenses,
  category,
  images,
  sizes,
  colors,
  _id,
}) => {
  const [productName, setProductName] = useState(name);
  const [productDescription, setProductDescription] = useState(description);
  const [productPrice, setProductPrice] = useState(price.toString());
  const [Expenses, setExpenses] = useState(expenses.toString());
  const [Categories, setCategories] = useState([{ name: 'No Category' }]);
  const [Images, setImages] = useState(images);
  const sizeInput = useRef();
  const colorInput = useRef();
  const [Colors, setColors] = useState(colors);
  const [Sizes, setSizes] = useState(sizes);
  useEffect(() => {
    axios
      .get('/api/categories')
      .then((response) => {
        if (response.data.length > 0) {
          const categoriesWithNoCategory = [
            { name: 'No Category' },
            ...response.data,
          ];

          const filteredCategories = categoriesWithNoCategory.filter(
            (cat) => cat.name !== category
          );

          setCategories([{ name: category }, ...filteredCategories]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('category', e.target[3].value.toString());
    formData.append('sizes', Sizes);
    formData.append('colors', Colors);
    formData.append('price', productPrice);
    formData.append('expenses', Expenses);
    formData.append('_id', _id);

    formData.append('images', Images);

    try {
      await axios.put('/api/products', formData);
      toast.success('Product Edited!');
      setTimeout(() => {
        window.location.href = '/products';
      }, 1500);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  const handleImageUpload = (result) => {
    if (Images[0] === '') {
      setImages([]);
    }
    setImages((prevImages) => [...prevImages, `${result.info.secure_url}`]);
  };
  const handleDeleteImage = (deletedImage) => {
    setImages((prevImages) => prevImages.filter((img) => img !== deletedImage));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete('/api/products/' + _id);
      toast.success('Product Deleted!');
      setTimeout(() => {
        window.location.href = '/products';
      }, 1500);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  const ManageSizes = (e) => {
    e.preventDefault();
    const size = sizeInput.current.value;
    if (size === '') return;
    setSizes((prevSizes) => [...prevSizes, size]);
    sizeInput.current.value = '';
  };
  const DeleteSizes = (deletedSize) => {
    setSizes((prevSizes) => prevSizes.filter((size) => size !== deletedSize));
  };
  const filteredSizes = () => {
    return Sizes.filter((color) => color !== '');
  };
  const ManageColors = (e) => {
    e.preventDefault();
    const color = colorInput.current.value;
    if (color === '') return;
    setColors((prevColors) => [...prevColors, color]);
    colorInput.current.value = '';
  };
  const DeleteColors = (deletedColor) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color !== deletedColor)
    );
  };
  const filteredColors = () => {
    return Colors.filter((color) => color !== '');
  };
  // Function to convert color name to RGBA with specified opacity
  const getColorWithOpacity = (colorName, opacity) => {
    const color = tinycolor(colorName);
    return color.setAlpha(opacity).toRgbString();
  };
  return (
    <form
      className="flex flex-col w-full sm:p-6 p-2 md:w-2/3 sm:gap-2 gap-1 xl:w-1/4 sm:mx-0 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <p>Product Name</p>
        <input
          type="text"
          className="w-full inputs"
          placeholder={name}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <p>Images</p>
        <div className="flex gap-2">
          <CldUploadWidget uploadPreset="arytrzdd" onUpload={handleImageUpload}>
            {({ open }) => {
              return (
                <button
                  className="flex flex-col gap-2 w-24 min-w-24 min-h-24 h-24 border cursor-pointer items-center justify-center border-black hover:bg-black/5 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                    />
                  </svg>
                  Upload
                </button>
              );
            }}
          </CldUploadWidget>

          {Images.map(
            (image, index) =>
              image !== '' && (
                <div key={index} className="relative">
                  <CldImage
                    width="96"
                    height="96"
                    src={image}
                    sizes="100vw"
                    alt={'img' + index}
                    key={index}
                    draggable={false}
                    className="w-24 h-24 min-w-24 min-h-24 object-cover z-20"
                  />
                  <div
                    className="flex items-center justify-center absolute w-6 h-6 bg-red-500 top-0 right-0 cursor-pointer z-0 hover:bg-red-600 transition-all"
                    onClick={() => handleDeleteImage(image)}
                  >
                    <p className="font-semibold text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-[1.125rem] h-[1.125rem]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p>Description</p>
        <textarea
          className="w-full inputs max-h-[10rem] min-h-[4rem]"
          placeholder={description}
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p>Category</p>
        <select className="w-full inputs " placeholder="Description">
          {Categories?.map((category, index) => (
            <option key={index}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col flex-1 gap-1">
          <p>Colors</p>
          <div className="flex">
            <input
              ref={colorInput}
              type="text"
              className="w-full inputs"
              placeholder="Colors"
            />
            <button
              className="px-2 py-1 bg-black/90 transition-colors hover:bg-black/80 text-white"
              onClick={ManageColors}
            >
              Add
            </button>
          </div>
          <div className="tags flex gap-2 flex-wrap">
            {Colors.length === 0
              ? ''
              : filteredColors().map((color, index) => (
                  <p
                    key={index}
                    className={`py-2 px-3 border min-w-[2.5rem] text-center hover:bg-black ${
                      color !== 'white' &&
                      color !== 'White' &&
                      'hover:text-white'
                    }  cursor-pointer border-black/80 transition-colors capitalize font-medium`}
                    style={{ backgroundColor: getColorWithOpacity(color, 0.6) }}
                    onClick={() => DeleteColors(color)}
                  >
                    {color}
                  </p>
                ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <p>Sizes</p>
          <div className="flex">
            <input
              ref={sizeInput}
              type="text"
              className="w-full inputs"
              placeholder="Sizes"
            />
            <button
              className="px-2 py-1 bg-black/90 transition-colors hover:bg-black/80 text-white"
              onClick={ManageSizes}
            >
              Add
            </button>
          </div>
          <div className="tags flex gap-2 flex-wrap">
            {Sizes.length === 0
              ? null
              : filteredSizes().map((size, index) => (
                  <p
                    key={index}
                    className="py-1 px-2 border min-w-[2.5rem] text-center hover:bg-black hover:text-white cursor-pointer border-black/80 transition-colors"
                    onClick={() => DeleteSizes(size)}
                  >
                    {size}
                  </p>
                ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <p>Price</p>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-full inputs"
              placeholder={price}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Expenses</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={Expenses}
              className="w-full inputs"
              onChange={(e) => setExpenses(e.target.value)}
              placeholder={expenses}
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <button
          type="submit"
          className="cursor-pointer text-center bg-black text-white mt-1.5 select-none hover:opacity-80 transition-all active:opacity-60  py-2.5 px-3 w-full"
        >
          Save
        </button>
        <p
          className="cursor-pointer text-center flex gap-1 bg-red-500 text-white mt-1.5 select-none hover:opacity-80 transition-all active:opacity-60  py-2.5 px-2.5  "
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </p>
      </div>
    </form>
  );
};

export default EditProductsForm;
