// datamonster
let dataMonster = {
    stockMonster: [{
        name: "devil",
        image: "./src/img/monster/devil.png",
        PV: {
            base: 25,
            markup: 15
        },
        FOR: {
            base: 10,
            markup: 3
        }
    },
    {
        name: "runic dragon",
        image: "./src/img/monster/drake1.png",
        PV: {
            base: 25,
            markup: 10
        },
        FOR: {
            base: 10,
            markup: 3
        }
    },
    {
        name: "infernal dragon",
        image: "./src/img/monster/drake2.png",
        PV: {
            base: 40,
            markup: 15
        },
        FOR: {
            base: 15,
            markup: 3
        }
    },
    {
        name: "abyssal dragon",
        image: "./src/img/monster/drake3.png",
        PV: {
            base: 25,
            markup: 15
        },
        FOR: {
            base: 12,
            markup: 5
        }
    },
    {
        name: "haunted snail",
        image: "./src/img/monster/evilspirit.png",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 1
        }
    },
    {
        name: "corrupted sylvan",
        image: "./src/img/monster/evilthree.png",
        PV: {
            base: 30,
            markup: 5
        },
        FOR: {
            base: 10,
            markup: 5
        }
    },
    {
        name: "lucky pig",
        image: "./src/img/monster/flypig.png",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "melancholic ghost",
        image: "./src/img/monster/ghost1.png",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "evil spirit",
        image: "./src/img/monster/ghost2.png",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 10,
            markup: 5
        }
    },
    {
        name: "gobelin",
        image: "./src/img/monster/gobelin.png",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 3
        }
    },
    {
        name: "goblin shaman",
        image: "./src/img/monster/gobelinchaman.png",
        PV: {
            base: 15,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 1
        }
    },
    {
        name: "aerial jellyfish",
        image: "./src/img/monster/jellyfish.png",
        PV: {
            base: 35,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "kobold",
        image: "./src/img/monster/kobold.png",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 7,
            markup: 3
        }
    },
    {
        name: "embodiment of evil and depravity",
        image: "./src/img/monster/littledemon.png",
        PV: {
            base: 35,
            markup: 10
        },
        FOR: {
            base: 5,
            markup: 5
        }
    },
    {
        name: "pizza boy",
        image: "./src/img/monster/.png",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "prankster cat",
        image: "./src/img/monster/prankster_cat.png",
        PV: {
            base: 10,
            markup: 5
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "quetzacoalt",
        image: "./src/img/monster/quetzacoalt.png",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 15,
            markup: 7
        }
    },
    {
        name: "traveler face",
        image: "./src/img/monster/skull.png",
        PV: {
            base: 15,
            markup: 5
        },
        FOR: {
            base: 3,
            markup: 2
        }
    },
    {
        name: "slenderman",
        image: "./src/img/monster/slender.png",
        PV: {
            base: 30,
            markup: 10
        },
        FOR: {
            base: 10,
            markup: 10
        }
    },
    {
        name: "slime",
        image: "./src/img/monster/slime.png",
        PV: {
            base: 25,
            markup: 8
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "spectator",
        image: "./src/img/monster/spectator.png",
        PV: {
            base: 10,
            markup: 3
        },
        FOR: {
            base: 2,
            markup: 1
        }
    },
    {
        name: "spider golem",
        image: "./src/img/monster/spidergolem.png",
        PV: {
            base: 25,
            markup: 5
        },
        FOR: {
            base: 6,
            markup: 3
        }
    },
    {
        name: "wild unicorn",
        image: "./src/img/monster/unicorn1.png",
        PV: {
            base: 25,
            markup: 7
        },
        FOR: {
            base: 10,
            markup: 5
        }
    },
    {
        name: "awake unicorn",
        image: "./src/img/monster/unicorn2.png",
        PV: {
            base: 30,
            markup: 8
        },
        FOR: {
            base: 15,
            markup: 6
        }
    },
    {
        name: "inhabitant of the void",
        image: "./src/img/monster/velkozz.png",
        PV: {
            base: 20,
            markup: 6
        },
        FOR: {
            base: 10,
            markup: 3
        }
    },
    {
        name: "red wyvern",
        image: "./src/img/monster/wyvern.png",
        PV: {
            base: 25,
            markup: 8
        },
        FOR: {
            base: 15,
            markup: 6
        }
    },
    {
        name: "zombie",
        image: "./src/img/monster/zombie.png",
        PV: {
            base: 20,
            markup: 5
        },
        FOR: {
            base: 5,
            markup: 2
        }
    }],
    monsterGenerate: []
};