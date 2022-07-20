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
    // number of rooms spawned (7 <= nR <= 10)
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
    // size of rooms [(2 <= rS <= 7) x (2 <= cS <= 7)]
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
        if (rPCorr == rPOCorr) {
            corridorArea.classList.add(`upOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`room`) &&
            !surroundR.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`pathCorridor`) ||
                surroundR.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`room`) ||
                surroundR.classList.contains(`room`)
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
        if (rPCorr == rPOCorr) {
            corridorArea.classList.add(`downOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`pathCorridor`) &&
            !surroundR.classList.contains(`pathCorridor`) &&
            !surroundL.classList.contains(`room`) &&
            !surroundR.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`pathCorridor`) ||
                surroundR.classList.contains(`pathCorridor`) ||
                surroundL.classList.contains(`room`) ||
                surroundR.classList.contains(`room`)
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
        if (cPCorr == cPOCorr) {
            corridorArea.classList.add(`leftOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`room`) &&
            !surroundD.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`pathCorridor`) ||
                surroundD.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`room`) &&
                surroundD.classList.contains(`room`)
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
        if (cPCorr == cPOCorr) {
            corridorArea.classList.add(`rightOCorr`);
        };
        if (
            !corridorArea.classList.contains(`room`) &&
            !corridorArea.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`pathCorridor`) &&
            !surroundD.classList.contains(`pathCorridor`) &&
            !surroundU.classList.contains(`room`) &&
            !surroundD.classList.contains(`room`)
        ) {
            corridorArea.classList.add(`pathCorridor`);
        } else {
            if (
                corridorArea.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`pathCorridor`) ||
                surroundD.classList.contains(`pathCorridor`) ||
                surroundU.classList.contains(`room`) &&
                surroundD.classList.contains(`room`)
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
                cornerInfL.style.borderBottomLeftRadius = "50%";
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
                cornerInfR.style.borderBottomRightRadius = "50%";
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
                cornerSupL.style.borderTopLeftRadius = "50%";
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
                cornerSupR.style.borderTopRightRadius = "50%";
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
        //create Hero
        let iH = Math.floor(Math.random() * dataHero.classHero.length);
        createHero(iH, r, c);
        padHero(iH);
        initMove();
    } else {
        spawnHero();
    };
};

// create hero
const createHero = (iH, r, c) => {
    // PV
    let basePV = dataHero.classHero[iH].PV.base;
    let markupPV = dataHero.classHero[iH].PV.markup;
    let markupPVFloor = markupPV * (floor - 1);
    let markupPVRand = Math.floor(Math.random() * (markupPV * floor));
    // FOR
    let baseFOR = dataHero.classHero[iH].FOR.base;
    let markupFOR = dataHero.classHero[iH].FOR.markup;
    let markupFORFloor = markupFOR * (floor - 1);
    let markupFORRand = Math.floor(Math.random() * (markupFOR * floor));
    // AGI
    let baseAGI = dataHero.classHero[iH].AGI.base;
    let markupAGI = dataHero.classHero[iH].AGI.markup;
    let markupAGIFloor = markupAGI * (floor - 1);
    let markupAGIRand = Math.floor(Math.random() * (markupAGI * floor));
    // INT
    let baseINT = dataHero.classHero[iH].INT.base;
    let markupINT = dataHero.classHero[iH].INT.markup;
    let markupINTFloor = markupINT * (floor - 1);
    let markupINTRand = Math.floor(Math.random() * (markupINT * floor));
    // SAG
    let baseSAG = dataHero.classHero[iH].SAG.base;
    let markupSAG = dataHero.classHero[iH].SAG.markup;
    let markupSAGFloor = markupSAG * (floor - 1);
    let markupSAGRand = Math.floor(Math.random() * (markupSAG * floor));
    // CHA
    let baseCHA = dataHero.classHero[iH].CHA.base;
    let markupCHA = dataHero.classHero[iH].CHA.markup;
    let markupCHAFloor = markupCHA * (floor - 1);
    let markupCHARand = Math.floor(Math.random() * (markupCHA * floor));
    // data hero
    let data = {
        position: {
            r: r + 1,
            c: c + 1
        },
        name: dataHero.classHero[iH].name,
        PV: basePV + markupPVFloor + markupPVRand,
        FOR: baseFOR + markupFORFloor + markupFORRand,
        AGI: baseAGI + markupAGIFloor + markupAGIRand,
        INT: baseINT + markupINTFloor + markupINTRand,
        SAG: baseSAG + markupSAGFloor + markupSAGRand,
        CHA: baseCHA + markupCHAFloor + markupCHARand,
        life: basePV + markupPVFloor + markupPVRand,
        mana: {
            current: baseINT + markupINTFloor + markupINTRand + (5 * (baseSAG + markupSAGFloor + markupSAGRand)),
            total: baseINT + markupINTFloor + markupINTRand + (5 * (baseSAG + markupSAGFloor + markupSAGRand))
        }
    };
    dataHero.heroGenerate.push(data);
};

//create pad hero
const padHero = (iH) => {
    let posHero = dataHero.heroGenerate[0].position;
    for (let i = 0; i <= 4; i++) {
        // pad generation
        let gameSet = document.querySelector('#game');
        let addPad = document.createElement('div');
        gameSet.append(addPad);
        gameSet.lastChild.classList.add(`heroPad`);
        if (i == 0) {
            // hero pad
            let addImg = document.createElement('img');
            gameSet.lastChild.setAttribute("id", `entityHero`);
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c - 1) * 32;
            gameSet.lastChild.style.left = `${posC}px`;
            gameSet.lastChild.style.top = `${posR}px`;
            gameSet.lastChild.append(addImg);
            addImg.src = dataHero.classHero[iH].image;
            addPad.idC = iH;
            addPad.addEventListener('click', hubHero);
            let addContainerLife = document.createElement('div');
            gameSet.lastChild.append(addContainerLife);
            addContainerLife.classList.add('containerLife');
            let lifeBar = document.createElement('div');
            addContainerLife.append(lifeBar);
            lifeBar.classList.add('barLife');
            lifeBar.setAttribute("id", `lifeBarHero`);
        };
        if (i == 1) {
            // up pad
            gameSet.lastChild.setAttribute("id", `upPad`);
            let posR = (posHero.r - 2) * 32;
            let posC = (posHero.c - 1) * 32;
            gameSet.lastChild.style.left = `${posC}px`;
            gameSet.lastChild.style.top = `${posR}px`;
        };
        if (i == 2) {
            // down pad
            gameSet.lastChild.setAttribute("id", `downPad`);
            let posR = (posHero.r) * 32;
            let posC = (posHero.c - 1) * 32;
            gameSet.lastChild.style.left = `${posC}px`;
            gameSet.lastChild.style.top = `${posR}px`;
        };
        if (i == 3) {
            // left pad
            gameSet.lastChild.setAttribute("id", `leftPad`);
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c - 2) * 32;
            gameSet.lastChild.style.left = `${posC}px`;
            gameSet.lastChild.style.top = `${posR}px`;
        };
        if (i == 4) {
            // right pad
            gameSet.lastChild.setAttribute("id", `rightPad`);
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c) * 32;
            gameSet.lastChild.style.left = `${posC}px`;
            gameSet.lastChild.style.top = `${posR}px`;
        };
    };
};

// create hub for hero info when clicked
const hubHero = (e) => {
    let idC = e.currentTarget.idC;
    console.log(`show hub for hero from class ${idC}`);
    let leftHub = document.querySelector('#leftHub');
    let hero = dataHero.heroGenerate[0];
    leftHub.innerHTML = `<article class='cardHero' id='cardHero'>
    <div class='containerTitle_cardHero'>
    <h1 class='title_cardHero'>${hero.name}</h1>
    </div>
    <div class='containerImg_cardHero'>
    <img src='${dataHero.classHero[idC].image}'>
    <div class='containerLife_cardHero'>
    <div class='lifeBar_cardHero'></div>
    <div class='numericLife_cardHero'>${hero.life}/${hero.PV}</div>
    </div>
    <div class='containerMana_cardHero'>
    <div class='manaBar_cardHero'></div>
    <div class='numericMana_cardHero'>${hero.mana.current}/${hero.mana.total}</div>
    </div>
    </div>
    <p class='position_cardHero'>Location: r${hero.position.r}c${hero.position.c}</p>
    <div class='containerStats_cardHero'>
    <p class='stats_cardHero'>PV: ${hero.PV}</p>
    <p class='stats_cardHero'>FOR: ${hero.FOR}</p>
    <p class='stats_cardHero'>AGI: ${hero.AGI}</p>
    <p class='stats_cardHero'>INT: ${hero.INT}</p>
    <p class='stats_cardHero'>SAG: ${hero.SAG}</p>
    <p class='stats_cardHero'>CHA: ${hero.CHA}</p>
    </div>
    <p class='story_cardHero'>${dataHero.classHero[idC].story}</p>
    </article>`;
    let lifeBar = document.querySelector('.lifeBar_cardHero');
    lifeBar.style.width = `${(hero.life / hero.PV) * 100}%`;
};

//spawn monsters
const spawnMonster = (nM) => {
    for (let m = 0; m < nM; m++) {
        let r = Math.floor(Math.random() * 20);
        let c = Math.floor(Math.random() * 32);
        let positionSpawn = document.querySelector(`#r${r + 1}c${c + 1}`);
        if ((positionSpawn.classList.contains(`room`) || positionSpawn.classList.contains(`corridor`)) &&
            !positionSpawn.classList.contains(`perso`) && !positionSpawn.classList.contains(`monster`)) {
            positionSpawn.classList.add(`monster`);
            console.log(`spawn monster${m + 1} r:${r + 1} c:${c + 1}`);
            createMonster(r, c, m);
        } else {
            m--;
            spawnMonster();
        };
    };
};

// select random monster and generate caracteristics
const createMonster = (r, c, m) => {
    let iM = Math.floor(Math.random() * dataMonster.stockMonster.length);
    //PV
    let basePV = dataMonster.stockMonster[iM].PV.base;
    let markupPV = dataMonster.stockMonster[iM].PV.markup;
    let markupPVFloor = markupPV * (floor - 1);
    let markupPVRand = Math.floor(Math.random() * (markupPV * floor));
    //FOR
    let baseFOR = dataMonster.stockMonster[iM].FOR.base;
    let markupFOR = dataMonster.stockMonster[iM].FOR.markup;
    let markupFORFloor = markupFOR * (floor - 1);
    let markupFORRand = Math.floor(Math.random() * (markupFOR * floor));
    // AGI
    let baseAGI = dataMonster.stockMonster[iM].AGI.base;
    let markupAGI = dataMonster.stockMonster[iM].AGI.markup;
    let markupAGIFloor = markupAGI * (floor - 1);
    let markupAGIRand = Math.floor(Math.random() * (markupAGI * floor));
    // INT
    let baseINT = dataMonster.stockMonster[iM].INT.base;
    let markupINT = dataMonster.stockMonster[iM].INT.markup;
    let markupINTFloor = markupINT * (floor - 1);
    let markupINTRand = Math.floor(Math.random() * (markupINT * floor));
    // SAG
    let baseSAG = dataMonster.stockMonster[iM].SAG.base;
    let markupSAG = dataMonster.stockMonster[iM].SAG.markup;
    let markupSAGFloor = markupSAG * (floor - 1);
    let markupSAGRand = Math.floor(Math.random() * (markupSAG * floor));
    // CHA
    let baseCHA = dataMonster.stockMonster[iM].CHA.base;
    let markupCHA = dataMonster.stockMonster[iM].CHA.markup;
    let markupCHAFloor = markupCHA * (floor - 1);
    let markupCHARand = Math.floor(Math.random() * (markupCHA * floor));
    let data = {
        position: {
            r: r + 1,
            c: c + 1
        },
        name: dataMonster.stockMonster[iM].name,
        PV: basePV + markupPVFloor + markupPVRand,
        FOR: baseFOR + markupFORFloor + markupFORRand,
        AGI: baseAGI + markupAGIFloor + markupAGIRand,
        INT: baseINT + markupINTFloor + markupINTRand,
        SAG: baseSAG + markupSAGFloor + markupSAGRand,
        CHA: baseCHA + markupCHAFloor + markupCHARand,
        life: basePV + markupPVFloor + markupPVRand,
        mana: {
            current: baseINT + markupINTFloor + markupINTRand + (5 * (baseSAG + markupSAGFloor + markupSAGRand)),
            total: baseINT + markupINTFloor + markupINTRand + (5 * (baseSAG + markupSAGFloor + markupSAGRand))
        }
    };
    dataMonster.monsterGenerate.push(data);
    padMonster(iM, r, c, m);
};

// create pad monster
const padMonster = (iM, r, c, m) => {
    let gameSet = document.querySelector('#game');
    let addPad = document.createElement('div');
    gameSet.append(addPad);
    gameSet.lastChild.classList.add(`monsterPad`);
    gameSet.lastChild.setAttribute("id", `monster${m}`);
    let addImg = document.createElement('img');
    let posR = r * 32;
    let posC = c * 32;
    gameSet.lastChild.style.left = `${posC}px`;
    gameSet.lastChild.style.top = `${posR}px`;
    gameSet.lastChild.append(addImg);
    addImg.src = dataMonster.stockMonster[iM].image;
    addPad.idMonster = m;
    addPad.idStock = iM;
    addPad.addEventListener('click', hubMonster);
    addPad.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        let idM = e.currentTarget.idMonster;
        normalAttack(idM);
        return false;
    }, false);
    let addContainerLife = document.createElement('div');
    gameSet.lastChild.append(addContainerLife);
    addContainerLife.classList.add('containerLife');
    let lifeBar = document.createElement('div');
    addContainerLife.append(lifeBar);
    lifeBar.classList.add('barLife');
    lifeBar.setAttribute("id", `lifeBarMonster${m}`);
};

// normal attack
const normalAttack = (idM) => {
    let monster = dataMonster.monsterGenerate[idM];
    let hero = dataHero.heroGenerate[0];
    let monsterEntity = document.querySelector(`#monster${idM}`);
    let placeMonster = document.querySelector(`#r${monster.position.r}c${monster.position.c}`);
    let upPlace = document.querySelector(`#r${monster.position.r - 1}c${monster.position.c}`);
    let downPlace = document.querySelector(`#r${monster.position.r + 1}c${monster.position.c}`);
    let leftPlace = document.querySelector(`#r${monster.position.r}c${monster.position.c - 1}`);
    let rightPlace = document.querySelector(`#r${monster.position.r}c${monster.position.c + 1}`);
    if (upPlace.classList.contains('perso') || downPlace.classList.contains('perso') ||
        leftPlace.classList.contains('perso') || rightPlace.classList.contains('perso')) {
        monster.life = monster.life - hero.FOR;
        console.log(`Hero ${hero.name} attacks monster${idM}: ${monster.name} with ${hero.FOR}FOR.`);
        console.log(`${monster.life}/${monster.PV}`);
        console.log(`${(monster.life / monster.PV) * 100}%`);
        if (monster.life <= 0) {
            placeMonster.classList.remove('monster');
            monsterEntity.remove();
            console.log(`monster${idM}: ${monster.name} is dead.`);
        };
        moveMonster();
        checkAvailablePad();
        actualizationBarLifeHero();
        actualizationBarLifeMonster();
    };
};

// create hub for monster info when clicked
const hubMonster = (e) => {
    let idM = e.currentTarget.idMonster;
    let idS = e.currentTarget.idStock;
    console.log(`show hub for monster ${idM} from stock ${idS}`);
    let rightHub = document.querySelector('#rightHub');
    let monster = dataMonster.monsterGenerate;
    rightHub.innerHTML = `<article class='cardMonster' id='cardMonster${idM}'>
    <div class='containerTitle_cardMonster'>
    <h1 class='title_cardMonster'>${monster[idM].name}</h1>
    </div>
    <div class='containerImg_cardMonster'>
    <img src='${dataMonster.stockMonster[idS].image}'>
    <div class='containerLife_cardMonster'>
    <div class='lifeBar_cardMonster'></div>
    <div class='numericLife_cardMonster'>${monster[idM].life}/${monster[idM].PV}</div>
    </div>
    <div class='containerMana_cardMonster'>
    <div class='manaBar_cardMonster'></div>
    <div class='numericMana_cardMonster'>${monster[idM].mana.current}/${monster[idM].mana.total}</div>
    </div>
    </div>
    <p class='position_cardMonster'>Location: r${monster[idM].position.r}c${monster[idM].position.c}</p>
    <div class='containerStats_cardMonster'>
    <p class='stats_cardMonster'>PV: ${monster[idM].PV}</p>
    <p class='stats_cardMonster'>FOR: ${monster[idM].FOR}</p>
    <p class='stats_cardMonster'>AGI: ${monster[idM].AGI}</p>
    <p class='stats_cardMonster'>INT: ${monster[idM].INT}</p>
    <p class='stats_cardMonster'>SAG: ${monster[idM].SAG}</p>
    <p class='stats_cardMonster'>CHA: ${monster[idM].CHA}</p>
    </div>
    <p class='story_cardMonster'>${dataMonster.stockMonster[idS].story}</p>
    </article>`;
    let lifeBar = document.querySelector('.lifeBar_cardMonster');
    lifeBar.style.width = `${(monster[idM].life / monster[idM].PV) * 100}%`;
};

// spawn stairs
const spawnStairs = () => {
    let r = Math.floor(Math.random() * 20);
    let c = Math.floor(Math.random() * 32);
    let positionSpawn = document.querySelector(`#r${r + 1}c${c + 1}`);
    if (positionSpawn.classList.contains(`room`) &&
        !positionSpawn.classList.contains(`perso`) &&
        !positionSpawn.classList.contains(`monster`)) {
        positionSpawn.classList.add('stairs');
        console.log(`spawn stairs at r:${r + 1} c:${c + 1}`);
        let pos = {
            r: r + 1,
            c: c + 1
        };
        posStairs.push(pos);
    } else {
        spawnStairs();
    };
};

// move hero
const moveHeroKey = (event) => {
    if (event.key === "z") {
        moveUp();
    };
    if (event.key === "s") {
        moveDown();
    };
    if (event.key === "q") {
        moveLeft();
    };
    if (event.key === "d") {
        moveRight();
    };
    if (event.key === " ") {
        neutralAction();
    };
    /*let rightHub = document.querySelector('#rightHub');
    rightHub.innerHTML = ``;*/
};

const initMove = () => {
    let upPad = document.querySelector('#upPad');
    let downPad = document.querySelector('#downPad');
    let leftPad = document.querySelector('#leftPad');
    let rightPad = document.querySelector('#rightPad');
    let heroPad = document.querySelector('#entityHero');
    upPad.addEventListener("click", moveUp);
    downPad.addEventListener("click", moveDown);
    leftPad.addEventListener("click", moveLeft);
    rightPad.addEventListener("click", moveRight);
    /*heroPad.addEventListener("click", () => {
        console.log(dataHero);
    });*/
    document.addEventListener("keyup", moveHeroKey);
    //pass turn on rightclick
    heroPad.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        neutralAction();
        return false;
    }, false);
};

// move up
const moveUp = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let heroCurrent = document.querySelector(`#r${posHero.r}c${posHero.c}`);
    let oneFar = document.querySelector(`#r${posHero.r - 1}c${posHero.c}`);
    if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
        heroCurrent.classList.remove('perso');
        posHero.r--;
        oneFar.classList.add('perso');
        padMove();
        moveMonster();
        checkAvailablePad();
        actualizationBarLifeHero();
        actualizationBarLifeMonster();
    };
};

// move down
const moveDown = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let heroCurrent = document.querySelector(`#r${posHero.r}c${posHero.c}`);
    let oneFar = document.querySelector(`#r${posHero.r + 1}c${posHero.c}`);
    if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
        heroCurrent.classList.remove('perso');
        posHero.r++;
        oneFar.classList.add('perso');
        padMove();
        moveMonster();
        checkAvailablePad();
        actualizationBarLifeHero();
        actualizationBarLifeMonster();
    };
};
// move left
const moveLeft = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let heroCurrent = document.querySelector(`#r${posHero.r}c${posHero.c}`);
    let oneFar = document.querySelector(`#r${posHero.r}c${posHero.c - 1}`);
    if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
        heroCurrent.classList.remove('perso');
        posHero.c--;
        oneFar.classList.add('perso');
        padMove();
        moveMonster();
        checkAvailablePad();
        actualizationBarLifeHero();
        actualizationBarLifeMonster();
    };
};
//move right
const moveRight = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let heroCurrent = document.querySelector(`#r${posHero.r}c${posHero.c}`);
    let oneFar = document.querySelector(`#r${posHero.r}c${posHero.c + 1}`);
    if (!oneFar.classList.contains(`wall`) && !oneFar.classList.contains(`monster`)) {
        heroCurrent.classList.remove('perso');
        posHero.c++;
        oneFar.classList.add('perso');
        padMove();
        moveMonster();
        checkAvailablePad();
        actualizationBarLifeHero();
        actualizationBarLifeMonster();
    };
};

// neutral action
const neutralAction = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let heroCurrent = document.querySelector(`#r${posHero.r}c${posHero.c}`);
    if (heroCurrent.classList.contains(`stairs`)) {
        reset(1);
        console.log(`Yay new floor !`);
    } else {
        moveMonster();
    };
    checkAvailablePad();
    actualizationBarLifeHero();
    actualizationBarLifeMonster();
};

// move pad
const padMove = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let movePad = [...document.querySelectorAll('.heroPad')];
    for (let i = 0; i <= 4; i++) {
        if (i == 0) {
            // hero pad
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c - 1) * 32;
            movePad[i].style.left = `${posC}px`;
            movePad[i].style.top = `${posR}px`;
        };
        if (i == 1) {
            // up pad
            let posR = (posHero.r - 2) * 32;
            let posC = (posHero.c - 1) * 32;
            movePad[i].style.left = `${posC}px`;
            movePad[i].style.top = `${posR}px`;
        };
        if (i == 2) {
            // down pad
            let posR = (posHero.r) * 32;
            let posC = (posHero.c - 1) * 32;
            movePad[i].style.left = `${posC}px`;
            movePad[i].style.top = `${posR}px`;
        };
        if (i == 3) {
            // left pad
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c - 2) * 32;
            movePad[i].style.left = `${posC}px`;
            movePad[i].style.top = `${posR}px`;
        };
        if (i == 4) {
            // right pad 
            let posR = (posHero.r - 1) * 32;
            let posC = (posHero.c) * 32;
            movePad[i].style.left = `${posC}px`;
            movePad[i].style.top = `${posR}px`;
        };
    };
};

// move monster
const moveMonster = () => {
    let monster = dataMonster.monsterGenerate;
    for (let i = 0; i < monster.length; i++) {
        let posM = monster[i].position;
        let randomMove = Math.floor(Math.random() * 4);
        let currentPos = document.querySelector(`#r${posM.r}c${posM.c}`);
        let uPos = document.querySelector(`#r${posM.r - 1}c${posM.c}`);
        let rPos = document.querySelector(`#r${posM.r}c${posM.c + 1}`);
        let dPos = document.querySelector(`#r${posM.r + 1}c${posM.c}`);
        let lPos = document.querySelector(`#r${posM.r}c${posM.c - 1}`);
        let monsterPad = document.querySelector(`#monster${i}`);
        // up move
        if (monster[i].life < 1) {
            randomMove = -1;
        };
        if (randomMove == 0 &&
            !uPos.classList.contains('wall') &&
            !uPos.classList.contains('monster') &&
            !uPos.classList.contains('perso')) {
            currentPos.classList.remove('monster');
            posM.r--;
            let newPos = document.querySelector(`#r${posM.r}c${posM.c}`);
            newPos.classList.add('monster');
            let posR = (posM.r - 1) * 32;
            let posC = (posM.c - 1) * 32;
            monsterPad.style.left = `${posC}px`;
            monsterPad.style.top = `${posR}px`;

        };
        // right move
        if (randomMove == 1 &&
            !rPos.classList.contains('wall') &&
            !rPos.classList.contains('monster') &&
            !rPos.classList.contains('perso')) {
            currentPos.classList.remove('monster');
            posM.c++;
            let newPos = document.querySelector(`#r${posM.r}c${posM.c}`);
            newPos.classList.add('monster');
            let posR = (posM.r - 1) * 32;
            let posC = (posM.c - 1) * 32;
            monsterPad.style.left = `${posC}px`;
            monsterPad.style.top = `${posR}px`;
        };
        // down move
        if (randomMove == 2 &&
            !dPos.classList.contains('wall') &&
            !dPos.classList.contains('monster') &&
            !dPos.classList.contains('perso')) {
            currentPos.classList.remove('monster');
            posM.r++;
            let newPos = document.querySelector(`#r${posM.r}c${posM.c}`);
            newPos.classList.add('monster');
            let posR = (posM.r - 1) * 32;
            let posC = (posM.c - 1) * 32;
            monsterPad.style.left = `${posC}px`;
            monsterPad.style.top = `${posR}px`;
        };
        // left move
        if (randomMove == 3 &&
            !lPos.classList.contains('wall') &&
            !lPos.classList.contains('monster') &&
            !lPos.classList.contains('perso')) {
            currentPos.classList.remove('monster');
            posM.c--;
            let newPos = document.querySelector(`#r${posM.r}c${posM.c}`);
            newPos.classList.add('monster');
            let posR = (posM.r - 1) * 32;
            let posC = (posM.c - 1) * 32;
            monsterPad.style.left = `${posC}px`;
            monsterPad.style.top = `${posR}px`;
        };
    };
};

// availablety of pad
const checkAvailablePad = () => {
    let posHero = dataHero.heroGenerate[0].position;
    let upPos = document.querySelector(`#r${posHero.r - 1}c${posHero.c}`);
    let downPos = document.querySelector(`#r${posHero.r + 1}c${posHero.c}`);
    let leftPos = document.querySelector(`#r${posHero.r}c${posHero.c - 1}`);
    let rightPos = document.querySelector(`#r${posHero.r}c${posHero.c + 1}`);
    // up pad check & set visibility
    if (upPos.classList.contains('wall') || upPos.classList.contains('monster')) {
        let upPad = document.querySelector('#upPad');
        upPad.style.visibility = "hidden";
    } else {
        upPad.style.visibility = "visible";
    };
    // down pad check & set visibility
    if (downPos.classList.contains('wall') || downPos.classList.contains('monster')) {
        let downPad = document.querySelector('#downPad');
        downPad.style.visibility = "hidden";
    } else {
        downPad.style.visibility = "visible";
    };
    // left pad check & set visibility
    if (leftPos.classList.contains('wall') || leftPos.classList.contains('monster')) {
        let leftPad = document.querySelector('#leftPad');
        leftPad.style.visibility = "hidden";
    } else {
        leftPad.style.visibility = "visible";
    };
    // right pad check & set visibility
    if (rightPos.classList.contains('wall') || rightPos.classList.contains('monster')) {
        let rightPad = document.querySelector('#rightPad');
        rightPad.style.visibility = "hidden";
    } else {
        rightPad.style.visibility = "visible";
    };
};

// bar life hero actualization
const actualizationBarLifeHero = () => {
    let lifeBar = document.querySelector(`#lifeBarHero`);
    let hero = dataHero.heroGenerate[0];
    lifeBar.style.width = `${(hero.life / hero.PV) * 100}%`;
    if (!!document.getElementById('cardHero')) {
        let lifeBar = document.querySelector('.lifeBar_cardHero');
        let numericLifeBar = document.querySelector('.numericLife_cardHero');
        let position = document.querySelector('.position_cardHero');
        if (hero.life > 0) {
            lifeBar.style.width = `${(hero.life / hero.PV) * 100}%`;
            numericLifeBar.textContent = `${hero.life}/${hero.PV}`;
            position.textContent = `Location: r${hero.position.r}c${hero.position.c}`;
        } else {
            lifeBar.style.width = `0%`;
            numericLifeBar.textContent = `0/${hero.PV}`;
            position.textContent = `Location: heaven`;
        };
    };
};

const actualizationBarLifeMonster = () => {
    let monster = dataMonster.monsterGenerate;
    for (let i = 0; i < monster.length; i++) {
        if (monster[i].life > 0) {
            let lifeBar = document.querySelector(`#lifeBarMonster${i}`);
            lifeBar.style.width = `${(monster[i].life / monster[i].PV) * 100}%`;
        };
        if (!!document.getElementById(`cardMonster${i}`)) {
            let lifeBar = document.querySelector('.lifeBar_cardMonster');
            let numericLifeBar = document.querySelector('.numericLife_cardMonster');
            let position = document.querySelector('.position_cardMonster');
            if (monster[i].life > 0) {
                lifeBar.style.width = `${(monster[i].life / monster[i].PV) * 100}%`;
                numericLifeBar.textContent = `${monster[i].life}/${monster[i].PV}`;
                position.textContent = `Location: r${monster[i].position.r}c${monster[i].position.c}`;
            } else {
                lifeBar.style.width = `0%`;
                numericLifeBar.textContent = `0/${monster[i].PV}`;
                position.textContent = `Location: heaven`;
            };

        };
    };
};

// move monster auto
/*window.setInterval(moveMonster, 500);*/

// stuck button
const stuckReset = () => {
    let stuckBtn = document.querySelector('#stuckBtn');
    stuckBtn.addEventListener('click', handlerStuckBtn)
};

// handler stuckbutton
const handlerStuckBtn = () => {
    reset(0);
};


// new game
const reset = (nF) => {
    let rightHub = document.querySelector('#rightHub');
    let leftHub = document.querySelector('#leftHub');
    document.removeEventListener('keyup', moveHeroKey);
    leftHub.innerHTML = ``;
    rightHub.innerHTML = ``;
    posStairs.length = 0;
    dataMonster.monsterGenerate.length = 0;
    dataHero.heroGenerate.length = 0;
    floor = floor + nF;
    appInit();
    console.log(`Welcome to floor ${floor} adventurer!`);
};
// clean right hub
const cleanRightHub = () => {
    let rightHub = document.querySelector('#rightHub');
    rightHub.addEventListener('click', () => {
        rightHub.innerHTML = ``;
    });
};

// clean left hub
const cleanLeftHub = () => {
    let leftHub = document.querySelector('#leftHub');
    leftHub.addEventListener('click', () => {
        leftHub.innerHTML = ``;
    });
};

// appInit
let posStairs = [];
let floor = 1;
const appInit = () => {
    let gameSet = document.querySelector('#game');
    gameSet.innerHTML = ``;
    gameBoard();
    numberRooms();
    corridorGeneration();
    wallGeneration();
    cornerWall();
    spawnStairs();
    checkAvailablePad();
    cleanRightHub();
    cleanLeftHub();
    console.log(`data hero:`);
    console.log(dataHero);
    console.log(`stairs position:`);
    console.log(posStairs);
    console.log(`data monster:`);
    console.log(dataMonster);
};

// datahero
let dataHero = {
    classHero: [{
        name: "warrior",
        image: "./src/img/character/darklink.png",
        story: "Bam!",
        PV: {
            base: 100,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 10
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
        skill: ["skill1", "skill2"]
    },
    {
        name: "priest",
        image: "./src/img/character/holyF.png",
        story: "Holy shit!",
        PV: {
            base: 100,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 10
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
        skill: ["skill1", "skill2"]
    },
    {
        name: "archer",
        image: "./src/img/character/archerM.png",
        story: "Paw!",
        PV: {
            base: 100,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 10
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
        skill: ["skill1", "skill2"]
    },
    {
        name: "pistolero",
        image: "./src/img/character/sniperF.png",
        story: "Piou piou!",
        PV: {
            base: 100,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 10
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
        skill: ["skill1", "skill2"]
    }],
    heroGenerate: []
};
// datamonster
let dataMonster = {
    stockMonster: [{
        name: "devil",
        image: "./src/img/monster/devil.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "runic dragon",
        image: "./src/img/monster/drake1.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 10
        },
        FOR: {
            base: 10,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "infernal dragon",
        image: "./src/img/monster/drake2.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 40,
            markup: 15
        },
        FOR: {
            base: 15,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "abyssal dragon",
        image: "./src/img/monster/drake3.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 15
        },
        FOR: {
            base: 12,
            markup: 5
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "haunted snail",
        image: "./src/img/monster/evilspirit.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "corrupted sylvan",
        image: "./src/img/monster/evilthree.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 30,
            markup: 5
        },
        FOR: {
            base: 10,
            markup: 5
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "lucky pig",
        image: "./src/img/monster/flypig.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "melancholic ghost",
        image: "./src/img/monster/ghost1.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "evil spirit",
        image: "./src/img/monster/ghost2.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 10,
            markup: 5
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "gobelin",
        image: "./src/img/monster/gobelin.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "goblin shaman",
        image: "./src/img/monster/gobelinchaman.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 15,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "aerial jellyfish",
        image: "./src/img/monster/jellyfish.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 35,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "kobold",
        image: "./src/img/monster/kobold.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 7,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "embodiment of evil and depravity",
        image: "./src/img/monster/littledemon.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 35,
            markup: 10
        },
        FOR: {
            base: 5,
            markup: 5
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "pizza boy",
        image: "./src/img/monster/pizzaboy.png",
        story: "Pineapples... <br>That freaks me out!",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "prankster cat",
        image: "./src/img/monster/prankster_cat.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "quetzacoalt",
        image: "./src/img/monster/quetzacoalt.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 15,
            markup: 7
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "traveler face",
        image: "./src/img/monster/skull.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 15,
            markup: 5
        },
        FOR: {
            base: 3,
            markup: 2
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "slenderman",
        image: "./src/img/monster/slender.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 30,
            markup: 10
        },
        FOR: {
            base: 10,
            markup: 10
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "slime",
        image: "./src/img/monster/slime.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 8
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "spectator",
        image: "./src/img/monster/spectator.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 10,
            markup: 3
        },
        FOR: {
            base: 2,
            markup: 1
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "spider golem",
        image: "./src/img/monster/spidergolem.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 6,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "wild unicorn",
        image: "./src/img/monster/unicorn1.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 7
        },
        FOR: {
            base: 10,
            markup: 5
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "awake unicorn",
        image: "./src/img/monster/unicorn2.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 30,
            markup: 8
        },
        FOR: {
            base: 15,
            markup: 6
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "inhabitant of the void",
        image: "./src/img/monster/velkozz.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 20,
            markup: 6
        },
        FOR: {
            base: 10,
            markup: 3
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "red wyvern",
        image: "./src/img/monster/wyvern.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 25,
            markup: 8
        },
        FOR: {
            base: 15,
            markup: 6
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    },
    {
        name: "zombie",
        image: "./src/img/monster/zombie.png",
        story: "This monster has an absolutely fabulous and fascinating story but only the dev knows it.",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 2
        },
        AGI: {
            base: 10,
            markup: 10
        },
        INT: {
            base: 10,
            markup: 10
        },
        SAG: {
            base: 10,
            markup: 10
        },
        CHA: {
            base: 10,
            markup: 10
        },
    }],
    monsterGenerate: []
};

appInit();
stuckReset();
