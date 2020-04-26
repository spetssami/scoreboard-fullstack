import React from 'react';
import './App.css'

class App extends React.Component {
  constructor(){
    super();
    this.state = { 
      scores: [],
      value: "",
      isSortedHigh: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.arrangeScores = this.arrangeScores.bind(this)
  }

  async submitScore(name, score){
  const res = await fetch("http://localhost:8080/api/newScore", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, score})
    })
    if(res.ok){
      const data = await res.json()
      this.setState({scores: data})
      console.log(data);
    }else{
      console.log("Failed to add data")
    }

  }

  componentDidMount() {
    fetch("http://localhost:8080/api/data")
    .then(res => res.json())
    .then(data => this.setState({ scores: data }))
  }

  arrangeScores() {
    let scores = this.state.scores;
    const arranged = (this.state.isSortedHigh ? scores.sort((a, b) => (b.score-a.score)) : scores.sort((a, b) => (a.score-b.score)))
    this.setState({isSortedHigh: !this.state.isSortedHigh})
    this.setState({scores: arranged});
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    const value = this.state.value
    const data = value.split(",")
    const name= data[0]
    const score = data[1]
    this.submitScore(name, score)
    event.preventDefault();
  }

  render() {
    const scores = this.state.scores
    return (
      <div className="App">
        <h1>Scoreboard</h1>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th><a href="#" class="sort-by" onClick={this.arrangeScores}>Score</a></th>
            </tr>
            </thead>
            <tbody id="scrollbar">
            {scores.map(score => (
              <tr>
                <td>{score.name}</td><td>{score.score}</td>
              </tr>
            ))}
            </tbody>
          </table>
        <div className="form-container">
          <form onSubmit={this.handleSubmit} >
            <p>Insert name and score separated with a comma</p>
            <input placeholder="E.g. Mike, 500" name="newScore" onChange={this.handleChange}/>
            <br />
            <button>Submit new score</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
