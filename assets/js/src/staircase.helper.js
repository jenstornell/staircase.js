class staircase {
  static add(base, name, type) {
    let staircase = new StaircaseCore();
    staircase.add(base, name, type);
  }

  static delete(id, type) {
    let staircase = new StaircaseCore();
    staircase.delete(id, type);
  }

  static rename(id, name, type) {
    let staircase = new StaircaseCore();
    staircase.rename(id, name, type);
  }

  static select(id, type) {
    let staircase = new StaircaseCore();
    staircase.select(id, type);
  }

  static deselect(id, type) {
    let staircase = new StaircaseCore();
    staircase.deselect(id, type);
  }

  static open(id) {
    let staircase = new StaircaseCore();
    staircase.open(id);
  }

  static close(id) {
    let staircase = new StaircaseCore();
    staircase.close(id);
  }

  static refresh(id) {
    let staircase = new StaircaseCore();
    staircase.refresh(id);
  }
}