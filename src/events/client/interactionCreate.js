const { Integration } = require("discord.js")

module.exports={
    name:"interactionCreate",
    async execute(interactionCreate,client){
     
        if(! Integration.isChatInputCommnnds())
        {
            return;
        }
        
        const command=client.commands.get(Integration.commandName);

        if(!command){
           return Integration.reply({
            content:"❌ Command not found",
            ephemeral:true
           });
        }

        try{
            await command.execute(interaction,client);
        }catch(error){
            console.log(error);
            await interaction.reply({
                content:"⚠️ An error occurred while executing this command.",
                ephemeral:true
            });
        }
    }
};