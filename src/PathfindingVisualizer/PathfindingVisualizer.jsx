
import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra} from '../algorithms/dijkstra';
import {Depth_first} from '../algorithms/Depth-first';
import {Breath_first} from '../algorithms/Breath-first';
import {Astar} from '../algorithms/Astar';
import {Greedy_Best_first} from '../algorithms/Greedy_Best_first';
import ToolBar from '../Toolbar/ToolBar';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component{
    constructor(props){
        super(props);
        this.state ={
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount(){
        const grid =this.getInitialGrid();
        this.setState({grid})
    }

    handleMouseDown(row, col) {
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
      }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
      }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
      }

    animateDijkstra(visitedNodesInOrder) {
      for (let i=0; i< visitedNodesInOrder.length; i++){
        setTimeout(()=>{
          const node =visitedNodesInOrder[i];
          const newGrid = this.state.grid.slice();
          const newNode ={
              ...node,
              isVisited: true,
          };
          newGrid[node.row][node.col] =newNode;
          this.setState({grid:newGrid})
          }, 20 *i);
      }
    }

    animateDepth_first(visitedNodesInOrder) {
      for (let i=0; i< visitedNodesInOrder.length; i++){
        setTimeout(()=>{

          const node =visitedNodesInOrder[i];
          const newGrid = this.state.grid.slice();
          const newNode ={
              ...node,
              isVisited: true,
          };
          newGrid[node.row][node.col] =newNode;
          this.setState({grid:newGrid})
          }, 20 *i);
      }
    }
    animateBreath_first(visitedNodesInOrder) {
      for (let i=0; i< visitedNodesInOrder.length; i++){

        setTimeout(()=>{
          const node =visitedNodesInOrder[i];
          const newGrid = this.state.grid.slice();
          const newNode ={
              ...node,
              isVisited: true,
          };
          newGrid[node.row][node.col] =newNode;
          this.setState({grid:newGrid})
          }, 20 *i);
      }
    }

    animateBreath_Astar(visitedNodesInOrder) {
      for (let i=0; i< visitedNodesInOrder.length; i++){

        setTimeout(()=>{
          const node =visitedNodesInOrder[i];
          const newGrid = this.state.grid.slice();
          const newNode ={
              ...node,
              isVisited: true,
          };
          newGrid[node.row][node.col] =newNode;
          this.setState({grid:newGrid})
          }, 20 *i);
      }
    }

    animate_Greedy(visitedNodesInOrder) {
      for (let i=0; i< visitedNodesInOrder.length; i++){

        setTimeout(()=>{
          const node =visitedNodesInOrder[i];
          const newGrid = this.state.grid.slice();
          const newNode ={
              ...node,
              isVisited: true,
          };
          newGrid[node.row][node.col] =newNode;
          this.setState({grid:newGrid})
          }, 20 *i);
      }
    }

    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        this.animateDijkstra(visitedNodesInOrder);
        
    }
    visualizeDepth() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Depth_first(grid, startNode, finishNode);
        this.animateDepth_first(visitedNodesInOrder);
        
    }
    visualizeBreath() {
      const {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = Breath_first(grid, startNode, finishNode);
      this.animateBreath_first(visitedNodesInOrder);
      
    }
    visualizeAstar() {
      let {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = Astar(grid, startNode, finishNode);
      this.animateBreath_Astar(visitedNodesInOrder);
    }
    visualizeGreedy_Best_first() {
      const {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodesInOrder = Greedy_Best_first(grid, startNode, finishNode);
      this.animate_Greedy(visitedNodesInOrder);
    }
    

    render(){
        const {grid, mouseIsPressed} =this.state;
        return (
            <>
            
            <ToolBar
            visualizeDijkstra ={() => this.visualizeDijkstra()}
            visualizeDepth ={() => this.visualizeDepth()}
            visualizeBreath ={() => this.visualizeBreath()}
            visualizeAstar ={() => this.visualizeAstar()}
            visualizeGreedy_Best_first ={() => this.visualizeGreedy_Best_first()}
            ></ToolBar>
            <h3>Click on the grid to add a wall.</h3>
            <h4>Walls are impenetrable, meaning that a path cannot cross through them</h4>
            <div className="grid">
                {grid.map((row,rowIdx)=>{
                    return (
                        <div key={rowIdx}>
                            {row.map((node,nodeIdx)=>{
                                const {row, col, isFinish, isStart, isWall,isVisited} = node;
                                
                                return(
                                    <Node 
                                        key={nodeIdx}
                                        col={col}
                                        isVisited={isVisited}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) =>
                                        this.handleMouseEnter(row, col)
                                        }
                                        onMouseUp={() => this.handleMouseUp()}
                                        row={row}>
                                    </Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );
        
    }

    getInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
          const currentRow = [];
          for (let col = 0; col < 50; col++) {
            currentRow.push(this.createNode(col, row));
          }
          grid.push(currentRow);
        }
        return grid;
      };

    createNode = (col, row) => {
        return {
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null,
        };
      };
      
    getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
          ...node,
          isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
      };
}


