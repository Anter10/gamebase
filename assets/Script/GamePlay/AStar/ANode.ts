    export class ANode {
        public x:number;    //列
        public y:number;    //行
        public f:number;    //代价 f = g+h
        public g:number;    //起点到当前点代价
        public h:number;    //当前点到终点估计代价
        public walkable:boolean = true;
        public parent:ANode;
        public cost_multiplier:number = 1.0;
        public param : any= null;
    
        public constructor(x:number , y:number) {
            this.x = x;
            this.y = y;
        }

        public same(node: ANode){
            if(node.x == this.x && node.y == this.y){
                return true;
            }
            return false;
        }
    }
