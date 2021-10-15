export function Astar(grid, startNode, finishNode) {
    let visitedNodesInOrder = []
    if( !startNode || !finishNode || startNode === finishNode){
        return false;
    }
    startNode.distance = 0;

    aStarAlgorithm(startNode.row, startNode.col, finishNode.row, finishNode.col, grid,visitedNodesInOrder);
    return visitedNodesInOrder;
  }

		
function aStarAlgorithm(startRow, startCol, endRow, endCol, nodes,visitedNodesInOrder){
    initializeNodes(nodes);
	
	let startNode = nodes[startRow][startCol];
	let endNode = nodes[endRow][endCol];
	
	startNode.distance= 0;
	startNode.estimatedDistanceToEnd =calculateManhattanDistance(startNode, endNode);
	
	let nodesToVisit =[startNode];

	
	while (nodesToVisit.length !== 0){
        
        nodesToVisit.sort((A,B)=>A.estimatedDistanceToEnd-B.estimatedDistanceToEnd);
        let currentMinDistanceNode =nodesToVisit.shift();
        
		visitedNodesInOrder.push(currentMinDistanceNode);

		if (currentMinDistanceNode === endNode){
            break;
        }
		
       
		let neighbors =getNeighboringNodes(currentMinDistanceNode, nodes);
		for (let neighbor of neighbors){
            if (neighbor.isWall ){
                continue;
            }
			
			let tenativeDistanceToNeighbor = currentMinDistanceNode.distance + 1
			
			if (tenativeDistanceToNeighbor >= neighbor.distance){
                continue;
            }
				
				
			neighbor.cameFrom =currentMinDistanceNode
			neighbor.distance = tenativeDistanceToNeighbor
			neighbor.estimatedDistanceToEnd = tenativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode)
			
			
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
    console.log(numCols);
	
	let row =node.row;
	let col =node.col;
	
	if (row < numRows -1){
        neighbors.push(nodes[row+1][col]);
    }
		
	if (row > 0){
        neighbors.push(nodes[row -1][col]);
    }
		
	if (col < numCols -1){
        neighbors.push(nodes[row][col + 1]);
    }
		
	if (col > 0){
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
	



	
	