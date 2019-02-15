class staircase {
  static add(id, type) {
    let staircase = new StaircaseCore();
    staircase.add(id, type);
  }

  static delete(id) {
    let staircase = new StaircaseCore();
    staircase.delete(id);
  }

  static rename(id, name) {
    let staircase = new StaircaseCore();
    staircase.rename(id, name);
  }

  static select(id, callback = true) {
    let staircase = new StaircaseCore();
    staircase.select(id, callback);
  }

  static deselect(id, callback = true) {
    let staircase = new StaircaseCore();
    staircase.deselect(id, callback);
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