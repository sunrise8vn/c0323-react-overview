import React, { useEffect, useState } from 'react';

import ProductService from '../../services/productService';

// import './ImageUpload.css';

import { IMAGE_SCALE } from '../../constants/global';

const cloudinaryServer = process.env.REACT_APP_CLOUDINARY_SERVER;

const ProductUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const products = await ProductService.getAlls();

    setProducts(products.data);

    console.log(products.data);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      //   setPreview(reader.result);
    };
  };

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('file', image);
    data.append('name', 'procuct_01');
    data.append('description', 'desc 01');

    // data.append('upload_preset', uploadPreset);
    // data.append('cloud_name', cloudName);
    // data.append('folder', folderName);

    try {
      const response = await fetch(`http://localhost:8081/api/products`, {
        method: 'POST',
        body: data,
      });
      const res = await response.json();

      let currentProducts = products;
      currentProducts.unshift(res);

      setProducts(currentProducts);
      setUrl(res.public_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className=" sm:px-8 md:px-16 sm:py-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Click on Upload a File</span>&nbsp;
            </p>
            <input
              id="hidden-input"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label htmlFor="hidden-input" className="cursor-pointer">
              <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                Upload a file
              </div>
            </label>

            <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
              {/* {preview && <img src={preview} alt="preview" className="w-full" />} */}
            </div>
          </header>
          <div className="flex justify-end pb-8 pt-6 gap-4">
            <button
              onClick={uploadImage}
              className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
              disabled={!image}
            >
              Upload now
            </button>
            <button
              // onClick={handleResetClick}
              className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
            >
              Reset
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <></>
          )}

          {/* {loading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
        <span>Processing...</span>
      </div>
    ) : (
      url && (
        <div className="pb-8 pt-4">
          <Image cloudName={cloudName} publicId={url} />
        </div>
      )
    )} */}
        </div>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {products.length &&
            products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4"
                >
                  <article className="overflow-hidden rounded-lg shadow-lg">
                    <a href="#">
                      <img
                        alt="Placeholder"
                        className="block h-auto w-full"
                        src={
                          cloudinaryServer +
                          '/' +
                          IMAGE_SCALE.SCALE_W454_H274_Q100 +
                          '/' +
                          item.fileFolder +
                          '/' +
                          item.fileName
                        }
                        style={{
                          maxWidth: '474px',
                          maxHeight: '274px',
                        }}
                      />
                    </a>

                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 className="text-lg">
                        <a
                          className="no-underline hover:underline text-black"
                          href="#"
                        >
                          {item.name}
                        </a>
                      </h1>
                      <p className="text-grey-darker text-sm">11/1/19</p>
                    </header>

                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                      <a
                        className="flex items-center no-underline hover:underline text-black"
                        href="#"
                      >
                        <img
                          alt="Placeholder"
                          className="block rounded-full"
                          src="https://picsum.photos/32/32/?random"
                        />
                        <p className="ml-2 text-sm">Author Name</p>
                      </a>
                      <a
                        className="no-underline text-grey-darker hover:text-red-dark"
                        href="#"
                      >
                        <span className="hidden">Like</span>
                        <i className="fa fa-heart"></i>
                      </a>
                    </footer>
                  </article>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProductUpload;
