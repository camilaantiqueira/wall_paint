import React from 'react';
import './App.css';
import WallForm from './modules/Wall/index';
import ServiceHandler from './services/servicesHandler';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walls_number: 4,
      walls: [],
      total_paint: null,
    };
  }

  componentDidMount() {
    let walls = [];

    for(let i = 1; i <= this.state.walls_number; i++) {
      let wall = {
        wall_index: i,
        height: 0,
        width: 0,
        windows: 0,
        doors: 0
    };

      walls.push(wall);
    } 

    this.state.walls = walls;
    this.setState({walls: walls});

  }

   stateHandler(wall_state)  {
    let walls = this.state.walls;
    let wall_found = false;

    walls.map((wall) => {
      if(wall.wall_index === wall_state.wall_index) {
        wall_found = true;
        wall.width = wall_state.width;
        wall.height = wall_state.height;
        wall.windows = wall_state.windows;
        wall.doors = wall_state.doors;
      }
    });

  this.setState({walls: walls});
  }

  async handleSubmit() {
    let response = await ServiceHandler.calculateWallPaint(this.state.walls);
    this.setState({total_paint: response.data});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="title">Cálculo de tinta</div>
          {this.state.total_paint && this.state.total_paint.cans &&
            <div className="totalWallPaint">
              Quantidade de tinta necessária: {this.state.total_paint.paint_volume} L, utilizar {this.state.total_paint.cans} latas de {this.state.total_paint.paint_can} litros
            </div>
          }
          {this.state.total_paint &&  this.state.total_paint.cans && this.state.total_paint.additional_paint != 0 && 
            <div className="morePaint">
              e 1 lata de {this.state.total_paint.additional_paint} litros
            </div>
          }
          {this.state.total_paint && !this.state.total_paint.cans &&
            <div className="totalWallPaintWarning">
              {this.state.total_paint}, tente novamente. 
            </div>
          }
          {this.state.walls!= null && this.state.walls.map((wall) => {
            return <WallForm wall_number={wall.wall_index} key={wall.wall_index} onChange={this.stateHandler.bind(this)}/>
          })
          }
          <button onClick={this.handleSubmit.bind(this)} className="buttonInput">Calcular</button>
        </header>
      </div>
    )
  }
}

export default App;
