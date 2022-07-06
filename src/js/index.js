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
    // number of rooms spawned (5 <= 10)
    let nRCoeff = Math.floor(Math.random() * 6);
    let nR = nRCoeff + 5;
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
    corridorOrigin(rPO, cPO, rS, cS, roomIdx);

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

// corridor generation
const corridorOrigin = (rPO, cPO, rS, cS, roomIdx) => {
    // origin of corridor
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
        drawUpCorridor(rPO - 1, cPOCorr);
    } else {
        // down corridor origin
        let cCoeff = Math.floor(Math.random() * cS);
        let cPOCorr = cPO + cCoeff;
        if (cPOCorr >= 32) {
            cPOCorr = 31;
        };
        console.log(`room${roomIdx} corridor down origin: r${downR}c${cPOCorr}`);
        drawDownCorridor(downR, cPOCorr);
    };
    if (leftEdge >= rightEdge) {
        // left corridor origin
        let rCoeff = Math.floor(Math.random() * rS);
        let rPOCorr = rPO + rCoeff;
        if (rPOCorr >= 20) {
            rPOCorr = 19;
        };
        console.log(`room${roomIdx} corridor left origin: r${rPOCorr}c${cPO - 1}`);
        drawLeftCorridor(rPOCorr, cPO - 1);

    } else {
        // right corridor origin
        let rCoeff = Math.floor(Math.random() * rS);
        let rPOCorr = rPO + rCoeff;
        if (rPOCorr >= 20) {
            rPOCorr = 19;
        };
        console.log(`room${roomIdx} corridor right origin: r${rPOCorr}c${rightC}`);
        drawRightCorridor(rPOCorr, rightC);
    };
};


const drawUpCorridor = (rPOCorr, cPCorr) => {
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
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundRoomL.classList.contains(`room`) &&
            !surroundRoomR.classList.contains(`room`)
        ) {
            if (rPCorr == rPOCorr) {
                corridorArea.classList.add(`upOCorr`);
                corridorArea.classList.add(`pathCorridor`);
            } else {
                corridorArea.classList.add(`pathCorridor`);
            };
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) &&
                surroundL.classList.contains(`pathCorridor`) &&
                surroundR.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                rPCorr = 1;
            } else {
                rPCorr = 1;
            };

        };
    };
};

const drawDownCorridor = (rPOCorr, cPCorr) => {
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
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundRoomL.classList.contains(`room`) &&
            !surroundRoomR.classList.contains(`room`)
        ) {
            if (rPCorr == rPOCorr) {
                corridorArea.classList.add(`downOCorr`);
                corridorArea.classList.add(`pathCorridor`);
            } else {
                corridorArea.classList.add(`pathCorridor`);
            };
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) &&
                surroundL.classList.contains(`pathCorridor`) &&
                surroundR.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                rPCorr = 20;
            } else {
                rPCorr = 20;
            };
        };
    };
};

const drawLeftCorridor = (rPCorr, cPOCorr) => {
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
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundRoomU.classList.contains(`room`) &&
            !surroundRoomD.classList.contains(`room`)
        ) {
            if (cPCorr == cPOCorr) {
                corridorArea.classList.add(`leftOCorr`);
                corridorArea.classList.add(`pathCorridor`);
            } else {
                corridorArea.classList.add(`pathCorridor`);
            };
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) &&
                surroundU.classList.contains(`pathCorridor`) &&
                surroundD.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                cPCorr = 1;
            } else {
                cPCorr = 1;
            };
        };
    };
};

const drawRightCorridor = (rPCorr, cPOCorr) => {
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
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundRoomU.classList.contains(`room`) &&
            !surroundRoomD.classList.contains(`room`)
        ) {
            if (cPCorr == cPOCorr) {
                corridorArea.classList.add(`rightOCorr`);
                corridorArea.classList.add(`pathCorridor`);
            } else {
                corridorArea.classList.add(`pathCorridor`);
            };
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) &&
                surroundU.classList.contains(`pathCorridor`) &&
                surroundD.classList.contains(`pathCorridor`)
            ) {
                corridorArea.classList.add(`joinCorr`);
                cPCorr = 32;
            } else {
                cPCorr = 32;
            };
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
    } else {
        spawnHero();
    }
};

//spawn monsters
const spawnMonster = (nM) => {
    for (let m = 1; m <= nM; m++) {
        let r = Math.floor(Math.random() * 20);
        let c = Math.floor(Math.random() * 32);
        let positionSpawn = document.querySelector(`#r${r + 1}c${c + 1}`);
        if (positionSpawn.classList.contains(`room`) && !positionSpawn.classList.contains(`perso`)) {
            positionSpawn.classList.add(`monster`);
            console.log(`spawn monster${m} r:${r + 1} c:${c + 1}`);
        } else {
            m--;
            spawnMonster();
        }
    }
};

// appInit
const appInit = () => {
    gameBoard();
    numberRooms();
    wallGeneration();
    cornerWall();
};
appInit();