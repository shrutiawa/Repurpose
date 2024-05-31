import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Pagination,
  RefinementList,
} from "react-instantsearch";
import "../styles/productList.css";
import { Link } from "react-router-dom";
import Header from "./Header";

const searchClient = algoliasearch(
  "QA6IQ8USY1",
  "1adb3541ae8a17c255ee03e5c229726c"
);

function Hit({ hit }) {
  // console.log(hit);
  return (<>
    
    <article className="search-panel_item">

      <div>
        {/* <h1>Name</h1> */}

        <div className="variants">
          {hit.variants.map((variant) => (
            <div key={variant.id}>
              <Link to={`/product/${hit.objectID}/${variant.id}`}>
                <img src={variant.images} alt={hit["name.en"]} />
              </Link>
              <h1>{hit.name["en-US"]}</h1>
              <p>
                Price: {(variant.prices.USD["min"]/100).toFixed(2)}
              </p>
              <p>Size: {variant.attributes.Size}</p>
              <p>Color: {variant.attributes.color}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
    </>
  );
}


function ProductList() {
  return (
    <div className="container">
      <Header/>
      <InstantSearch searchClient={searchClient} indexName="Repurpose" insights>
        <div className="search-panel">
          <div className="search-panel__filters">
            <h4>Filter Based on Choice</h4>
            
            <div>
              <p>Size</p>
              <RefinementList
                className="refinementlist-style count-button"
                attribute="variants.attributes.Size"
              />
            </div>
            
          </div>

          <div className="search-panel__results">
            <div className="search_box">
              <SearchBox className="searchbox" placeholder="Search" />
            </div>
            <div className="search-panel_items">
              <Hits hitComponent={Hit} />
            </div>

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
export default ProductList;
