export function Greedy_Best_first(grid, startNode, finishNode) {
    let visitedNodesInOrder = []
    if( !startNode || !finishNode || startNode === finishNode){
        return false;
    }
    startNode.distance = 0;

    Greedy(startNode.row, startNode.col, finishNode.row, finishNode.col, grid,visitedNodesInOrder);
    return visitedNodesInOrder;
  }

		
function  Greedy(startRow, startCol, endRow, endCol, nodes,visitedNodesInOrder){
    initializeNodes(nodes);
	
	let startNode = nodes[startRow][startCol];
	let endNode = nodes[endRow][endCol];
	
	startNode.distance= 0;
	startNode.estimatedDistanceToEnd =calculateManhattanDistance(startNode, endNode);
	
	let nodesToVisit =[startNode];

	
	while (nodesToVisit.length !== 0){
        
        nodesToVisit.sort((A,B)=>A.estimatedDistanceToEnd-B.estimatedDistanceToEnd);
        let currentMinDistanceNode =nodesToVisit.shift();
        currentMinDistanceNode.isSeen =true
        
		visitedNodesInOrder.push(currentMinDistanceNode);

		if (currentMinDistanceNode === endNode){
            break;
        }
		
       
		let neighbors =getNeighboringNodes(currentMinDistanceNode, nodes);
		for (let neighbor of neighbors){
            if (neighbor.isWall ){
                continue;
            }
				
			neighbor.cameFrom =currentMinDistanceNode
			neighbor.estimatedDistanceToEnd =  calculateManhattanDistance(neighbor, endNode)
			
			nodesToVisit.push(neighbor);
        }

			
    }
		
	
}
    
	
function calculateManhattanDistance(currentNode, endNode){
    let currentRow =currentNode.row
	let currentCol =currentNode.col
	let endRow =endNode.row
	let endCol =endNode.col
	
	return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol)
}
	
	

function getNeighboringNodes(node, nodes){
    let neighbors =[];
	let numRows =nodes.length;
	let numCols =nodes[0].length;
	
	let row =node.row;
	let col =node.col;
	
	if (row < numRows -1 && nodes[row+1][col].isSeen !== true){
        neighbors.push(nodes[row+1][col]);
    }
		
	if (row > 0 && nodes[row -1][col].isSeen !== true){
        neighbors.push(nodes[row -1][col]);
    }
		
	if (col < numCols -1 && nodes[row][col + 1].isSeen !== true){
        neighbors.push(nodes[row][col + 1]);
    }
		
	if (col > 0 && nodes[row][col -1].isSeen !== true){
        neighbors.push(nodes[row][col -1]);
    }
		
	return neighbors;
}

		
function initializeNodes(graph){
	
	for (let i=0; i< graph.length; i++){
		for (let j=0; j< graph.length ;j++){
            graph.estimatedDistanceToEnd =Infinity
        }
            
    }
		
}
	



	
	