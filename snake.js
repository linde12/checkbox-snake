const main = document.querySelector("main");
const WIDTH = 20;
const HEIGHT = 20;

const state = {
  body: [
    [0, 2],
    [0, 1],
    [0, 0],
  ],
  direction: "down",
  candies: [
    [5, 5],
    [8, 13],
  ],
};

// prepare board
for (let y = 0; y < HEIGHT; y++) {
  const row = document.createElement("div");
  for (let x = 0; x < WIDTH; x++) {
    const box = document.createElement("input");
    box.type = "checkbox";
    box.setAttribute("data-coords", `${x}-${y}`);
    box.checked = false;
    box.onclick = (e) => e.preventDefault();

    row.appendChild(box);
  }
  main.appendChild(row);
}

const clearCheckboxes = () => {
  const checkboxes = document.querySelectorAll("input");
  checkboxes.forEach((box) => {
    box.type = "checkbox";
    box.checked = false;
  });
};

const loop = () => {
  clearCheckboxes(); // TODO: just clear previous snake locations, not everything
  const [x, y] = state.body[0];

  switch (state.direction) {
    case "down":
      state.body.unshift([x, y + 1]);
      break;
    case "up":
      state.body.unshift([x, y - 1]);
      break;
    case "left":
      state.body.unshift([x - 1, y]);
      break;
    case "right":
      state.body.unshift([x + 1, y]);
      break;
  }

  state.body.pop();

  for (let [x, y] of state.body) {
    const box = document.querySelector(`input[data-coords="${x}-${y}"]`);
    box.checked = true;
  }

  let toRemove = null;
  for (let [index, [x, y]] of state.candies.entries()) {
    const first = state.body[0];
    if (first[0] === x && first[1] === y) {
      state.body.push(state.body[state.body.length - 1]); // uhh, when are we supposed to push the new body part? ill just do it here for now
      toRemove = index;
    } else {
      const box = document.querySelector(`input[data-coords="${x}-${y}"]`);
      box.type = "radio";
      box.checked = true;
    }
  }
  if (toRemove !== null) state.candies.splice(toRemove, 1);

  // TODO: add 'you died' screen when out of bounds
  setTimeout(loop, 300);
};

document.body.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      return (state.direction = "down");
    case "ArrowUp":
      return (state.direction = "up");
    case "ArrowLeft":
      return (state.direction = "left");
    case "ArrowRight":
      return (state.direction = "right");
  }
});

loop();
