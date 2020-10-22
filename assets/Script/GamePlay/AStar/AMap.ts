import { ANode } from "./ANode";

    export class AMap {
        /**@description 开始路径 */
        private _star_node:ANode;    
        /**@description 结束路径 */
        private _end_node:ANode;      
        /**@description 格子数组 */
        public _nodes:Array<any> = [];  
        /**@description 地图的列数 */
        private _colum:number = 20;   
        /**@description 地图的行数 */
        private _row:number = 20;
        /**@description 格子的宽 */
        private _width: number = 120;
        /**@description 格子的高 */
        private _height: number = 120;
        /**@description 寻路超时时间  单位毫秒*/
        public time_out = 5000;

        public constructor(_colum:number, _row:number) {
            this._colum = _colum;
            this._row = _row;
            this._nodes = [];
            let count = 0;
            for(let i:number=0;i<_colum;i++){
                this._nodes[i] = [];
                for(let j:number = 0; j < _row;j++){
                    const node = new ANode(i,j);
                    node.walkable = true;
                    this._nodes[i][j] = node;
                    count ++;
                }
            }
        }

        public get_node(x:number , y:number):ANode{
            return this._nodes[x][y];
        }

        public clear_end_node(): void{
            this._end_node = null;
        }

        public set_end_node(x:number, y:number){
            this._end_node = this._nodes[x][y];
        }

        public set_start_node(x:number, y:number){
            this._star_node = this._nodes[x][y];
        }

        public set_walk_able(x:number, y:number, value:boolean){
            this._nodes[x][y].walkable = value;
        }

        public set_cost(x:number, y:number, value:number){
            this._nodes[x][y].cost_multiplier = value;
        }

        public get end_node(){
            return this._end_node;
        }

        public get column(){
            return this._colum;
        }

        public get row(){
            return this._row;
        }

        public get start_node(){
            return this._star_node;
        }

        public set height(_height: number){
            this._height = _height;
        }

        public get height(): number{
            return this._height;
        }

        public set width(_width: number){
            this._width = _width;
        }

        public get width(): number{
            return this._width;
        }


     
    }