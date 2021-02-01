import {BaseConfig, Blueprint, Command, Executor, Message} from "@dxz/blueprint";

@Command({
    aliases: [],
    groups: ["User"],
    name: "help"
})
export class Help implements Executor {
    async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {

    }
}