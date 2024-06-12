const images = [
    "images/ajolote_juegoleo.jpg",
    "images/gorilla_juegoleo.jpg",
    "images/osopolar_juegoleo.jpg",
    "images/panda_juegoleo.jpg",
    "images/tigre_juegoleo.jpg"
  ];
  
  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }
  
  class Puzzle {
    constructor({src, rows, columns, width, height}) {
      this.src = src;
      this.rows = rows;
      this.columns = columns;
      this.width = width;
      this.height = height;
      this.tileWidth = width / columns;
      this.tileHeight = height / rows;
      this.tiles = Array.from({length: rows * columns}).map((_, i) => {
        const x = i % columns;
        const y = Math.floor(i / columns);
        return {
          x, y,
          imageX: x,
          imageY: y,
          empty: false
        };
      });
      this.emptyTile = last(this.tiles);
      this.emptyTile.empty = true;
      this.scramble();
      this.createElements();
      this.updateReferenceImage();
    }
  
    slideTile(tile) {
      const {emptyTile} = this;
      if(!this.areTilesNeighbors(tile, emptyTile)) return;
      this.swapTiles(tile, emptyTile);
      this.updateTileElPosition(tile);
      this.updateTileElPosition(emptyTile);
      setTimeout(() => this.checkWin(), 50);  
    }
  
    swapTiles(a, b) {
      const {x: ax, y: ay} = a;
      const {x: bx, y: by} = b;
      a.x = bx;
      a.y = by;
      b.x = ax;
      b.y = ay;
    }
  
    scramble() {
      const {emptyTile} = this;
      let last = null;
      const isValidTile = (tile) => tile !== last && tile !== emptyTile && this.areTilesNeighbors(tile, emptyTile);
  
      for(let i = 0; i < 1000; i++) {
        const nextTile = last = sample(this.tiles.filter(isValidTile));
        this.swapTiles(emptyTile, nextTile);
      }
    }
  
    updateTileElPosition(tile) {
      const {tileWidth, tileHeight} = this;
      const {el, x, y} = tile;
      el.style.left = `${x * tileWidth}px`;
      el.style.top = `${y * tileHeight}px`;
    }
  
    areTilesNeighbors(a, b) {
      const {x: ax, y: ay} = a;
      const {x: bx, y: by} = b;
      return (
        (a !== b) &&
        (
          (ax === bx && (ay === by + 1 || ay === by - 1)) ||
          (ay === by && (ax === bx + 1 || ax === bx - 1))
        )
      );
    }
  
    createElements() {
      const {src, tiles, width, height, tileWidth, tileHeight} = this;
      const tileEls = tiles.map((tile) => {
        const {x, y, imageX, imageY, empty} = tile;
        const tileEl = createEl("div", "tile");
  
        Object.assign(tileEl.style, {
          "position": "absolute",
          "width": `${tileWidth}px`,
          "height": `${tileHeight}px`,
          "background-image": `url(${src})`,
          "background-size": `${width}px ${height}px`,
          "background-position": `-${imageX * tileWidth}px -${imageY * tileHeight}px`,
          "transition": "top 0.1s, left 0.1s",
          "vertical-align": "top",
          "cursor": "pointer"
        });
        if(empty) {
          tileEl.style.opacity = "0";
          tileEl.style.cursor = "default";
        }
  
        tileEl.addEventListener("click", this.slideTile.bind(this, tile));
        tile.el = tileEl;
        this.updateTileElPosition(tile);
        return tileEl;
      });
  
      const puzzleEl = this.el = createEl("div", "puzzle");
  
      Object.assign(puzzleEl.style, {
        position: "relative",
        width: `${width}px`, 
        height: `${height}px`
      });
  
      tileEls.forEach((el) => puzzleEl.appendChild(el));
    }
  
    updateReferenceImage() {
      const referenceImage = document.getElementById("reference-image");
      referenceImage.src = this.src;
    }
  
    checkWin() {
      const {tiles, rows, columns} = this;
      const isWin = tiles.every((tile, index) => {
        const x = index % columns;
        const y = Math.floor(index / columns);
        return tile.x === x && tile.y === y;
      });
  
      if (isWin) {
        this.showWinMessage();
      }
    }
  
    showWinMessage() {
      const winMessage = createEl("div", "win-message");
      winMessage.innerHTML = `
        <div class="win-content">
          <h2>¡Ganaste!</h2>
          <button id="play-again">Jugar de nuevo</button>
          <button id="play-again" onclick="window.location.href='juegos.html'">Volver al inicio</button>
        </div>
      `;
      document.body.appendChild(winMessage);
  
      document.getElementById("play-again").addEventListener("click", () => {
        document.body.removeChild(winMessage);
        this.reset();
      });
    }
  
    reset() {
      const newSrc = getRandomImage();  
      this.src = newSrc;
      this.tiles.forEach(tile => {
        tile.x = tile.imageX;
        tile.y = tile.imageY;
        tile.el.style.backgroundImage = `url(${newSrc})`;
      });
      this.emptyTile = last(this.tiles);
      this.emptyTile.empty = true;
      this.scramble();
      this.tiles.forEach(tile => this.updateTileElPosition(tile));
      this.updateReferenceImage();
    }
  }
  
  function createEl(tag, ...classNames) {
    const el = document.createElement(tag);
    if(classNames.length) el.classList.add(...classNames);
    return el;
  }
  
  function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function last(arr) {
    return arr[arr.length - 1];
  }
  
  const puzzle = new Puzzle({
    src: getRandomImage(), 
    width: 400,
    height: 400,
    rows: 3,
    columns: 3
  });
  
  document.getElementById("puzzle-wrapper").appendChild(puzzle.el);
  