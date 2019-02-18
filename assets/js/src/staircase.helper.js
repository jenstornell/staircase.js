const staircase = {
  add(id, type) {
    new StaircaseCore().add(id, type);
  },
  delete(id) {
    new StaircaseCore().delete(id);
  },
  rename(id, name) {
    new StaircaseCore().rename(id, name);
  },
  select(id, callback = true) {
    new StaircaseCore().select(id, callback);
  },
  deselect(callback = true) {
    new StaircaseCore().deselect(callback);
  },
  open(id) {
    new StaircaseCore().open(id);
  },
  close(id) {
    new StaircaseCore().close(id);
  },
  refresh(id) {
    new StaircaseCore().refresh(id);
  }
};