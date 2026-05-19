class Board {
  constructor(containerSelector) {
    this.blocksCount = 16;
    this.blocksContainer = document.querySelector(containerSelector);
    if (!this.blocksContainer) {
      this.blocksContainer = document.createElement("div");
      this.blocksContainer.classList.add("container");
      document.body.append(this.blocksContainer); // не используем appendChild
    }
    this.blocks = [];
  }
   renderBlocks() {
    for (let i = 0; i < this.blocksCount; i += 1) {
      const div = document.createElement("div");
      div.classList.add("block");
      this.blocks.push(div);
      this.blocksContainer.append(div); // добавить в HTML элемент
    }
  }
  clearBlocks() {
    for (let i = 0; i < this.blocks.length; i += 1) {
      this.blocks[i].innerHTML = "";
    }
  }
  get blocksList() {
    return this.blocks
  }
}

export {Board}
