/*
 * @Author: Maoyao Ye
 * @Date: 2020-04-12 10:39:19
 * @LastEditors: Maoyao Ye
 * @LastEditTime: 2020-04-20 20:49:30
 * @FilePath: \Courses\git-huangdu\Courses\100580-人工智能原理与技术\课程设计-八数码\solver.js
 * @Description: 
 */

const n = 9;
const maxStateNum = 362880;

function State(st, g) {
    this.st = Array.from(st);
    this.g = typeof (g) === 'number' ? g : 0;
}

function cmp(A, B) {
    return A.f > B.f;
}


const fact = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];

function solve(startState, endState, evaluate) {
    const INF = 0x3f3f3f3f;
    var vis = new Array(maxStateNum).fill(false);
    if (typeof startState != 'object' || typeof endState != 'object') {
        alert("Error!");
        return;
    }

    
    var endStateCode = encode(endState);

    //问题是否有解可以通过逆序对数判定，否则必须要遍历状态空间才能确定无解
    if ((getInversion(startState) ^ getInversion(endState)) & 1)
    {
        //console.log(getInversion(startState) + " " + getInversion(endState));
        alert("无解!");
        return;
    }
    this.evaluate = typeof evaluate === 'undefined' ? defualtEvaluate : evaluate;

    var open = new Heap(Array(), cmp);

    startState.g = 0;
    vis[encode(startState)] = true;
    startState.f = this.evaluate(startState,endState);
    open.push(startState);
    var isSolve = false;
    var cntt = 0;
    while (!open.empty() && !isSolve) {
        var u = open.top();
        open.pop();
        //console.log("g:"+u.g+" f:"+u.f);
        var codeU = encode(u);
        if (codeU == -1) {
            continue;
        }
        cntt++;
        const dir = [[1, 0, 3], [-1, 0, -3], [0, 1, 1], [0, -1, -1]];
        //找到空白块的位置
        var pos;
        for (var i = 0; i < n; i++) {
            if (u.st[i] === 0) {
                pos = i;
                break;
            }
        }
        //尝试向四个方向移动
        for (var i = 0; i < 4; i++) {
            x = Math.floor(pos / 3);
            y = pos - x * 3;
            if (x + dir[i][0] >= 0 && x + dir[i][0] < 3 &&
                y + dir[i][1] >= 0 && y + dir[i][1] < 3) {
                var v = new State(u.st, u.g + 1);
                v.st[pos] = v.st[pos + dir[i][2]];
                v.st[pos + dir[i][2]] = 0;
                var codeV = encode(v);
                if (!vis[codeV]) {
                    //dis[codeV] = dis[codeU] + 1;
                    vis[codeV] = true;
                    if (codeV == endStateCode) {
                        alert(u.g + 1 + " " + cntt);
                        isSolve = true;
                        break;
                    }
                    v.f = v.g + this.evaluate(v,endState);
                    open.push(v);
                }
            }
        }
    }
}

//使用曼哈顿距离
function defualtEvaluate(curState,endState) {
    var res = 0;
    var posx = new Array(9), posy = new Array(9);
    for (var i = 0; i < n; i++) {
        posy[curState.st[i]] = i % 3;
        posx[curState.st[i]] = Math.floor(i / 3)
    }
    for (var i = 0; i < n; i++) {
        if (endState.st[i])
            res += Math.abs(posx[endState.st[i]] - Math.floor(i / 3)) + Math.abs(posy[endState.st[i]] - i % 3)
    }
    return res;
}


function getInversion(state) {
    var cnt = 0;
    for (var i = 0; i < n - 1; i++) {
        for (var j = i + 1; j < n; j++) {
            if (state.st[j] && state.st[j] < state.st[i]) {
                cnt++;
            }
        }
    }
    return cnt;
}

//康托展开
function encode(state) {
    var code = 0;
    for (var i = 0; i < n - 1; i++) {
        var cnt = 0;
        for (var j = i + 1; j < n; j++) {
            if (state.st[j] < state.st[i]) {
                cnt++;
            }
        }
        code += fact[8 - i] * cnt;
    }
    return code;
}