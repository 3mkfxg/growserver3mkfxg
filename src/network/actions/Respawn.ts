import { type NonEmptyObject } from "type-fest";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";

export class Respawn {
  constructor(
    public base: Base,
    public peer: Peer
  ) {}

  public async execute(
    _action: NonEmptyObject<Record<string, string>>
  ): Promise<void> {
    this.peer.respawn();
  }
}
