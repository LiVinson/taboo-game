import React from "react"
import PropTypes from "prop-types"
import "./Wrapper.scss"

export default function Wrapper({ children }) {
    return (
        <div className="wrapper">
            {children}
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired
}