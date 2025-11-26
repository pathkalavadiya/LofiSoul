const { Integration } = require("discord.js")

module.exports={
    name:"interactionCreate",
    async execute(interaction,client){
     
        if(! interaction.isChatInputCommnnds())
        {
            return;
        }
        
        const command=client.commands.get(interaction.commandName);

        if(!command){
           return interaction.reply({
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