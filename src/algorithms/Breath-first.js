

export function Breath_first(grid, startNode, finishNode) {
    let visitedNodesInOrder = []
    if( !startNode || !finishNode || startNode === finishNode){
        return false;
    }
   
    let newlist =grid.slice();
    getvisitedNodess(visitedNodesInOrder, newlist,[startNode] , finishNode)
    for (const row of newlist) {
        for (const node of row) {
            node.isVisited =false
        }
      }
    return visitedNodesInOrder
}

function getvisitedNodess(visitedNodesInOrder, grid, stacklist, finishNode){
    let node =0;
    let count =1
    while (stacklist.length !==0 ){
        node =stacklist.shift()
        if (node === finishNode ){
            break;
        }
        console.log(count++);
        if (node.isVisited!==true){
            node.isVisited =true
            visitedNodesInOrder.push(node)
            helper(stacklist, grid, node)
        }
        
    }
    
}

function helper(stacklist,grid, node){
   
    const {col, row} = node;
    let newnode =0;

    if (row > 0 ) {
        newnode =grid[row - 1][col]
        if (newnode.isWall !== true && newnode.isVisited !== true){
            stacklist.push(newnode);
        }
    }
  
    if (col < grid[0].length - 1 ){
        newnode =grid[row][col +1]
        if (newnode.isWall!==true && newnode.isVisited!==true){
            stacklist.push(newnode)
        }
        
    } 
    if (row < grid.length - 1 ){
        newnode =grid[row + 1][col]
        if (newnode.isWall!==true && newnode.isVisited !==true){
            stacklist.push(newnode)
        }
    } 
    if (col > 0 ){
        newnode =grid[row][col - 1]
        if (newnode.isWall!==true && newnode.isVisited!==true){
            stacklist.push(newnode)
        }
    } 
    
}
