// -- SET UP --
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 480;
const TILE_SIZE = 32;
const TILE_COLUMNS = 20;
const TILE_ROWS = 15;
const TILE_COLORS = {
    1: "gray", // wall
    2: "white", // player
    3: "brown", // box
    4: "purple", // button
    5: "green", // button & box pressed
};

// this just means that the base screen is 20x15 tiles each tile is 32 pixels

// Load game window
const gamewin = document.getElementById("game");
const ctx = gamewin.getContext("2d");

// Load keys
let keys = {};
let prev_keys = {};
window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

// -- GLOBAL VARIABLES --
let game_state = "start";
let current_scene = null;
let current_level = 1;

// -- MAIN GAME LOOP --
let last_time = 0;
function game_loop(current_time) {
    const dt = (current_time - last_time) / 1000;
    update(dt);
    draw();
    last_time = current_time;

    requestAnimationFrame(game_loop);
}

function update(dt) {
    if (game_state=="start") {
        if (keys["Enter"]) {
            current_scene = load_game();
            game_state = "game";
        }
    }
    if (game_state=="game") {
        update_game(dt);
    }
    if (game_state=="clear") {
        if (keys["Enter"]) {
            current_level += 1;
            current_scene = load_game();
            game_state = "game";
        }
    }

    prev_keys = {...keys};
}


function draw() {
    if (game_state=="start") { 
        clear_screen("black");
        let title = "Press Enter to start!";
        ctx.font = "bold 40px Courier New";
        let title_x = (SCREEN_WIDTH - ctx.measureText(title).width) / 2;
        ctx.fillStyle = "white";
        ctx.fillText(title, title_x, SCREEN_HEIGHT/2);
    }
    if (game_state=="game") {
        draw_game();
    }
    if (game_state=="clear") { 
        clear_screen("black");
        let title = `Level ${current_level} cleared!`;
        ctx.font = "bold 20px Courier New";
        let title_x = (SCREEN_WIDTH - ctx.measureText(title).width) / 2;
        ctx.fillStyle = "white";
        ctx.fillText(title, title_x, SCREEN_HEIGHT/2);
    }
}

// -- Game Functions
function level(num) {
    switch (num) {
        case 1:
            return `
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 0 2 0 0 0 3 0 0 0 0 0 0 0 0 4 0 0 0 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            `;
        case 2:
            return `
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 0 4 0 0 3 0 0 0 0 2 0 0 3 0 0 0 4 0 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            `;
        case 3:
            return `
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
                1 0 0 1 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 1
                1 0 0 1 4 1 0 0 3 0 2 0 1 4 1 0 3 0 0 1
                1 0 0 1 0 1 0 0 0 0 0 0 1 0 1 0 0 0 0 1
                1 0 0 1 0 1 1 1 1 1 1 1 1 0 1 1 1 0 0 1
                1 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1
                1 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            `;
    }
}

function get_player_pos(map) {
    let pos = {x: 0, y: 0};
    for (let row=0; row<TILE_ROWS; row++) {
        for (let col=0; col<TILE_COLUMNS; col++) {
            if (map[row][col] == 2) {
                pos.x = col*TILE_SIZE;
                pos.y = row*TILE_SIZE;
            }
        }
    }

    return pos;
}

function load_game() {
    const scene = {
        player: null,
        map: null,
        level_complete: false,
    };

    scene.map = level(current_level).trim()
                .split('\n')
                .map(row => row.trim()
                .split(' ').map(Number));

    scene.player = {
        pos: get_player_pos(scene.map),
        direction: "",
        fx: 0,
        fy: 0,
        w: TILE_SIZE,
        h: TILE_SIZE,
        color: "white",
    };

    return scene;
}

function player_controller(player) {
    if (btnp("KeyW")) {
        player.fy -= TILE_SIZE;
        player.direction = "up";
    } else if (btnp("KeyS")) {
        player.fy += TILE_SIZE;
        player.direction = "down";
    } else if (btnp("KeyD")) {
        player.fx += TILE_SIZE;
        player.direction = "right";
    } else if (btnp("KeyA")) {
        player.fx -= TILE_SIZE;
        player.direction = "left";
    } else if (btnp("KeyR")) {
        current_scene = load_game();
    } else {
        return;
    }
}

function player_collisions(player, map) {
    switch (map[player.fy/TILE_SIZE][player.fx/TILE_SIZE]) {
        case 0: // empty
            update_player_position(player);
            return;
        case 3: // box
            handle_box_movement(player, map);
            return;
        default:
            // do nothing, blocked
            return;
    }
}

function update_player_position(player) {
    player.pos.x = player.fx;
    player.pos.y = player.fy;
}

function handle_box_movement(player, map) {
    let box_future_x = player.fx;
    let box_future_y = player.fy;

    switch (player.direction) {
        case "up":
            box_future_y -= TILE_SIZE;
            break;
        case "down":
            box_future_y += TILE_SIZE;
            break;
        case "right":
            box_future_x += TILE_SIZE;
            break;
        case "left":
            box_future_x -= TILE_SIZE;
            break;
        default:
            return; // invalid direction
    }

    if (future_box_pos_valid(map, box_future_x, box_future_y)) {
        // check for button condition
        if (map[box_future_y/TILE_SIZE][box_future_x/TILE_SIZE] == 4) {
           map[box_future_y/TILE_SIZE][box_future_x/TILE_SIZE] = 5; 
        } else {
            map[box_future_y/TILE_SIZE][box_future_x/TILE_SIZE] = 3;
        }

        update_player_position(player)
    } 
}

function future_box_pos_valid(map, box_future_x, box_future_y) {
    return map[box_future_y/TILE_SIZE][box_future_x/TILE_SIZE] == 0 ||
           map[box_future_y/TILE_SIZE][box_future_x/TILE_SIZE] == 4;  
}

function all_buttons_pressed(map) {
    for (let row=0; row<TILE_ROWS; row++) {
        for (let col=0; col<TILE_COLUMNS; col++) {
            if (map[row][col] == 4) {
                return false
            }
        }
    }
    return true;
}

function update_game(dt) {
    const { player, map } = current_scene;
    player.direction = "";
    player.fy = player.pos.y;
    player.fx = player.pos.x;

    // clear current player position
    map[player.pos.y/TILE_SIZE][player.pos.x/TILE_SIZE] = 0;

    player_controller(player);
    player_collisions(player, map);

    // draw player after all logic
    map[player.pos.y/TILE_SIZE][player.pos.x/TILE_SIZE] = 2

    // check if puzzle was solved
    if (all_buttons_pressed(map)) {
        current_scene.level_complete = true;
    }
}

function render_map(map) {
    for (let row=0; row<TILE_ROWS; row++) {
        for (let col=0; col<TILE_COLUMNS; col++) {
            const tile_color = TILE_COLORS[map[row][col]];
            if (tile_color) {
                ctx.fillStyle = tile_color;
                ctx.fillRect(col*TILE_SIZE, row*TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

function draw_game() {
    clear_screen("black");

    // switch the state machine to the level cleared statement then enter to continue go to level 2
    if (current_scene.level_complete) {
        game_state = "clear";
    }  else {
        render_map(current_scene.map);
    }
}

// -- HELPER FUNCTIONS --
function clear_screen(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}

function render_obj(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
}

function btnp(key) {
    return keys[key] && !prev_keys[key];
}

// not sure if Ill use this one
function collision(a, b) {
    if (a.x<b.x+b.w && 
        a.x+a.w>b.x &&
        a.y<b.y+b.h &&
        a.y+a.h>b.y) 
    {
        return true;
    }
    else return false;
}


// -- RUN GAME --
requestAnimationFrame(game_loop);
