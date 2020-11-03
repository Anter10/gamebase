import { AMap } from "./AMap";
import { ANode } from "./ANode";

    export class AStar
    {
        private _open:Array<any>;               //待考察表
        private _closed:Array<any>;             //已考察表
        private _grid: AMap;               //网格
        private _endNode:ANode;                  //终点Node
        private _startNode:ANode;                //起点Node
        private _path:Array<any>;               //保存路径
        private _heuristic:Function;            //寻路算法
        private _straightCost:number = 1.0;     //上下左右走的代价
        private _diagCost:number = Math.SQRT2;// 2019-11-7修改 Math.SQRT2;  //斜着走的代价 
        
        
        public constructor()
        {    
            //this._heuristic = this.manhattan;  
            // this._heuristic = this.euclidian;
            this._heuristic = this.euclidian;
        }
        
        //寻路
        public find(grid:AMap):boolean
        {
            this._grid = grid;
            this._open = [];
            this._closed = [];
            
            this._startNode = this._grid.start_node;
            this._endNode = this._grid.end_node;
            
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
            
            return this.find_path();
        }
        
        /**@description 开始寻路 */
        public find_path():boolean
        {
            var node:ANode = this._startNode;
            const start_time = (new Date()).getTime();
            while(node != this._endNode)
            {
                var startX = Math.max(0, node.x - 1);
                var endX = Math.min(this._grid.column - 1, node.x + 1);
                var startY = Math.max(0, node.y - 1);
                var endY = Math.min(this._grid.row - 1, node.y + 1);
                
                for(var i = startX; i <= endX; i++)
                {
                    for(var j = startY; j <= endY; j++)
                    {    
                        //不让斜着走
                        if(i != node.x && j != node.y){
                            continue;
                        }

                        var test:ANode = this._grid.get_node(i, j);
                        if(test == node || 
                            !test.walkable ||
                            !this._grid.get_node(node.x, test.y).walkable ||
                            !this._grid.get_node(test.x, node.y).walkable)
                        {
                            continue;
                        }
                        
                        var cost:number = test.cost_multiplier;// 2019-11-7修改 this._straightCost;
                        // if(!((node.x == test.x) || (node.y == test.y)))
                        // {
                        //     cost = this._diagCost;
                        // }
                        var g = node.g + cost * test.cost_multiplier;
                        var h = this._heuristic(test);
                        var f = g + h;
                        if(this.isOpen(test) || this.isClosed(test))
                        {
                            if(test.f > f)
                            {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else
                        {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this._open.push(test);
                        }
                    }
                }
                for(var o = 0; o < this._open.length; o++)
                {
                }
                this._closed.push(node);
                if(this._open.length == 0)
                {
                    console.log("AStar >> no path found");
                    return false
                }
                
                let open_length = this._open.length;
                for(let m = 0; m < open_length; m ++){
                    for(let n = m +  1;n < open_length; n++){
                        if(this._open[m].f > this._open[n].f){
                            let temp = this._open[m];
                            this._open[m] = this._open[n];
                            this._open[n] = temp;
                        }
                    }
                }
                
                node = this._open.shift() as ANode;
               
                const time = (new Date()).getTime() - start_time;
              
                if(time > this._grid.time_out){
                    return false;
                }
            }
            
            const time = (new Date()).getTime() - start_time;
            // console.log('当前寻找花费的时间 = ', time);
            this.build_path();
            return true;
        }
        
        //获取路径
        private build_path():void
        {
            this._path = new Array();
            var node:ANode = this._endNode;
            this._path.push(node);
            while(node != this._startNode)
            {
                node = node.parent;
                this._path.unshift(node);
            }
        }
        
        public get path()
        {
            return this._path;
        }
        
        //是否待检查
        private isOpen(node:ANode):boolean
        {
            for(var i = 0; i < this._open.length; i++)
            {
                if(this._open[i] == node)
                {
                    return true;
                }
            }
            return false;
        }
        
        //是否已检查
        private isClosed(node:ANode):boolean
        {
            for(var i = 0; i < this._closed.length; i++)
            {
                if(this._closed[i] == node)
                {
                    return true;
                }
            }
            return false;
        }
        
        //曼哈顿算法
        private manhattan(node:ANode)
        {
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        }
        

        private euclidian(node:ANode)
        {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
            // return Math.sqrt(dx * dx + dy * dy) * node.cost_multiplier;

        }
        
        private diagonal(node:ANode)
        {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag) + this._straightCost; // 2019-11-7 号添加(+ node.cost_multiplier)
        }
        
        public get visited()
        {
            return this._closed.concat(this._open);
        }

        static Test(){
            const grid = new AMap(20, 20);
            grid.set_walk_able(1,1,false);
            grid.set_walk_able(5,5,false);
            grid.set_walk_able(7,5,false);
            grid.set_walk_able(18,16,false);
            grid.set_walk_able(16,16,false);
            grid.set_walk_able(16,15,false);
            grid.set_walk_able(16,14,false);
            grid.set_walk_able(16,13,false);
            grid.set_start_node(3,3);
            grid.set_end_node(3, 6);
            const star = new AStar();
            const all_path = star.find(grid);
            console.log("当前的路径 = ",star._path);
        }

    }
