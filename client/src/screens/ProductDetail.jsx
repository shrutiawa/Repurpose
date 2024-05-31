import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import algoliasearch from "algoliasearch";
import axios from "axios";
import "../styles/detail.css";
import Header from "./Header";

const searchClient = algoliasearch(
  "QA6IQ8USY1",
  "1adb3541ae8a17c255ee03e5c229726c"
);

function ProductDetail() {
  const { productId, variantId } = useParams();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [sku, setSku] = useState(null);

  const navigate = useNavigate();

  //   const sku = variant.sku

  useEffect(() => {
    const fetchProductAndVariant = async () => {
      try {
        const productResponse = await searchClient
          .initIndex("Repurpose")
          .getObject(productId);
        if (productResponse) {
          setProduct(productResponse);
          const selectedVariant = productResponse.variants.find(
            (v) => v.id === variantId
          );
          if (selectedVariant) {
            setVariant(selectedVariant);
            setSku(selectedVariant.sku);
          }
        }
      } catch (error) {
        console.error("Error fetching product and variant:", error);
      }
    };

    fetchProductAndVariant();
  }, [productId, variantId]);

  const addToCart = async () => {
    const customerId = localStorage.getItem("customer");

    if (!customerId) {
      alert("Customer not found . Please log in.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/carts", {
        customerId,
        productId,
        variantId,
      });
      console.log(response.data);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <Header />
      {product && variant ? (
        <div className="container">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img
                        src={variant.images[0]}
                        alt={variant.attributes.color}
                      />
                    </div>
                  </div>
                </div>
                <div className="details col-md-6">
                  <h1 className="product-title">{product.name["en-US"]}</h1>
                  <p>{product.productType}</p>
                  <p className="product-description">
                    {variant.attributes.Description}
                  </p>
                  <h4 className="price">COLOR: {variant.attributes.color}</h4>
                  <h4 className="price">
                    Current Price: <span>{(variant.prices.USD.min / 100).toFixed(2)}</span>
                  </h4>
                  <h4 className="sizes">Size: {variant.attributes.Size}</h4>
                  <div className="action">
                    <button
                      className="add-to-cart btn btn-default"
                      type="button"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
