import { assert } from "near-sdk-js";

type PausableArgs = {
  paused: boolean;
};

class Pausable {
  paused: boolean;

  constructor(args: PausableArgs) {
    const { paused } = args;
    
    this.paused = paused;
  }

  pause() {
    this._pause();
  }

  unpause() {
    this._unpause();
  }

  _pause() {
    this.paused = true;
  }

  _unpause() {
    this.paused = false;
  }

  _requirePaused() {
    assert(this.is_paused() === true, "Pausable: not paused");
  }

  _requireNotPaused() {
    assert(this.is_paused() === false, "Pausable: paused");
  }

  whenPaused() {
    return this._requirePaused();
  }

  whenNotPaused() {
    return this._requireNotPaused();
  }

  is_paused() {
    return this.paused;
  }
}

export default Pausable;
