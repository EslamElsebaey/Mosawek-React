import React from 'react'
import {Link} from "react-router-dom"

function Breadcrumb(props) {
  return (
  <section className="breadcrumb-sec breadcrumb-container">
    <div className="container">
        <ol className="breadcrumb">
        <li className="item-home">
          <Link className="bread-link bread-home" to="/home">الرئيسية </Link>
        </li>
        <li className="active">
          <span className="bread-current">{props.title}</span>
        </li>
        </ol>
    </div>
    </section>
  )
}

export default Breadcrumb
