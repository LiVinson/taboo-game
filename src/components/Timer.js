import React from "react"

export default class Timer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            intervalId: null,
            seconds: 10
        }

        this.startTimer = this.startTimer.bind(this)        
        this.stopTimer = this.stopTimer.bind(this)
        this.decrementTime = this.decrementTime.bind(this)
        this.convertToMinutesAndSeconds = this.convertToMinutesAndSeconds.bind(this)
    }

    componentDidMount(){
        if (this.props.runTimer) {
            this.startTimer()
        }
    }

    componentDidUpdate(prevProps, prevState){
        //if changing from start/stop
        if (prevProps.runTimer !== this.props.runTimer) {
            if(this.props.runTimer) {
                this.startTimer()
            } else {
                this.stopTimer()
            }
        } 
    }

    componentWillUnmount(){
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId)
        }        
    }
  
    startTimer() {
        console.log("start timer")
        const id = setInterval(this.decrementTime, 1000)
        this.setState({
            intervalId: id
        })
    }

    stopTimer() {
        console.log("stop timer")
        clearInterval(this.state.intervalId)
    }

    decrementTime() {
        if (this.state.seconds > 0) {
            this.setState((state)=> ({
                seconds: (state.seconds) - 1
            }))
        } else {
            this.timeUp()
        }
    }

    timeUp(){
        console.log("time up")
        clearInterval(this.state.intervalId)
        this.props.endofTimer()
    }

    convertToMinutesAndSeconds(time){
        let stringSeconds = ""
        let stringMinutes = "0"
        
        if (time >= 60) {
            let minutes = Math.floor(time/60)            
            stringMinutes = minutes < 10 ? "0"+minutes : minutes.toString()
         
            let seconds = Math.floor(time%60)
            stringSeconds = seconds < 10 ? "0"+seconds : seconds.toString()
        } else {
            stringSeconds = time < 10 ? "0"+time : time.toString()
        }
        const convertedTime = `${stringMinutes}:${stringSeconds}`
        return convertedTime
    }

    render () {
        const {seconds}=this.state
        const convertedTime = this.convertToMinutesAndSeconds(seconds)
        return <div><span>Timer </span>{convertedTime} Remaining</div>
    }       
    
}

