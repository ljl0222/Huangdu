/*
 * @Author: Maoyao Ye
 * @Date: 2020-04-12 16:23:57
 * @LastEditors: Maoyao Ye
 * @LastEditTime: 2020-04-20 20:48:46
 * @FilePath: \Courses\git-huangdu\Courses\100580-人工智能原理与技术\课程设计-八数码\test.js
 * @Description: 
 */

function run() {
    var startState = {
        st: [1, 8, 3,
            2, 0, 4,
            7, 6, 5]
    };
    var endState = {
        st: [1, 2, 3
            , 4, 5, 6
            , 7, 8, 0]
    };

    let randomlyStart = true;
    if (randomlyStart) {
        var randomState = new Array(9), vis = new Array(9).fill(0);
        for (var i = 0; i < n; i++) {
            var x;
            do {
                x = Math.floor(Math.random() * 9);
            }
            while (vis[x]);
            vis[x] = true;
            randomState[i] = x;
        }
        startState.st = Array.from(randomState);
    }
    
    solve(startState, endState, evaluateByManhatonAndInversion);


    function evaluateByNumber(curState,endState) {
        var cnt = 0;
        for (var i = 0; i < n; i++) {
            if (curState.st[i] && curState.st[i] != endState.st[i]) {
                cnt++;
            }
        }
        return cnt;
    }

    function evaluateByManhatonAndInversion(curState,endState) {
        let res = 0,c=0;
        let posx = new Array(9), posy = new Array(9);
        for (let i = 0; i < n; i++) {
            posy[curState.st[i]] = i % 3;
            posx[curState.st[i]] = Math.floor(i / 3)
        }
        for (let i = 0; i < n; i++) {
            if (endState.st[i])
                res += Math.abs(posx[endState.st[i]] - Math.floor(i / 3)) + Math.abs(posy[endState.st[i]] - i % 3)
        }
        
        return res + c / 2;
    }
    


}

