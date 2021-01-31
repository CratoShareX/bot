import {BaseConfig, Blueprint, Command, Executor, Message} from "@dxz/blueprint";
import {dispatch_error_embed} from "../../structures/EmbedTypes";

@Command({
    aliases: [],
    groups: ["User"],
    name: "help"
})
export class Help implements Executor {
    async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
        // if (args[0]) {
        //     const command = ref.registry.groups.validate(ctx.author, )
        //     if (!command) return await dispatch_error_embed(ctx, "No matching command found!");
        //     return await ctx.channel.createMessage({
        //         embed: {
        //             title: `Help - ${command.}`,
        //             description: `${command.arguments}`
        //         }
        //     })
        // }
    }
}