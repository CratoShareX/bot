import {Blueprint} from "@dxz/blueprint";
import {FullConfig} from "../structures/Types";
import {Guild} from "eris";

export async function guildCreate(ref: Blueprint<FullConfig>, guild: Guild) {
    if (guild.id !== "790854819907764224") return await guild.leave();
}