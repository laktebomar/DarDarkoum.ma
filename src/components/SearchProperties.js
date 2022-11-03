import React from 'react'

const SearchProperties = () => {
  return (
    <section className="search-sec justify-content-center align-items-center">
    <div className="container">
        <form action="#" method="post" noValidate="novalidate">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-12 p-1">
                            <input type="text" className="form-control search-slt" placeholder="Enter a city"/>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 p-1">
                            <input type="text" className="form-control search-slt" placeholder="Enter price"/>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 p-1">
                            <input type="text" className="form-control search-slt" placeholder="Enter Search"/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-1">
                            <select className="form-control search-slt">
                                <option>Choose type</option>
                                <option>
                                  <p>location</p>
                                </option>
                                <option>
                                    <p>vente</p>
                                </option>
                                <option>
                                    <p>dddd</p>
                                </option>
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-1">
                            <button type="button" className="btn btn-danger wrn-btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
  )
}

export default SearchProperties