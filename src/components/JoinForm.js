import React from "react"
import { confirmGameCode } from "../utils/API"

export default class JoinForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gamecode: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    confirmGameCode(this.state.gamecode).then((valid) => {
      if (valid) {
        console.log("valid")
        this.props.validGameCode(this.state.gamecode)
      }
    })
  }

  render() {
    const { gamecode } = this.state

    return (
      <div>
        <label>Game Code</label>
        <input
          name="gamecode"
          value={gamecode}
          onChange={this.handleChange}
          type="text"
          placeholder="Gamecode"
        />
        <span className="join-message"></span>
        <button onClick={(e) => this.handleSubmit(e)} className="btn">
          Join Game!
        </button>
      </div>
    )
  }
}

// export default function JoinForm({ confirmGame }) {
//   const [gameCode, setGameCode] = React.useState("")

//   const handleChange = (code) => {
//     setGameCode(code)
//   }

//   return (
//     <div>
//       <label>Game Code</label>
//       <input
//         name =
//         value={gameCode}
//         onChange={(e) => handleChange(e.target.value)}
//         type="text"
//         placeholder="Gamecode"
//       />
//       <span className="join-message"></span>
//       <Link
//         className="btn"
//         to={{
//           pathname: "/join",
//           search: `?gamecode=${gameCode}`,
//         }}
//       >
//         Join!
//       </Link>
//     </div>
//   )
// }
