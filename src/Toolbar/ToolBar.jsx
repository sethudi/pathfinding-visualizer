
import React, { Component } from "react";
import "./ToolBar.css";

class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state={

        };
    }

 

  render() {
    const {visualizeDijkstra, visualizeDepth, visualizeBreath} = this.props;

    return (
      <div id="toolbar">
            <button onClick={() => visualizeDijkstra()}>
                 Dijkstra's Algorithm
            </button>
            <button onClick={() => visualizeDepth()}>
                 Depth-first Search
            </button>
            <button onClick={() => visualizeBreath()}>
                 Breath-first Search
            </button>
           {/* <button onClick={() => visualizeAstar()}>
                 A* Search
            </button>
            <button onClick={() => visualizeGreedy_Best_first()}>
                 Greedy Best-first Search
            </button>
            */}
      </div>
    )
  }
}

export default Toolbar;