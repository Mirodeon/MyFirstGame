// game board generation
const gameBoard = () => {
    for (let i = 1; i <= 20; i++) {
        let gameSet = document.querySelector('#game');
        let divRow = document.createElement('div');
        gameSet.append(divRow);
        gameSet.lastChild.classList.add(`row`);
        gameSet.lastChild.setAttribute("id", `r${i}`);
        for (let a = 1; a <= 32; a++) {
            let currentRow = gameSet.lastChild;
            let divCol = document.createElement('div');
            currentRow.append(divCol);
            currentRow.lastChild.classList.add(`col`);
            currentRow.lastChild.setAttribute("id", `r${i}c${a}`);
            if (i >= 20 && a >= 32) {
                console.log(`size of gameboard: r${i} c${a}`);
            }
        }
    }
    console.log(`gameboard generated`);
};

// spawn dungeon rooms
const numberRooms = () => {
    // number of rooms spawned (7 <= 10)
    let nRCoeff = Math.floor(Math.random() * 4);
    let nR = nRCoeff + 7;
    console.log(`number of rooms: ${nR}`);
    positionRooms(nR);
    spawnHero();
    spawnMonster(nR);
};

const positionRooms = (nR) => {
    // position of rooms
    for (let i = 1; i <= nR; i++) {
        let r = Math.floor(Math.random() * 18);
        let c = Math.floor(Math.random() * 30);
        console.log(`origin of room${i}: r${r + 2} c${c + 2}`);
        sizeRoom(r + 2, c + 2, i);
    }
};

const sizeRoom = (rPO, cPO, roomIdx) => {
    // size of rooms [(2 <= 7) x (2 <= 7)]
    let rSCoeff = Math.floor(Math.random() * 6);
    let cSCoeff = Math.floor(Math.random() * 6);
    let rS = 2 + rSCoeff;
    let cS = 2 + cSCoeff;
    console.log(`size of room${roomIdx}: r${rS} c${cS}`);
    drawRoom(rPO, cPO, rS, cS, roomIdx);
    corridorPathOrigin(rPO, cPO, rS, cS, roomIdx);

};

const drawRoom = (rPO, cPO, rS, cS, roomIdx) => {
    // generation of rooms
    for (let rPosition = rPO; rPosition < rPO + rS; rPosition++) {
        for (let cPosition = cPO; cPosition < cPO + cS; cPosition++) {
            let roomArea = document.querySelector(`#r${rPosition}c${cPosition}`)
            if (cPosition <= 31 && rPosition <= 19) {
                roomArea.classList.add(`room`);
                /*roomArea.classList.remove(`pathCorridor`);*/
            };
        };
    };
    console.log(`room${roomIdx} generated`);
};

// corridor path
const corridorPathOrigin = (rPO, cPO, rS, cS, roomIdx) => {
    // origin of corridor path
    let downR = rPO + rS;
    let rightC = cPO + cS;
    let upEdge = rPO - 1;
    let downEdge = 19 - downR;
    let leftEdge = cPO - 1;
    let rightEdge = 31 - rightC;
    if (downR >= 20) {
        downEdge = 0;
    };
    if (rightC >= 32) {
        rightEdge = 0;
    };
    if (upEdge >= downEdge) {
        // up corridor origin
        let cCoeff = Math.floor(Math.random() * cS);
        let cPOCorr = cPO + cCoeff;
        if (cPOCorr >= 32) {
            cPOCorr = 31;
        };
        console.log(`room${roomIdx} corridor up origin: r${rPO - 1}c${cPOCorr}`);
        pathUpCorridor(rPO - 1, cPOCorr, roomIdx);
    } else {
        // down corridor origin
        let cCoeff = Math.floor(Math.random() * cS);
        let cPOCorr = cPO + cCoeff;
        if (cPOCorr >= 32) {
            cPOCorr = 31;
        };
        console.log(`room${roomIdx} corridor down origin: r${downR}c${cPOCorr}`);
        pathDownCorridor(downR, cPOCorr, roomIdx);
    };
    if (leftEdge >= rightEdge) {
        // left corridor origin
        let rCoeff = Math.floor(Math.random() * rS);
        let rPOCorr = rPO + rCoeff;
        if (rPOCorr >= 20) {
            rPOCorr = 19;
        };
        console.log(`room${roomIdx} corridor left origin: r${rPOCorr}c${cPO - 1}`);
        pathLeftCorridor(rPOCorr, cPO - 1, roomIdx);

    } else {
        // right corridor origin
        let rCoeff = Math.floor(Math.random() * rS);
        let rPOCorr = rPO + rCoeff;
        if (rPOCorr >= 20) {
            rPOCorr = 19;
        };
        console.log(`room${roomIdx} corridor right origin: r${rPOCorr}c${rightC}`);
        pathRightCorridor(rPOCorr, rightC, roomIdx);
    };
};


const pathUpCorridor = (rPOCorr, cPCorr, roomIdx) => {
    // up corridor path
    for (let rPCorr = rPOCorr; rPCorr > 1; rPCorr--) {
        let corridorArea = document.querySelector(`#r${rPCorr}c${cPCorr}`);
        let surroundL = document.querySelector(`#r${rPCorr}c${cPCorr - 1}`);
        let surroundR = document.querySelector(`#r${rPCorr}c${cPCorr + 1}`);
        let surroundRoomL = document.querySelector(`#r${rPCorr + 1}c${cPCorr - 1}`);
        let surroundRoomR = document.querySelector(`#r${rPCorr + 1}c${cPCorr + 1}`);
        if (rPCorr + 1 > rPOCorr) {
            surroundRoomL = corridorArea;
            surroundRoomR = corridorArea;
        };
        if (rPCorr == rPOCorr) {
            corridorArea.classList.add(`upOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundRoomL.classList.contains(`room`) &&
            !surroundRoomR.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`pathCorridor`) ||
                surroundR.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                corridorArea.classList.add(`pathCorridor`);
                console.log(`room${roomIdx} up corridor junction: ${corridorArea.id}`);
                rPCorr = 1;
            } else {
                rPCorr = 1;
            };

        };
    };
};

const pathDownCorridor = (rPOCorr, cPCorr, roomIdx) => {
    // down corridor path
    for (let rPCorr = rPOCorr; rPCorr < 20; rPCorr++) {
        let corridorArea = document.querySelector(`#r${rPCorr}c${cPCorr}`);
        let surroundL = document.querySelector(`#r${rPCorr}c${cPCorr - 1}`);
        let surroundR = document.querySelector(`#r${rPCorr}c${cPCorr + 1}`);
        let surroundRoomL = document.querySelector(`#r${rPCorr - 1}c${cPCorr - 1}`);
        let surroundRoomR = document.querySelector(`#r${rPCorr - 1}c${cPCorr + 1}`);
        if (rPCorr - 1 < rPOCorr) {
            surroundRoomL = corridorArea;
            surroundRoomR = corridorArea;
        };
        if (rPCorr == rPOCorr) {
            corridorArea.classList.add(`downOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundRoomL.classList.contains(`room`) &&
            !surroundRoomR.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`pathCorridor`) ||
                surroundR.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                corridorArea.classList.add(`pathCorridor`);
                console.log(`room${roomIdx} down corridor junction: ${corridorArea.id}`);
                rPCorr = 20;
            } else {
                rPCorr = 20;
            };
        };
    };
};

const pathLeftCorridor = (rPCorr, cPOCorr, roomIdx) => {
    // left corridor path
    for (let cPCorr = cPOCorr; cPCorr > 1; cPCorr--) {
        let corridorArea = document.querySelector(`#r${rPCorr}c${cPCorr}`);
        let surroundU = document.querySelector(`#r${rPCorr - 1}c${cPCorr}`);
        let surroundD = document.querySelector(`#r${rPCorr + 1}c${cPCorr}`);
        let surroundRoomU = document.querySelector(`#r${rPCorr - 1}c${cPCorr + 1}`);
        let surroundRoomD = document.querySelector(`#r${rPCorr + 1}c${cPCorr + 1}`);
        if (cPCorr + 1 > cPOCorr) {
            surroundRoomU = corridorArea;
            surroundRoomD = corridorArea;
        };
        if (cPCorr == cPOCorr) {
            corridorArea.classList.add(`leftOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundRoomU.classList.contains(`room`) &&
            !surroundRoomD.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`pathCorridor`) ||
                surroundD.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                corridorArea.classList.add(`pathCorridor`);
                console.log(`room${roomIdx} left corridor junction: ${corridorArea.id}`);
                cPCorr = 1;
            } else {
                cPCorr = 1;
            };
        };
    };
};

const pathRightCorridor = (rPCorr, cPOCorr, roomIdx) => {
    // right corridor path
    for (let cPCorr = cPOCorr; cPCorr < 32; cPCorr++) {
        let corridorArea = document.querySelector(`#r${rPCorr}c${cPCorr}`);
        let surroundU = document.querySelector(`#r${rPCorr - 1}c${cPCorr}`);
        let surroundD = document.querySelector(`#r${rPCorr + 1}c${cPCorr}`);
        let surroundRoomU = document.querySelector(`#r${rPCorr - 1}c${cPCorr - 1}`);
        let surroundRoomD = document.querySelector(`#r${rPCorr + 1}c${cPCorr - 1}`);
        if (cPCorr - 1 < cPOCorr) {
            surroundRoomU = corridorArea;
            surroundRoomD = corridorArea;
        };
        if (cPCorr == cPOCorr) {
            corridorArea.classList.add(`rightOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundRoomU.classList.contains(`room`) &&
            !surroundRoomD.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`pathCorridor`) ||
                surroundD.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                corridorArea.classList.add(`pathCorridor`);
                console.log(`room${roomIdx} right corridor junction: ${corridorArea.id}`);
                cPCorr = 32;
            } else {
                cPCorr = 32;
            };
        };
    };
};

// corridor generation
const corridorGeneration = () => {
    // find junction
    for (let r = 1; r <= 20; r++) {
        for (let c = 1; c <= 32; c++) {
            let currentPos = document.querySelector(`#r${r}c${c}`);
            if ((currentPos.classList.contains(`joinCorr`) ||
                currentPos.classList.contains(`leftOCorr`) ||
                currentPos.classList.contains(`upOCorr`) ||
                currentPos.classList.contains(`rightOCorr`) ||
                currentPos.classList.contains(`downOCorr`)) &&
                !currentPos.classList.contains(`room`)) {
                console.log(`junction find at: ${currentPos.id}`);
                drawLeftCorridor(r, c, currentPos);
                drawRightCorridor(r, c, currentPos);
                drawUpCorridor(r, c, currentPos);
                drawDownCorridor(r, c, currentPos);
            };
        };
    };
};

const drawLeftCorridor = (r, c, currentPos) => {
    // find match from junction to left
    for (let cLJFind = c; cLJFind > 1; cLJFind--) {
        let matchPos = document.querySelector(`#r${r}c${cLJFind}`);
        let oneFarPos = document.querySelector(`#r${r}c${cLJFind - 1}`);
        if ((matchPos.classList.contains(`joinCorr`) ||
            matchPos.classList.contains(`leftOCorr`) ||
            matchPos.classList.contains(`upOCorr`) ||
            matchPos.classList.contains(`rightOCorr`) ||
            matchPos.classList.contains(`downOCorr`) ||
            (
                oneFarPos.classList.contains(`room`) &&
                matchPos.classList.contains(`pathCorridor`)
            )) &&
            !matchPos.classList.contains(`room`) &&
            matchPos.id != currentPos.id) {
            console.log(`left match found at ${matchPos.id}`);
            // draw left corridor between junction and match
            for (let cDraw = c; cDraw >= cLJFind; cDraw--) {
                let drawPos = document.querySelector(`#r${r}c${cDraw}`);
                drawPos.classList.add(`corridor`);
            };
            console.log(`corridor generated between ${currentPos.id} & ${matchPos.id}`);
            cLJFind = 1;
        };
        if (!matchPos.classList.contains(`pathCorridor`) || matchPos.classList.contains(`room`)) {
            console.log(`No more left match from ${currentPos.id} at ${matchPos.id}`);
            cLJFind = 1;
        };
    };
};

const drawRightCorridor = (r, c, currentPos) => {
    // find match from junction to right
    for (let cRJFind = c; cRJFind < 32; cRJFind++) {
        let matchPos = document.querySelector(`#r${r}c${cRJFind}`);
        let oneFarPos = document.querySelector(`#r${r}c${cRJFind + 1}`);
        if ((matchPos.classList.contains(`joinCorr`) ||
            matchPos.classList.contains(`leftOCorr`) ||
            matchPos.classList.contains(`upOCorr`) ||
            matchPos.classList.contains(`rightOCorr`) ||
            matchPos.classList.contains(`downOCorr`) ||
            (
                oneFarPos.classList.contains(`room`) &&
                matchPos.classList.contains(`pathCorridor`)
            )) &&
            !matchPos.classList.contains(`room`) &&
            matchPos.id != currentPos.id) {
            console.log(`right match found at ${matchPos.id}`);
            // draw right corridor between junction and match
            for (let cDraw = c; cDraw <= cRJFind; cDraw++) {
                let drawPos = document.querySelector(`#r${r}c${cDraw}`);
                drawPos.classList.add(`corridor`);
            };
            console.log(`corridor generated between ${currentPos.id} & ${matchPos.id}`);
            cRJFind = 32;
        };
        if (!matchPos.classList.contains(`pathCorridor`) || matchPos.classList.contains(`room`)) {
            console.log(`No more right match from ${currentPos.id} at ${matchPos.id}`);
            cRJFind = 32;
        };
    };
};

const drawUpCorridor = (r, c, currentPos) => {
    // find match from junction to up
    for (let rUJFind = r; rUJFind > 1; rUJFind--) {
        let matchPos = document.querySelector(`#r${rUJFind}c${c}`);
        let oneFarPos = document.querySelector(`#r${rUJFind - 1}c${c}`);
        if ((matchPos.classList.contains(`joinCorr`) ||
            matchPos.classList.contains(`leftOCorr`) ||
            matchPos.classList.contains(`upOCorr`) ||
            matchPos.classList.contains(`rightOCorr`) ||
            matchPos.classList.contains(`downOCorr`) ||
            (
                oneFarPos.classList.contains(`room`) &&
                matchPos.classList.contains(`pathCorridor`)
            )) &&
            !matchPos.classList.contains(`room`) &&
            matchPos.id != currentPos.id) {
            console.log(`up match found at ${matchPos.id}`);
            // draw up corridor between junction and match
            for (let rDraw = r; rDraw >= rUJFind; rDraw--) {
                let drawPos = document.querySelector(`#r${rDraw}c${c}`);
                drawPos.classList.add(`corridor`);
            };
            console.log(`corridor generated between ${currentPos.id} & ${matchPos.id}`);
            rUJFind = 1;
        };
        if (!matchPos.classList.contains(`pathCorridor`) || matchPos.classList.contains(`room`)) {
            console.log(`No more up match from ${currentPos.id} at ${matchPos.id}`);
            rUJFind = 1;
        };
    };
};

const drawDownCorridor = (r, c, currentPos) => {
    // find match from junction to down
    for (let rDJFind = r; rDJFind < 20; rDJFind++) {
        let matchPos = document.querySelector(`#r${rDJFind}c${c}`);
        let oneFarPos = document.querySelector(`#r${rDJFind + 1}c${c}`);
        if ((matchPos.classList.contains(`joinCorr`) ||
            matchPos.classList.contains(`leftOCorr`) ||
            matchPos.classList.contains(`upOCorr`) ||
            matchPos.classList.contains(`rightOCorr`) ||
            matchPos.classList.contains(`downOCorr`) ||
            (
                oneFarPos.classList.contains(`room`) &&
                matchPos.classList.contains(`pathCorridor`)
            )) &&
            !matchPos.classList.contains(`room`) &&
            matchPos.id != currentPos.id) {
            console.log(`down match found at ${matchPos.id}`);
            // draw down corridor between junction and match
            for (let rDraw = r; rDraw <= rDJFind; rDraw++) {
                let drawPos = document.querySelector(`#r${rDraw}c${c}`);
                drawPos.classList.add(`corridor`);
            };
            console.log(`corridor generated between ${currentPos.id} & ${matchPos.id}`);
            rDJFind = 20;
        };
        if (!matchPos.classList.contains(`pathCorridor`) || matchPos.classList.contains(`room`)) {
            console.log(`No more down match from ${currentPos.id} at ${matchPos.id}`);
            rDJFind = 20;
        };
    };
};

// wall generation
const wallGeneration = () => {
    let i = 0;
    for (let r = 1; r <= 20; r++) {
        for (let c = 1; c <= 32; c++) {
            let positionId = document.querySelector(`#r${r}c${c}`);
            let positionIdU = document.querySelector(`#r${r - 1}c${c}`);
            let positionIdR = document.querySelector(`#r${r}c${c + 1}`);
            let positionIdD = document.querySelector(`#r${r + 1}c${c}`);
            let positionIdL = document.querySelector(`#r${r}c${c - 1}`);
            if (
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                r != 1 &&
                !positionIdU.classList.contains(`room`) &&
                !positionIdU.classList.contains(`corridor`)
            ) {
                positionIdU.classList.add(`wall`);
                i++;
            };
            if (
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                c != 32 &&
                !positionIdR.classList.contains(`room`) &&
                !positionIdR.classList.contains(`corridor`)
            ) {
                positionIdR.classList.add(`wall`);
                i++;
            };
            if (
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                r != 20 &&
                !positionIdD.classList.contains(`room`) &&
                !positionIdD.classList.contains(`corridor`)
            ) {
                positionIdD.classList.add(`wall`);
                i++;
            };
            if (
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                c != 1 &&
                !positionIdL.classList.contains(`room`) &&
                !positionIdL.classList.contains(`corridor`)
            ) {
                positionIdL.classList.add(`wall`);
                i++;
            };
        };
    };
    console.log(`wall generated: ${i}`);
};

//corner of the wall generation
const cornerWall = () => {
    let upL = 0;
    let upR = 0;
    let downL = 0;
    let downR = 0;
    for (let r = 1; r <= 20; r++) {
        for (let c = 1; c <= 32; c++) {
            let positionId = document.querySelector(`#r${r}c${c}`);
            let cornerInfL = document.querySelector(`#r${r + 1}c${c - 1}`);
            let cornerInfR = document.querySelector(`#r${r + 1}c${c + 1}`);
            let cornerSupL = document.querySelector(`#r${r - 1}c${c - 1}`);
            let cornerSupR = document.querySelector(`#r${r - 1}c${c + 1}`);
            if (r != 20 &&
                c != 1 &&
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                !cornerInfL.classList.contains(`room`) &&
                !cornerInfL.classList.contains(`wall`) &&
                !cornerInfL.classList.contains(`corridor`)
            ) {
                cornerInfL.classList.add(`brasero`);
                downL++;
            };
            if (r != 20 &&
                c != 32 &&
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                !cornerInfR.classList.contains(`room`) &&
                !cornerInfR.classList.contains(`wall`) &&
                !cornerInfR.classList.contains(`corridor`)
            ) {
                cornerInfR.classList.add(`brasero`);
                downR++;
            };
            if (
                r != 1 &&
                c != 1 &&
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                !cornerSupL.classList.contains(`room`) &&
                !cornerSupL.classList.contains(`wall`) &&
                !cornerSupL.classList.contains(`corridor`)
            ) {
                cornerSupL.classList.add(`brasero`);
                upL++;
            };
            if (
                r != 1 &&
                c != 32 &&
                (
                    positionId.classList.contains(`room`)
                    ||
                    positionId.classList.contains(`corridor`)
                ) &&
                !cornerSupR.classList.contains(`room`) &&
                !cornerSupR.classList.contains(`wall`) &&
                !cornerSupR.classList.contains(`corridor`)
            ) {
                cornerSupR.classList.add(`brasero`);
                upR++;
            };
        };
    };
    console.log(`up left corner generated: ${upL}`);
    console.log(`up right corner generated: ${upR}`);
    console.log(`down left corner generated: ${downL}`);
    console.log(`down right corner generated: ${downR}`);
};

// spawn hero
const spawnHero = () => {
    let r = Math.floor(Math.random() * 20);
    let c = Math.floor(Math.random() * 32);
    let positionSpawn = document.querySelector(`#r${r + 1}c${c + 1}`);
    if (positionSpawn.classList.contains(`room`)) {
        positionSpawn.classList.add(`perso`);
        console.log(`spawn hero r:${r + 1} c:${c + 1}`);
        initMove(r + 1, c + 1);
    } else {
        spawnHero();
    };
};

//spawn monsters
const spawnMonster = (nM) => {
    for (let m = 1; m <= nM; m++) {
        let r = Math.floor(Math.random() * 20);
        let c = Math.floor(Math.random() * 32);
        let positionSpawn = document.querySelector(`#r${r + 1}c${c + 1}`);
        if ((positionSpawn.classList.contains(`room`) || positionSpawn.classList.contains(`corridor`)) &&
            !positionSpawn.classList.contains(`perso`)) {
            positionSpawn.classList.add(`monster`);
            console.log(`spawn monster${m} r:${r + 1} c:${c + 1}`);
        } else {
            m--;
            spawnMonster();
        };
    };
};

// move hero
const initMove = (heroRPos, heroCPos) => {
    console.log(`NIQUE JS`);
    document.addEventListener("keyup", event => {
        if (event.key === "z") {
            let oneFar = document.querySelector(`#r${heroRPos - 1}c${heroCPos}`);
            if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
                let heroCurrent = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroCurrent.classList.remove('perso');
                heroRPos = heroRPos - 1;
                let heroNewPos = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroNewPos.classList.add('perso');
            };
        };
        if (event.key === "s") {
            let oneFar = document.querySelector(`#r${heroRPos + 1}c${heroCPos}`);
            if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
                let heroCurrent = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroCurrent.classList.remove('perso');
                heroRPos = heroRPos + 1;
                let heroNewPos = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroNewPos.classList.add('perso');
            };
        };
        if (event.key === "q") {
            let oneFar = document.querySelector(`#r${heroRPos}c${heroCPos - 1}`);
            if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
                let heroCurrent = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroCurrent.classList.remove('perso');
                heroCPos = heroCPos - 1;
                let heroNewPos = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroNewPos.classList.add('perso');
            };
        };
        if (event.key === "d") {
            let oneFar = document.querySelector(`#r${heroRPos}c${heroCPos + 1}`);
            if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
                let heroCurrent = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroCurrent.classList.remove('perso');
                heroCPos = heroCPos + 1;
                let heroNewPos = document.querySelector(`#r${heroRPos}c${heroCPos}`);
                heroNewPos.classList.add('perso');
            };
        };
    });
};

// appInit
const appInit = () => {
    gameBoard();
    numberRooms();
    corridorGeneration();
    wallGeneration();
    cornerWall();
};
appInit();